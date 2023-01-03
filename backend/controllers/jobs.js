import {Jobs} from '../models/jobs.js';
import mongoose from 'mongoose';

export const getAllJobs = async (req, res) => {
    const {page} = req.query;
    try{
        const LIMIT = 9;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await Jobs.countDocuments({});
        const jobs = await Jobs.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
        res.status(200).json({data: jobs, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)});

    }catch(err) {
        console.log(err);
        res.status(404).json({message: err.message});
    }
};

export const searchLight = async (req, res) => {
    
    try{
        const jobs = await Jobs.find();
        res.status(200).json(jobs);

    }catch(err) {
        console.log(err);
        res.status(404).json({message: err.message});
    }
}

export const getJobsBySearch = async (req, res) => {
    const {searchQuery, type} = req.query;
    //console.log(req)
    try {
        const name = new RegExp(searchQuery, 'i');
        const category = new RegExp(type, 'i');
        const jobs = await Jobs.find({$and: [{name}, {category}]}); 
        res.json({data: jobs});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getJob = async (req, res) => {
    const {id} = req.params;
    try {
        const job = await Jobs.findById(id);
        res.status(200).json(job);
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error.message})
    }
}

export const createJob = async (req, res) => {
    const job = req.body;

    const newJobPost = new Jobs({...job, creator: req.userId, createdAt: new Date().toISOString() })
    try {
        await newJobPost.save();
        res.status(209).json(newJobPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const deleteJobPost = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Job post with such id');

    await Jobs.findByIdAndRemove(id);
   
    res.json({message: 'Job deleted successfully'})
}