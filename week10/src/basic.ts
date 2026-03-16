import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env['GEMINI_API_KEY'],
});

async function askQuestion(question: string): Promise<string> {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            {
                role: 'user',
                parts: [{ text: question }],
        },
        ],
    });

    // ดึงข้อความจาก response
    return response.text ?? '';
}

async function main() {
    const answer = await askQuestion('Node.js คืออะไร อธิบายสั้นๆ');
    console.log('คำตอบ', answer );
}

main();