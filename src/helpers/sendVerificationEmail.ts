import { ApiResponse } from "@/types/ApiResponse";
import { createTransport } from 'nodemailer';

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAILID,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const html = `<html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
            }
            .content {
                font-size: 16px;
                line-height: 1.5;
                color: #333333;
            }
            .button {
                display: inline-block;
                background-color: #007bff;
                color: white;
                border-radius:10px;
                padding: 10px 20px;
                text-decoration: none;
                width: 120px;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <h1 class="heading">Welcome to Meystery Messages!,${username}</h1>
                <p>Thank you for signing up with us . To complete your registration, please verify your email address by Entering this Code.</p>
                <h2>Verification Code: ${verifyCode}</h2>
                <p>If you did not sign up with us, please ignore this email.</p><br>
            </div>
        </div>
    </body>
    </html>`;
    const mailOptions = {
        from: process.env.EMAILID,
        to: email,
        subject: 'Mystry Message | Verification Code',
        html: html
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: ', info.messageId);
        return { success: true, message: "Verification email sent successfully." }
    } catch (error) {
        console.log('Error sending email: ', error);
        return { success: false, message: "Fail to sending verification email. Please try again later." }
    }
}
