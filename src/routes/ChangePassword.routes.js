import { Router } from 'express';
import { requestCode, changePassword } from '../controllers/ChangePasswordController.js';
const router = Router();

//routes
router.get('/test', (req, res) => {
    const data = {
        "id": "1",
        "name": "API is working from change password routes"
    }
    res.json(data);
});

router.post('/request_code', requestCode);
router.post('/change_password', changePassword);

export default router