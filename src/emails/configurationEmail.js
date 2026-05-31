import nodemailer from 'nodemailer'
import dotnev from 'dotenv'
dotnev.config()

const Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.KEY_EMAIL
    }
})

export default Transporter