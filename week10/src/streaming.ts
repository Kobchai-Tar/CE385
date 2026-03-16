import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env['GEMINI_API_KEY'],
});

async function streamAnswer(question: string): Promise<void> {
  const response = await ai.models.generateContentStream({
    model: 'gemini-2.5-flash-lite',
    contents: [
      {
        role: 'user',
        parts: [{ text: question }],
      },
    ],
  });

  // วน loop รับ chunk ทีละชิ้น
  process.stdout.write('คำตอบ: ');
  for await (const chunk of response) {
    // chunk.text อาจเป็น undefined ถ้า chunk เป็น metadata
    if (chunk.text) {
      process.stdout.write(chunk.text); // พิมพ์โดยไม่ขึ้นบรรทัดใหม่
    }
  }
  console.log(); // ขึ้นบรรทัดใหม่หลังจบ
}

async function main() {
  await streamAnswer('อธิบาย async/await ใน JavaScript พร้อมตัวอย่าง แบบสั้นๆ');
}

main();