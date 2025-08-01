import express from 'express';
import 'dotenv/config'
import connectDB from './db/index.js'
import todoRoute from './routes/todo.routes.js'

const app = express();
app.use(express.json());

connectDB();

app.use("/api/todos", todoRoute)

app.get('/', (req,res) => {
    res.send("sever is running!")
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})








