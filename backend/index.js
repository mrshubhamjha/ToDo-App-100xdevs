const express = require (`express`)
const app = express()
const port = 3000;
const {createTodo, updateTodo} = require(`./types`);
const { todo }=require(`./db`);
const cors = require(`cors`);

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
}));

app.post(`/todo`,async function (req,res){
const createPayload = req.body;
const parsedPayload = createTodo.safeParse(createPayload);
if(!parsedPayload.success){
    res.status(411).json({
        msg:`you sent the wrong inputs`,
    })
    return;
}

await todo.create({
title: createPayload.title,
description: createPayload.description,
completed: false
})

res.json({
    msg:"todo created"
})
})


app.get('/todos', async function (req, res) {
    const todos = await todo.find({});
    console.log(todos);  // Verify if todos are fetched from the database
    res.json({ todos });
  });
  

app.put(`/completed`,async function (req,res){
const updatePayload = req.body;
const parsedPayload = updateTodo.safeParse(updatePayload);
if(!parsedPayload.success){
    res.status(411).json({
        msg:`you sent the wrong inputs`,
    })
    return;
}
await todo.update({
    _id:req.body.id
},{
    completed:true
})
res.json({
    msg:`todo marked as completed`
})
})

app.listen(port,()=>{
console.log(`example app running on port ${port}`)
})