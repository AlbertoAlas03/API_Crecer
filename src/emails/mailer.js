import nodemailer from 'nodemailer'
import dotnev from 'dotenv'
dotnev.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    family: 4
});

export default transporter