import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Song from "./music.js";
const app = express();
app.use(cors());

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/music').then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });

app.get("/insert_songs", async (req, res) => {
    const songs = [
        {
            title: "Tum Hi Ho",
            artist: "Arijit Singh",
            film_name: "Aashiqui 2",
            views: 1000000,
            likes: 500000
        },
        {
            title: "Tera Ban Jaunga",
            artist: "Akhil Sachdeva",
            film_name: "Kabir Singh",
            views: 2000000,
            likes: 800000
        },
        {
            title: "Raabta",
            artist: "Arijit Singh",
            film_name: "Agent Vinod",
            views: 1500000,
            likes: 600000
        }
    ];
    try {
        const Newsongs = await Song.insertMany(songs);
        res.status(200).json({ message: "Songs inserted successfully" });
    } catch (err) {
        console.error("Error inserting songs", err);
        res.status(500).json({ message: "Error inserting songs" });
    }
});

app.post("/addsong", async (req, res) => {
    const { title, artist, film_name, views, likes } = req.body;
    const song = new Song({
        title: title,
        artist: artist,
        film_name: film_name,
        views: views,
        likes: likes
    })
    try {
        await song.save();
        res.status(200).json({ message: "Song added successfully" });
    }
    catch (err) {
        console.error("Error adding song", err);
        res.status(500).json({ message: "Error adding song" });
    }
})


app.get("/getall", async (req, res) => {
    try {
        const songs = await Song.find();
        const songsCount = await Song.countDocuments();
        res.status(200).json({
            songs: songs,
            count: songsCount
        });
    } catch (error) {
        console.error("Error fetching songs", error);
        res.status(500).json({ message: "Error in fetfching songs" })
    }
})

app.delete("/deletesong/:id", async (req, res) => {
    const { id } = req.params.id;
    try {
        await Song.findByIdAndDelete(id);
        res.status(200).json({ message: "Song deleted successfully" });
    } catch (error) {
        console.error("Error deleting song", error);
        res.status(500).json({ message: "Error deleting song" });
    }
})

app.get("/getsongs/:name", async (req, res) => {
    const { name } = req.params;
    try {
        const songs = await Song.find({ title: name });
        if (songs.length > 0) {
            res.status(200).json({ songs: songs });
        }
        else {
            res.status(404).json({ message: "No songs found" });
        }
    }
    catch (error) {
        console.error("Error fetching songs", error);
        res.status(500).json({ message: "Error fetching songs" });
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
}
);