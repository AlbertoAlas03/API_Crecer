import { Router } from 'express';
import {
    add_basic_data,
    add_allergies,
    add_conditions,
    add_medications,
    add_professional_preferred,
    delete_item,
    update_item
} from '../controllers/AttributesChildrenController.js';

const router = Router();

//routes
router.get('/test', (req, res) => {
    const data = {
        "id": "1",
        "name": "API is working from attributes children routes"
    }
    res.json(data);
});

router.post('/add_basic_data', add_basic_data)
router.post('/add_allergies', add_allergies)
router.post('/add_conditions', add_conditions)
router.post('/add_medications', add_medications)
router.post('/add_professional_preferred', add_professional_preferred)
router.post('/delete_item', delete_item)
router.post('/update_item', update_item)

export default router