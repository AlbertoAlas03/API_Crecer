import { Router } from 'express';
import { add_children, register_children, delete_children } from '../controllers/ChildrenController.js';
const router = Router();

//routes
router.get('/test', (req, res) => {
    const data = {
        "id": "1",
        "name": "API is working from children routes"
    }
    res.json(data);
});

router.post('/register_children', register_children)
router.post('/add_children', add_children)
router.post('/delete_children', delete_children)

export default router