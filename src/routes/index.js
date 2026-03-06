import { Router } from 'express';
const router = Router();
import { login, register, register_kid, get_data_kids, register_kid_for_add, add_kid } from '../controllers/controller.js'

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
router.post('/api/register_kid', register_kid)
router.get('/api/get_data_kids', get_data_kids)

router.post('/api/register_for_add', register_kid_for_add)
router.post('/api/add_kid', add_kid)


export default router