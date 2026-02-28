import { Router } from 'express';
const router = Router();
import { login, register } from '../controllers/controller.js'

//routes
router.get('/api/test', (req, res) => {
    const data = {
        "id": "1",
        "name": "API is working"
    }
    res.json(data);
});

router.post('/api/login', login)
router.post('/api/register', register)

export default router