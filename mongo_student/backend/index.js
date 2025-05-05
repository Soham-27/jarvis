import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import Student from "./student.js";

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb://127.0.0.1:27017/students').then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });


app.post("/insert", async (req, res) => {
    try {
        const result = await Student.insertMany(req.body);
        res.status(201).json({ message: "Students added", data: result });
    } catch (error) {
        res.status(500).json({ error: "Error inserting students", details: err });
    }
})

app.get("/total", async (req, res) => {
    try {
        const count = await Student.countDocuments();
        res.status(201).json({ count: count })
    } catch (error) {
        res.status(500).json({ error })
    }
})

app.get('/dsbda', async (req, res) => {
    const result = await Student.find({ dsbda: { $gt: 20 } }, { student_name: 1, _id: 0 })
    res.status(200).json(result)
})


app.get('/all', async (req, res) => {
    const result = await Student.find({ dsbda: { $lt: 40 }, wad: { $gt: 25 }, cc: { $gt: 25 }, ai: { $gt: 25 } }, { student_name: 1, _id: 0 })
    res.status(200).json(result)
})

app.get('/math', async (req, res) => {
    const result = await Student.find({ dsbda: { $gt: 25 }, wad: { $gt: 25 }, cc: { $gt: 25 }, ai: { $gt: 25 } }, { student_name: 1, _id: 0 })
    res.status(200).json(result)
})
app.get("/", (req, res) => {
    console.log("done")
});
app.delete("/delete/:id", async (req, res) => {
    await Student.deleteOne({ _id: req.params.id });

})
app.listen(5000, () => {
    console.log("server started at port 5000")
})