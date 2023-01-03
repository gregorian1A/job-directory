import mongoose from 'mongoose';

const jobsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    location: String,
    contact1: {type: String, required: true},
    social: String,
    description: String,
    creator: String,
    reviews: {type: [String], default: []},
    selectedFile: String,
    category: {type: String, required: true},
    praesidium: String,
    createdAt: {
        type: Date, default: new Date()
    }
})

export const Jobs = mongoose.model('Jobs', jobsSchema);