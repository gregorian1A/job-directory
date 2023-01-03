import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import jobsRoutes from './routes/jobs.js';
import authRoutes from './routes/auth.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

app.use('/jobs', jobsRoutes);
app.use('/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
    //*Set static folder
    app.use(express.static('frontend/build'));
    
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build','index.html')));
  }

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, useUnifiedTopology: true, dbName: 'jobs'
})
.then(() => app.listen(process.env.PORT || 3001, () => console.log('App is listening on PORT 3001')))
.catch(err => console.error(err))



