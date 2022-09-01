import usermodel from '../model/UserSchema.js'
import blogmodel from '../model/blogschema.js'
import { register, login, getallusers, adminblog, admin, viewblogs, deleteblogs, updateblogs } from '../Controllers/Register.js'
import express from 'express';
const router = express.Router();
router.post('/user', register);
router.post('/users', login);
router.get('/get', getallusers);
router.post('/create/:id', admin, adminblog);
router.get('/getblogs', viewblogs)
router.delete('/deleteblog/:id', admin, deleteblogs);
router.post('/updateblog/:id', admin, updateblogs)


export default router;