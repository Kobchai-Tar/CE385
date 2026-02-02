// // การใช้งานโมดูล '้http' ที่มีใน Node.js
// const http = require('http');

// // สร้าง server = แบบง่ายๆ
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type','text/plain');
//     res.end('Hello World\n');
// });

// // กำหนด port และเริ่ม server
// server.listen(3000, '127.0.0.1', () => {
//     console.log('Server running at http://127.0.0.1:3000/');
// });

// 1. Require โมดูล rexpress
const express = require('express');

// 2. สร้าง instane ของ exprsss
const app = express();

// 3. กำหนด port ที่จะใช้รันเซิฟเวอร์
const port = 3000;

// 4. สร้างเส้นทาง (route) ที่จะตอบกลับเมื่อมีการร้องขอ GET มายังหน้าหลัก ('/')
app.get('/' , (req, res) => {
    res.send('Hello, World!');
});

// 5. กำหนดให้เซิฟเวอร์เริ่มฟังคำสั่งที่พอร์ตที่ตั้งไว้
app.listen(port, () => {
    console.log(`Sercver is running on http://localhost:${port}`);
});

const operation = require('./Workshop4_1')
console.log(operation("add", 4, 5));
console.log(operation("subtract", 10, 3));
console.log(operation("multiply", 5, 6));
console.log(operation("divide",8 ,2));