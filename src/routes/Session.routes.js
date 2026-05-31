import { Router } from 'express';
import { login, register, delete_user } from '../controllers/SessionController.js';
const router = Router();

//routes
router.get('/test', (req, res) => {
    const data = {
        "id": "1",
        "name": "API is working from session routes"
    }
    res.json(data);
}); 

router.post('/login', login)
router.post('/register', register)
router.post('/delete_user', delete_user)

export default router