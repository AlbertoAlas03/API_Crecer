import { Users } from '../models/Users.js'
import { Children } from '../models/Children.js'
import { validationDUI, validationEmail } from '../utils/validation.js'
import CONSTANTS_TEXT from '../config/constants.js'
import dotnev from 'dotenv'
dotnev.config()

export const login = async (req, res) => {
    try {

        const { DUI, password } = req.body

        if (!DUI || !password) {
            return res.status(400).json({
                message: CONSTANTS_TEXT.login
            })
        }

        const isValidDUI = validationDUI(DUI)

        if (!isValidDUI) {
            return res.status(400).json({ message: CONSTANTS_TEXT.invalid_DUI });
        }

        const user = await Users
            .findOne({ DUI: DUI, password: password })
            .populate("children");

        if (!user) {
            return res.status(401).json({ message: CONSTANTS_TEXT.invalid_credentials });
        }

        return res.status(200).json({ message: CONSTANTS_TEXT.login_success, isLogged: true, user: user });

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export const register = async (req, res) => {
    try {

        const { name, lastName, email, DUI, gender, password, confirm_password } = req.body

        if (!name || !lastName || !email || !DUI || !gender || !password || !confirm_password) {
            return res.status(400).json({
                message: CONSTANTS_TEXT.incomplete_data
            })
        }

        const isValidDUI = validationDUI(DUI)
        const isValidEmail = validationEmail(email)

        if (!isValidDUI) {
            return res.status(400).json({ message: CONSTANTS_TEXT.invalid_DUI });
        } else if (!isValidEmail) {
            return res.status(400).json({ message: CONSTANTS_TEXT.invalid_email })
        }

        const existUser = await Users.findOne({ DUI: DUI })

        if (existUser) {
            return res.status(404).json({
                message: CONSTANTS_TEXT.user_exists
            })
        }

        if (password !== confirm_password) {
            return res.status(400).json({
                message: CONSTANTS_TEXT.password_mismatch
            })
        }

        const newUser = new Users({
            name: name,
            lastName: lastName,
            email: email,
            DUI: DUI,
            gender: gender,
            password: password
        })

        await newUser.save()

        return res.status(200).json({
            message: CONSTANTS_TEXT.register_success
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

export const delete_user = async (req, res) => {
    try {

        const { DUI } = req.body

        if (!DUI) {
            return res.status(400).json({
                message: CONSTANTS_TEXT.incomplete_data
            })
        }

        const request = await Users.findOneAndDelete({
            DUI: DUI
        })

        if (!request) {
            return res.status(404).json({
                message: CONSTANTS_TEXT.user_not_found
            })
        }

        return res.status(200).json({
            message: CONSTANTS_TEXT.user_deleted
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}



