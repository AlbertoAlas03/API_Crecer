import { Router } from 'express';
const router = Router();
import {
    login,
    register,
    register_children,
    add_children,
    add_basic_data,
    add_allergies,
    add_conditions,
    add_medications,
    add_professional_preferred,
    delete_item,
    update_item,
    delete_children
} from '../controllers/controller.js'

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
router.post('/api/register_children', register_children)
router.post('/api/add_children', add_children)
router.post('/api/add_basic_data', add_basic_data)
router.post('/api/add_allergies', add_allergies)
router.post('/api/add_conditions', add_conditions)
router.post('/api/add_medications', add_medications)
router.post('/api/add_professional_preferred', add_professional_preferred)
router.post('/api/delete_item', delete_item)
router.post('/api/update_item', update_item)
router.post('/api/delete_children', delete_children)

export default router