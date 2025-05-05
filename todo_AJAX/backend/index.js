import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
let tasks = [];

app.post("/addtask", (req, res) => {
    const { des } = req.body;
    const id = Math.random();
    const task = { id: id, des: des };
    tasks.push(task);
    console.log(tasks);
    res.json({ message: "task added successfully" });
});

app.get("/get-all-task", (req, res) => {
    console.log(tasks);
    res.json({ tasks });
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    tasks.splice(tasks.findIndex((task) => task.id == id), 1);
    res.json({ message: "task deleted successfully" });
});


app.put("/update/:id", (req, res) => {
    const id = req.params.id;
    const { des } = req.body;
    const taskIndex = tasks.findIndex(task => (task.id == id));
    if (taskIndex == -1) {
        return res.status(404).json({ message: "Task not found" });
    }
    tasks[taskIndex].des = des;
    res.json({ message: "Task updated successfully" });
});


app.listen(3000, () => {
    console.log(`server running on port ${3000}`);
});
