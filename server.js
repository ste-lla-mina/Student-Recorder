require ('dotenv') .config();
const express = require('express');
const mongoose= require('mongoose');

const app= express();
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("Connection was successful."))
.catch(err => console.error("Connection error: ", err));

const Student = mongoose.model('Student',{
    name : String,
    grade : String
});
// Adding a student
app.post('/api/students' , async(req,res) => {
const student = new Student(req.body);
await student.save();
res.status(201).send(student);
});

// Finding a student
app.get('/api/students', async(req,res)=>{
    const students = await Student.find();
    res.send(students);
});
app.listen(4056, () => console.log("Server running on port 4056."));