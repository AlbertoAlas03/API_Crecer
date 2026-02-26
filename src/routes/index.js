const { Router } = require('express');
const router = Router();
const dataController = require('../controllers/controller');

//routes
router.get('/api/test', (req, res) => {
    const data = {
        "id": "1",
        "name": "API is working"
    }
    res.json(data);
});

router.post('/api/login', dataController.login)
router.post('/api/register', dataController.register)

module.exports = router;