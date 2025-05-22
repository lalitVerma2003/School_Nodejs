import express from 'express'
import { addSchool, listSchools } from '../controller/school.js';
import { schoolSchema } from '../validations/schoolValidation.js';
import { reqValidator } from '../middleware/reqValidater.js';

const router = express.Router()

router.get('/listSchools', listSchools);

router.post('/addSchool', reqValidator(schoolSchema),addSchool);

export default router;