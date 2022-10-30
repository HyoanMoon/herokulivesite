import express from 'express';
const router = express.Router();

import { AuthGuard } from '../Util';

import {DisplayAddPage, DisplayEditPage, DisplayMovieList, ProcessAddPage, ProcessDeletePage, ProcessEditPage} from "../Controllers/movie-list";

/* Display movie- list page */ 
router.get('/movie-list', AuthGuard ,DisplayMovieList); 


/* Display Add  page */ 
router.get('/add', AuthGuard ,DisplayAddPage); 

/* Display Edit page */ 
router.get('/edit/:id', AuthGuard ,DisplayEditPage); 

/* Process Add  page */ 
router.post('/add', AuthGuard ,ProcessAddPage); 

/* Process Edit page */ 
router.post('/edit/:id', AuthGuard ,ProcessEditPage); 

/* Process Delete page */ 
router.get('/delete/:id', AuthGuard ,ProcessDeletePage); 




export default router;