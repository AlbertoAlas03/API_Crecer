import CONSTANTS_TEXT from "../config/constants.js"
import { validationEmail } from '../utils/validation.js'
import { Users } from "../models/Users.js"
import Transporter from "../emails/configurationEmail.js"
import { ChangePassword } from "../models/ChangePassword.js"
import dotnev from 'dotenv'
dotnev.config()

export const requestCode = async (req, res) => {
    try {

        const { email } = req.body

        if (!email) {
            return res.status(400).json({
                message: CONSTANTS_TEXT.email_missing
            })
        } else if (!validationEmail(email)) {
            return res.status(404).json({
                message: CONSTANTS_TEXT.invalid_email
            })
        }

        const user = await Users.findOne({
            email: email
        })

        if (!user) {
            return res.status(404).json({
                message: CONSTANTS_TEXT.email_not_found
            })
        }

        const exitsRequest = await ChangePassword.findOne({
            email: email
        })

        if (exitsRequest) {
            return res.status(200).json({
                message: CONSTANTS_TEXT.exits_request
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

        await Transporter.sendMail(mailOptions)

        await ChangePassword.create({
            code: code,
            email: email
        })

        return res.status(200).json({
            message: CONSTANTS_TEXT.code_send
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export const changePassword = async (req, res) => {
    try {

        const { email, code, password, confirm_password } = req.body

        if (!email || !code || !password || !confirm_password) {
            return res.status(400).json({
                message: CONSTANTS_TEXT.incomplete_data
            })
        }

        const changePasswordRequest = await ChangePassword.findOne({
            email: email
        })

        if (!changePasswordRequest) {
            return res.status(404).json({
                message: CONSTANTS_TEXT.changePassword_request_not_found
            })
        } else if (password !== confirm_password) {
            return res.status(400).json({
                message: CONSTANTS_TEXT.password_mismatch
            })
        } else if (changePasswordRequest.code != code) {
            return res.status(400).json({
                message: CONSTANTS_TEXT.invalid_code
            })
        }

        await Users.updateOne({
            email: email
        }, {
            password: password
        })

        await ChangePassword.deleteOne({
            email: email
        })

        return res.status(200).json({
            message: CONSTANTS_TEXT.password_changed
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}