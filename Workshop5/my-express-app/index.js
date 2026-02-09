const express = require('express');
const app = express();

// Query Parameters

// // เปิดใช้งาน body parser สำหรับรับข้อมูล JSON
// app.use(express.json());

// // เปิดใช้งาน midldleware express.urlencoded()
// app.use(express.urlencoded({ extended: true }));

// const validateStudent = (req, res, next) => {
//     const { name, age } = req.query;
//     if(!name || !age) {
//         return res.status(400).send("Invalid data");
//     }
//     next();
// }

// app.get('/searh', validateStudent, (req, res) => {
//     // ดึงค่าจากพารามิเตอร์จาด query string
//     const name = req.query.name;
//     const age = req.query.age;

//     res.send(`Searching for name: ${name}, age: ${age}`);
// });

// URL Parameters
app.use(express.json());

const students = [
    {id:1, name:"Gus" , age: 18},
    {id:2, name:"Tar", age:19},
    {id:3, name:"Tum", age: 20}
]
app.get('/api/students', (req, res) => {
    res.json(students)
})
app.get('/api/students/:id', (req, res) => {

    // แปลงค่าพารามิเตอร์ id ให้เป็นตัวเลข
    const id = parseInt(req.params.id);

    // ค้นหานักเรียนตาม id
    const student = students.find(s => s.id === id);

    // ถ้าเจอนักเรียนจะส่งข้อมูลกลับ ถ้าไม่เจอจะส่ง error
    if (student) {
        res.json(student);
    } else {
        res.status(404).send("Error 404: Student on found");
    }
});

function validateStudent (req, res, next) {
    const { name, age } = req.body;
    if(!name || !age) {
         return res.status(400).json({ message: "Invalid data" });
    }
   next();
}

app.post('/api/students/', validateStudent , (req, res) => {
    const { name, age } = req.body;
    const newStudent = {
        id: students.length + 1,
        name,
        age
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

app.listen(3000,() => {
    console.log('Server running on http://localhost:3000');
});