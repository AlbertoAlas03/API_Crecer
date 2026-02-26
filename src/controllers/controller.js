const Data = require('../models/data');
const validation = require('../utils/validation')

exports.login = async (req, res) => {
    try {

        const { DUI, password } = req.body

        if (!DUI || !password) {
            return res.status(400).json({
                message: 'DUI y contraseña son requeridos'
            })
        }

        const isValidDUI = validation.validation(DUI)

        if (!isValidDUI) {
            return res.status(400).json({ message: 'Formato de DUI inválido' });
        }

        const user = await Data.findOne({ DUI: DUI, password: password })

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        res.json({ message: 'Login exitoso', isLoggin: true, user: user });

    } catch (error) {
        console.log(error)
        res.status(500).send(error);
        next();
    }
}

exports.register = async (req, res) => {
    try {

        const { nombre, DUI, password } = req.body

        if (!nombre || !DUI || !password) {
            return res.status(400).json({
                message: 'Nombre, DUI y contraseña son requeridos'
            })
        }


        const isValidDUI = validation.validation(DUI)

        if (!isValidDUI) {
            return res.status(400).json({ message: 'Formato de DUI inválido' });
        }

        const existUser = await Data.findOne({ DUI: DUI })

        if (existUser) {
            return res.status(400).json({
                message: 'Ya existe un usuario registrado con este DUI'
            })
        }

        const newUser = new Data({
            nombre: nombre,
            DUI: DUI,
            password: password
        })

        await newUser.save()

        res.json({
            message: 'Registro exitoso'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send(error);
        next();
    }
}

