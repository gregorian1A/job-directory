import express from 'express';
import {getAllJobs, getJob, createJob, deleteJobPost, getJobsBySearch, searchLight} from '../controllers/jobs.js';
import {fetchAdverts, postAdvert} from '../controllers/adverts.js';
import {auth} from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllJobs);
//router.get('/search', getJobsBySearch);
router.get('/adverts', fetchAdverts);
router.get('/searcher', searchLight);
router.get('/:id', getJob);
router.post('/', auth, createJob);
router.delete('/:id', auth, deleteJobPost);
router.post('/adverts', auth, postAdvert);

export default router;