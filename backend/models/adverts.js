import mongoose from 'mongoose';

const advertSchema = new mongoose.Schema({
    title: {type: String, required: true},
    company_name: {type: String, required: true},
    description: {type: String, required: true},
    closes: {type: String, required: true},
    contact: {type: String, required: true},
    createdAt: {
        type: Date, default: new Date()
    }
});

export const Advert = mongoose.model('Advert', advertSchema);