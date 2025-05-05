const express = require("express")
const fs = require("fs")
const path = require("path")
const cors = require("cors")

const app = express();
const PORT = 3000;

app.use(cors());
app.get("/user-data", (req, res) => {
    const userpath = path.join(__dirname, "users.json");
    fs.readFile(userpath, (err, data) => {
        if (err) {
            console.error('Error reading user data:', err);
            return res.status(500).json({ error: 'Failed to read user data' });
        }
        try {
            const users = JSON.parse(data);
            res.json(users)
        } catch (error) {
            console.error('Error parsing user data:', parseErr);
            res.status(500).json({ error: 'Invalid JSON format in users file' });
        }
    })
})

app.listen(PORT, () => {
    console.log(` Server is running at http://localhost:${PORT}`);
});