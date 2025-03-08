import express from 'express';

const router = express.Router();


//----To load main controller for business logic
import * as mainController from '../controller/main.controller.js';

/**
 * GET - HOME
 */
router.get('/', mainController.home);

/**
 * GET - render post : id
 */
router.get('/post/:id', mainController.post);

/**
 * POST - Search term
 */
router.post('/search', mainController.search);


export default router;
