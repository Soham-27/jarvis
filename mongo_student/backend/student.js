import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    student_name: String,
    roll_no: Number,
    wad: Number,
    dsbda: Number,
    cns: Number,
    cc: Number,
    ai: Number
})

const Student = mongoose.model("Student", StudentSchema);
export default Student;