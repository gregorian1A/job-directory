import mongoose from 'mongoose';
import {Advert} from '../models/adverts.js';

export const fetchAdverts = async (req, res) => {

    try {
        const adverts = await Advert.find();
        
        res.status(200).json(adverts);
    } catch (error) {
        console.error(error);
        res.status(404).json({message: error.message});
    }
};

export const postAdvert = async (req, res) => {
    const advert = req.body;
    const newAdvertPost = new Advert({...advert, creator: req.userId, createdAt: new Date().toISOString()});

    try {
        await newAdvertPost.save();
        res.status(209).json('Advert posted');
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}