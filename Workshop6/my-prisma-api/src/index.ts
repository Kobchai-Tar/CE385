import  express  from "express";
import { prisma } from '../lib/prisma';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Prisma API!');
});

app.post('/user', async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = await prisma.user.create({
            data: { name, email },
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create user'});
    }
});

app.get('/users' , async (require, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create user'})
    }
});

app.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const user = await prisma.user.update({
            where: { UserId: id },
            data: {name, email },
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error:'Failed to update user'});
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});