import { Users } from '../models/Users.js'
import { Children } from '../models/Children.js'
import { ChangePassword } from '../models/ChangePassword.js'
import { validationDUI, validationEmail } from '../utils/validation.js'
import transporter from '../emails/mailer.js'
import dotnev from 'dotenv'
dotnev.config()

export const login = async (req, res) => {
    try {

        const { DUI, password } = req.body

        if (!DUI || !password) {
            return res.status(400).json({
                message: 'Credenciales incompletas'
            })
        }

        const isValidDUI = validationDUI(DUI)

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

        const isValidDUI = validationDUI(DUI)

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
                message: "NUI/NIE es requerido para registrar a su niño/a"
            })
        } else if (!validationDUI(code)) {
            return res.status(404).json({
                message: "Ingresa un NUI/NIE válido (xxxxxxxx-x)"
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
                message: "El niño/a ya está registrado en tu cuenta"
            });
        }

        await user.updateOne({
            $push: { children: data_Children._id }
        });

        return res.status(200).json({
            message: "Niño/a registrado con exito!",
            data: data_Children
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export const delete_children = async (req, res) => {
    try {
        const { _id, _id_children } = req.body

        const user = await Users.findByIdAndUpdate(
            _id,
            { $pull: { children: _id_children } },
        )

        if (!user) {
            return res.status(404).json({
                message: "No se pudo eliminar el registro."
            })
        }

        return res.status(200).json({
            message: "Se eliminó con éxito."
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

export const delete_item = async (req, res) => {
    try {
        const { _id, field, value } = req.body

        if (!_id || !field || !value) {
            return res.status(400).json({
                message: "Faltan datos"
            })
        }

        const children = await Children.findByIdAndUpdate(
            _id,
            { $pull: { [field]: value } }
        )

        if (!children) {
            return res.status(404).json({
                message: "No se pudo eliminar el registro."
            })
        }

        return res.status(200).json({
            message: "Se eliminó con éxito."
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export const update_item = async (req, res) => {
    try {
        const { _id, field, previous_value, new_value } = req.body

        if (!_id || !field || !previous_value || !new_value) {
            return res.status(400).json({
                message: "Faltan datos"
            })
        }

        const children = await Children.findById(_id)

        const index = children[field].indexOf(previous_value);

        const update = await Children.findByIdAndUpdate(
            _id,
            { $set: { [`${field}.${index}`]: new_value } }
        );

        if (!update) {
            return res.status(404).json({
                message: "No se pudo actualizar la información."
            })
        }

        return res.status(200).json({
            message: "Información actualizada con éxito."
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export const requestCode = async (req, res) => {
    try {

        const { email } = req.body

        if (!email) {
            return res.status(404).json({
                message: "Debes ingresar tu correo electrónico."
            })
        } else if (!validationEmail(email)) {
            return res.status(404).json({
                message: "Ingresa un correo electrónico válido."
            })
        }

        const user = await Users.findOne({
            email: email
        })

        if (!user) {
            return res.status(404).json({
                message: "No se encontro ningun usuario registrado con este correo electrónico, intenta nuevamente."
            })
        }

        const code = Math.floor(Math.random() * 900000) + 100000;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Código de verificación para cambio de contraseña",
            html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; text-align: center;">
            
            <h2 style="color: #333;">Cambio de contraseña</h2>
            
            <p style="color: #555; font-size: 15px;">
                Hola, hemos recibido una solicitud para cambiar tu contraseña.
            </p>

            <p style="color: #555; font-size: 15px;">
                Utiliza el siguiente código de verificación para continuar:
            </p>

            <div style="font-size: 28px; font-weight: bold; color: #2E86C1; margin: 20px 0;">
                ${code}
            </div>

            <p style="color: #555; font-size: 14px;">
                Este código es confidencial y no debe compartirse con nadie.
            </p>

            <p style="color: #999; font-size: 13px; margin-top: 20px;">
                Si no solicitaste este cambio, puedes ignorar este mensaje.
            </p>

            <hr style="margin: 20px 0;" />

            <p style="color: #aaa; font-size: 12px;">
                © ${new Date().getFullYear()} Crecer juntos. Todos los derechos reservados.
            </p>
        </div>
    </div>
    `
        }

        await transporter.sendMail(mailOptions)

        await ChangePassword.create({
            code: code,
            email: email
        })

        return res.status(200).json({
            message: "El código de verificación ha sido enviado exitosamente a su correo electrónico. Por favor, utilícelo para completar la operación."
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export const verificationCode = async (req, res) => {
    try {

        const { email, code } = req.body

        if (!code) {
            return res.status(404).json({
                message: "Debes ingresar el código de verificación que se ha enviado a tu correo electrónico."
            })
        }

        const exists = await ChangePassword.findOne({
            email: email,
            code: code
        })

        if (!exists) {
            return res.status(404).json({
                message: "Código de verificación no válido, por favor verifique."
            })
        }

        await ChangePassword.deleteOne({
            email: email
        })

        return res.status(200).json({
            message: "Código válido"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export const changePassword = async (req, res) => {
    try {

        const { email, newPassword, confirm_password } = req.body

        if (!email || !newPassword || !confirm_password) {
            return res.status(404).json({
                message: "Datos incompletos."
            })
        } else if (newPassword !== confirm_password) {
            return res.status(404).json({
                message: "Las contraseñas no coinciden, por favor verifique."
            })
        }

        await Users.findOneAndUpdate(
            { email },
            { password: newPassword }
        );

        return res.status(200).json({
            message: "Su contraseña ha sido actualizada correctamente."
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}


