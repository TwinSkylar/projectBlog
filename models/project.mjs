import { Binary } from "mongodb";
import mongoose from "mongoose";

const Schema= mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    codeUrl:{
        type:String,
        required:true
    },
    pageUrl:{
        type:String,
        required:true
    },
    tag:{
        type:Array,
        required:true
    },
    ss:{
        data:Buffer,
        contentType:String
    },
    description:{
        type:String,
    }
},{timestamps:true});

const Project = mongoose.model('Project',projectSchema)

export default Project;