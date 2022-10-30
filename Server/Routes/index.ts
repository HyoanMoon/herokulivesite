import express from 'express';
const router = express.Router();

//import controller module
import {DisplayAboutPage, DisplayContactPage, DisplayHomePage, DisplayProjectPage, DisplayServicesPage} from "../Controllers/index";

/* Display home page. */
router.get('/',DisplayHomePage);

/* Display home page. */
router.get('/home', DisplayHomePage);

/* Display about page. */
router.get('/about', DisplayAboutPage);

/* Display project page. */
router.get('/projects', DisplayProjectPage);

/* Display services page. */
router.get('/services', DisplayServicesPage);

/* Display contact page. */
router.get('/contact', DisplayContactPage);


export default router;
