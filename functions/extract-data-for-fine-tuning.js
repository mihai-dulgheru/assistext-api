import fs from 'fs';
import path from 'path';
import prisma from '../prisma-client';

const MIN_PROMPT_LENGTH = 5;
const MAX_PROMPT_LENGTH = 20;
const COMPLETION_LENGTH = 5;

function splitIntoSentences(text) {
  const sentences = text.match(/[\s]*[^.!?]+[.!?]+[\s]*/g) || [];
  return sentences.map((sentence) => sentence.trim());
}

function preprocessText(text) {
  return text.replace(/\s+/g, ' ').trim();
}

async function extractDataForFineTuning() {
  const lessons = await prisma.lesson.findMany({
    select: {
      sections: {
        select: {
          content: true,
        },
      },
    },
  });

  const uniqueDataForFineTuning = new Map();

  lessons.forEach((lesson) => {
    lesson.sections.forEach((section) => {
      const sentences = splitIntoSentences(section.content).map(preprocessText);
      sentences.forEach((sentence, sentenceIndex) => {
        const words = sentence.split(' ');

        for (
          let windowSize = MIN_PROMPT_LENGTH;
          windowSize <=
          Math.min(MAX_PROMPT_LENGTH, words.length - COMPLETION_LENGTH);
          windowSize++
        ) {
          for (
            let startIndex = 0;
            startIndex <= words.length - windowSize - COMPLETION_LENGTH;
            startIndex++
          ) {
            const prompt = words
              .slice(startIndex, startIndex + windowSize)
              .join(' ');
            const completion = words
              .slice(
                startIndex + windowSize,
                startIndex + windowSize + COMPLETION_LENGTH
              )
              .join(' ');

            const key = `${prompt}|${completion}`;
            if (!uniqueDataForFineTuning.has(key)) {
              uniqueDataForFineTuning.set(key, { prompt, completion });
            }
          }
        }

        if (sentenceIndex < sentences.length - 1) {
          const nextSentence = sentences[sentenceIndex + 1];
          const key = `${sentence}|${nextSentence.split(' ').slice(0, COMPLETION_LENGTH).join(' ')}`;
          if (
            sentence.length > MAX_PROMPT_LENGTH &&
            !uniqueDataForFineTuning.has(key)
          ) {
            uniqueDataForFineTuning.set(key, {
              prompt: sentence,
              completion: nextSentence
                .split(' ')
                .slice(0, COMPLETION_LENGTH)
                .join(' '),
            });
          }
        }
      });
    });
  });

  const filePath = path.join(__dirname, '../temp/training_data.jsonl');
  fs.writeFileSync(
    filePath,
    Array.from(uniqueDataForFineTuning.values())
      .sort((a, b) => a.prompt.localeCompare(b.prompt))
      .map((line) => JSON.stringify(line))
      .join('\n')
  );
}

export default extractDataForFineTuning;
