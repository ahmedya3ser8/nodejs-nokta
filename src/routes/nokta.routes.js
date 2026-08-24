import express from 'express';

import protectMiddleware from '../middlewares/protect.middleware.js';
import { 
  createNokta, 
  deleteNokta, 
  getAllNokta, 
  getAllNoktaByPerson, 
  getNoktaById, 
  updateNokta 
} from '../controllers/nokta.controller.js';
import { 
  createNoktaValidation, 
  deleteNoktaValidation, 
  getNoktaByIdValidation, 
  getNoktaByPersonValidation, 
  updateNoktaValidation 
} from '../validations/nokta.validation.js';

const router = express.Router();

router.use(protectMiddleware);

router.route('/')
  .get(getAllNokta)
  .post(createNoktaValidation, createNokta)

router.get('/person/:personId', getNoktaByPersonValidation, getAllNoktaByPerson)

router.route('/:id')
  .get(getNoktaByIdValidation, getNoktaById)
  .patch(updateNoktaValidation, updateNokta)
  .delete(deleteNoktaValidation, deleteNokta)


export default router;
