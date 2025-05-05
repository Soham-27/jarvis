import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());



let users = [];

app.post("/add", (req, res) => {
    const { username, email, mobile_number, dob, city, address, password } = req.body;
    const user = { username: username, email: email, mobile_number: mobile_number, dob: dob, city: city, address: address, password: password };
    users.push(user);
    res.json({ message: "user added sucessfully" })
})


app.post("/login", (req, res) => {
    const { username, password } = req.body;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username && users[i].password == password) {
            res.json({ message: "user verified sucessfully" })
        }
    };
    res.json({ message: "user not found" })

})
app.get("/users", (req, res) => {
    res.json({ users });
})
app.listen(3000, () => {
    console.log("server is running on port 3000")
})