const Data = require('../models/data');
const validation = require('../utils/validation')

exports.login = async (req, res) => {
    try {

        const { DUI, password } = req.body

        if (!DUI || !password) {
            return res.status(400).json({
                message: 'Credenciales incompletas'
            })
        }

        const isValidDUI = validation.validation(DUI)

        if (!isValidDUI) {
            return res.status(400).json({ message: 'Ingresa un DUI válido (xxxxxxxx-x)' });
        }

        const user = await Data.findOne({ DUI: DUI, password: password })

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        res.json({ message: 'Login exitoso', isLogged: true, user: user });

    } catch (error) {
        console.log(error)
        res.status(500).send(error);
        next();
    }
}

exports.register = async (req, res) => {
    try {

        const { correo, DUI, password, confirm_password } = req.body

        if (!correo || !DUI || !password || !confirm_password) {
            return res.status(400).json({
                message: 'Datos incompletos'
            })
        }

        const isValidDUI = validation.validation(DUI)

        if (!isValidDUI) {
            return res.status(400).json({ message: 'Ingresa un DUI válido (xxxxxxxx-x)' });
        }

        const existUser = await Data.findOne({ DUI: DUI })

        if (existUser) {
            return res.status(400).json({
                message: 'Ya existe un usuario registrado con este DUI'
            })
        }

        if (password !== confirm_password) {
            return res.status(400).json({
                message: "Las contraseñas no coinciden"
            })
        }

        const newUser = new Data({
            correo: correo,
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


