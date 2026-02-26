import  express  from "express";
import { prisma } from '../lib/prisma';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// test
app.get('/', (req, res) => {
    res.send('Hello from Prisma API!');
});

// เอาไว้เพิ่ม user , email ใน table user
app.post('/user', async (req, res) => {
    const { name , email } = req.body;
    try {
        const user = await prisma.user.create({
            data: { name , email},
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// User Table --> Get ดึงข้อมูลผู้ใช้งานจอก email
app.get("/users/email/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email   // เงื่อนไขค้นหาจาก email
      },
      include: {
        posts: true    // ดึง posts ของ user นี้มาด้วย
      }
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE 
app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const deleteUser = await prisma.user.delete({
            where: {
                UserId: id
            }
        });
        // ส่งข้อมูล user ที่ถูกลบกลับ
        res.json(deleteUser);
    } catch (error) {
        // ถ้าไม่เจอ user
        res.status(404).json({ message: "User not found" });
    }
});

// Post Table --> posts
app.post("/posts", async (req, res) => {

  // รับข้อมูลจาก body
  const { title, content, authorId } = req.body;

  try {
    // สร้าง post ใหม่
    const newPost = await prisma.post.create({
      data: {
        title: title,         
        content: content,     
        authorId: authorId    // UUID ของ user เจ้าของโพสต์
      }
    });

    // ส่งข้อมูลกลับ พร้อม status 201 (created)
    res.status(201).json(newPost);

  } catch (error) {
    res.status(400).json({ message: "Error creating post" });
  }
});

// GET /posts ดึงโพสต์ทั้งหมด
app.get("/posts", async (req, res) => {

  try {
    // findMany ใช้ดึงหลาย record
    const posts = await prisma.post.findMany({
      include: {
        author: true   // ดึงข้อมูล user เจ้าของโพสต์มาด้วย
      }
    });

    res.json(posts);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get /posts/:id ดึงโพสต์รายการเดียวจาก postId
app.get("/posts/:id", async (req, res) => {

  const id = req.params.id;

  try {
    // ใช้ findUnique เพราะ postId เป็น @id
    const post = await prisma.post.findUnique({
      where: {
        postId: id
      },
      include: {
        author: true
      }
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Put /posts/:id แก้ไขโพสต์ตาม postId
app.put("/posts/:id", async (req, res) => {

  const id = req.params.id;

  const { title, content, published } = req.body;

  try {
    // อัปเดตข้อมูล
    const updatedPost = await prisma.post.update({
      where: {
        postId: id
      },
      data: {
        title: title,
        content: content,
        published: published
      }
    });

    res.json(updatedPost);

  } catch (error) {
    res.status(404).json({ message: "Post not found" });
  }
});

// Delete /posts/:id ลบโพสต์ตาม postId
app.delete("/posts/:id", async (req, res) => {

  // รับ postId จาก URL
  const id = req.params.id;

  try {
    // ลบโพสต์
    const deletedPost = await prisma.post.delete({
      where: {
        postId: id
      }
    });

    res.json(deletedPost);

  } catch (error) {
    res.status(404).json({ message: "Post not found" });
  }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});