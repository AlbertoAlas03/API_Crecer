import { Users } from '../models/Users.js'
import { Children } from '../models/Children.js'
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

        const user = await Users
            .findOne({ DUI: DUI, password: password })
            .populate("children");

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        return res.status(200).json({ message: 'Login exitoso', isLogged: true, user: user });

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
        next();
    }
}


export const register = async (req, res) => {
    try {

        const { email, DUI, password, confirm_password } = req.body

        if (!email || !DUI || !password || !confirm_password) {
            return res.status(400).json({
                message: 'Datos incompletos'
            })
        }

        const isValidDUI = validation(DUI)

        if (!isValidDUI) {
            return res.status(400).json({ message: 'Ingresa un DUI válido (xxxxxxxx-x)' });
        }

        const existUser = await Users.findOne({ DUI: DUI })

        if (existUser) {
            return res.status(404).json({
                message: 'Ya existe un usuario registrado con este DUI'
            })
        }

        if (password !== confirm_password) {
            return res.status(400).json({
                message: "Las contraseñas no coinciden"
            })
        }

        const newUser = new Users({
            email: email,
            DUI: DUI,
            password: password
        })

        await newUser.save()

        return res.status(200).json({
            message: 'Registro exitoso'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
        next();
    }
}


export const add_children = async (req, res) => {
    try {
        const { code, DUI } = req.body

        if (!code) {
            return res.status(400).json({
                message: "NUI/NIE es requerido para agregar a su niño/a"
            })
        }

        const user = await Users.findOne({
            DUI: DUI
        })

        if (!user) {

            return res.status(404).json({
                message: "No se encontró ningún usuario registrado con el DUI proporcionado"
            })
        }

        const data_Children = await Children.findOne({
            code: code
        }).select('-code');

        if (!data_Children) {
            return res.status(404).json({
                message: "No se encontró ningún niño/a registrado con el NUI/NIE proporcionado"
            })
        }

        const exists = user.children.includes(data_Children._id);

        if (exists) {
            return res.status(400).json({
                message: "El niño/a ya está agregado a tu cuenta"
            });
        }

        await user.updateOne({
            $push: { children: data_Children._id }
        });

        return res.status(200).json({
            message: "Niño/a agregado con exito!",
            data: data_Children
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export const register_children = async (req, res) => {
    try {
        const { code, name, birthDate, gender } = req.body

        if (!code || !name || !birthDate || !gender) {
            return res.status(400).json({
                message: 'Datos incompletos'
            })
        }

        const newChildren = new Children({
            code: code,
            name: name,
            birthDate: birthDate,
            gender: gender
        })

        await newChildren.save()

        return res.status(200).json({
            message: "Niño/a registrado exitosamente"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export const add_basic_data = async (req, res) => {
    try {
        const { _id, basic_data } = req.body

        if (!basic_data) {
            return res.status(400).json({
                message: "Datos incompletos"
            })
        }

        const children = await Children.findOne({
            _id: _id
        })

        await children.updateOne({
            $push: { basic_data: basic_data }
        });

        return res.status(200).json({
            message: "Dato básico del niño/a agregado con exito!"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export const add_allergies = async (req, res) => {
    try {
        const { _id, allergies } = req.body

        if (!allergies) {
            return res.status(400).json({
                message: "Datos incompletos"
            })
        }

        const children = await Children.findOne({
            _id: _id
        })

        await children.updateOne({
            $push: { allergies: allergies }
        });

        return res.status(200).json({
            message: "Alergia del niño/a agregado con exito!"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export const add_conditions = async (req, res) => {
    try {
        const { _id, conditions } = req.body

        if (!conditions) {
            return res.status(400).json({
                message: "Datos incompletos"
            })
        }

        const children = await Children.findOne({
            _id: _id
        })

        await children.updateOne({
            $push: { conditions: conditions }
        });

        return res.status(200).json({
            message: "Condicion del niño/a agregado con exito!"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export const add_medications = async (req, res) => {
    try {
        const { _id, medications } = req.body

        if (!medications) {
            return res.status(400).json({
                message: "Datos incompletos"
            })
        }

        const children = await Children.findOne({
            _id: _id
        })

        await children.updateOne({
            $push: { medications: medications }
        });

        return res.status(200).json({
            message: "Medicación del niño/a agregada con exito!"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export const add_professional_preferred = async (req, res) => {
    try {
        const { _id, professional_preferred } = req.body

        if (!professional_preferred) {
            return res.status(400).json({
                message: "Datos incompletos"
            })
        }

        const children = await Children.findOne({
            _id: _id
        })

        await children.updateOne({
            $push: { professional_preferred: professional_preferred }
        });

        return res.status(200).json({
            message: "Profesional preferido del niño/a agregado con exito!"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}


