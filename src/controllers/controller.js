import { Data } from '../models/data.js'
import { DataKids } from '../models/data_kids.js'
import { KidsForAdd } from '../models/kids_for_add.js'
import validation from '../utils/validation.js'

export const login = async (req, res) => {
    try {

        const { DUI, password } = req.body

        if (!DUI || !password) {
            return res.status(400).json({
                message: 'Credenciales incompletas'
            })
        }

        const isValidDUI = validation(DUI)

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


export const register = async (req, res) => {
    try {

        const { correo, DUI, password, confirm_password } = req.body

        if (!correo || !DUI || !password || !confirm_password) {
            return res.status(400).json({
                message: 'Datos incompletos'
            })
        }

        const isValidDUI = validation(DUI)

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

        res.status(200).json({
            message: 'Registro exitoso'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send(error);
        next();
    }
}

export const get_data_kids = async (req, res) => {
    try {

        const data_kids = await DataKids.find();

        res.status(200).json({
            message: "Niños registrados",
            data: data_kids
        })

    } catch (error) {
        console.log(error)
        res.status(500).send(error);
        next();
    }
}

export const register_kid = async (req, res) => {
    try {
        const { name, birthDate, gender } = req.body

        if (!name || !birthDate || !gender) {
            return res.status(400).json({
                message: 'Datos incompletos'
            })
        }

        const newKid = new DataKids({
            nombre: name,
            fecha_nacimiento: birthDate,
            sexo: gender
        })

        await newKid.save()

        res.status(200).json({
            message: "Niño registrado exitosamente"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send(error);
        next();
    }
}

export const add_kid = async (req, res) => {
    try {
        const { codigo } = req.body

        if (!codigo) {
            res.status(404).json({
                message: "NUI/NIE es requerido para agregar a su niño/a"
            })
        }

        const data_kids = await KidsForAdd.findOne({
            codigo: codigo
        }).select('-codigo');

        if (data_kids === null) {
            res.status(404).json({
                message: "No se encontró ningún niño/a registrado con el NUI/NIE proporcionado"
            })
        }

        const newKid = new DataKids({
            nombre: data_kids.nombre,
            fecha_nacimiento: data_kids.fecha_nacimiento,
            sexo: data_kids.sexo
        })

        await newKid.save()

        res.status(200).json({
            message: "Niño agregado con exito!",
            data: data_kids
        })

    } catch (error) {
        console.log(error)
        res.status(500).send(error);
        next();
    }
}

export const register_kid_for_add = async (req, res) => {
    try {
        const { codigo, name, birthDate, gender } = req.body


        const newKid = new KidsForAdd({
            codigo: codigo,
            nombre: name,
            fecha_nacimiento: birthDate,
            sexo: gender
        })

        await newKid.save()

        res.status(200).json({
            message: "Niño agregado correctamente"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send(error);
        next();
    }
}




