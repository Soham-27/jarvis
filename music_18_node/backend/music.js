import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
    title: String,
    artist: String,
    film_name: String,
    views: Number,
    likes: Number
})

const Song = mongoose.model("Song", SongSchema);
export default Song;