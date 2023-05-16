import express from 'express'; 
import * as UsersController from '../controllers/users'; 
import { requireAuth } from '../middleware/auth';

const router = express.Router(); 

router.get("/", requireAuth, UsersController.getAuthenticatedUser);

router.post("/signup", UsersController.signUp); 

router.post("/login", UsersController.login);

router.post("/logout", UsersController.logout)

export default router; 