import 'dotenv/config';
import { GoogleGenAI, Content } from '@google/genai';
import * as readline from 'readline';

const ai = new GoogleGenAI({
    apiKey: process.env['GEMINI_API_KEY'],
});

// เก็บประวัติการสนทนา (ส่งกลับไปทุกครั้ง)
const history: Content[] = [];