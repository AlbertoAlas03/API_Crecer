import nodemailer from 'nodemailer'
import dotnev from 'dotenv'
dotnev.config()

const transporter = nodemailer.createTransport({
    service: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    family: 4
});

export default transporter