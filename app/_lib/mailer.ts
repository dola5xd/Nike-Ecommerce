import nodemailer from "nodemailer";

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${process.env.NEXTAUTH_URL}/api/verify-email?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Nike Store" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Verify your Nike Store account",
    html: `
      <div style="font-family: futuraExtraBold, futuraExtraBold Fallback, Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #fff; border-radius: 12px; border: 1px solid #e5e5e5;">
        <div style="text-align: center; margin-bottom: 20px;">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/512px-Logo_NIKE.svg.webp" 
               alt="Nike Logo" 
               style="width: 100px;"/>
        </div>

        <h2 style="text-align: center; color: #111; font-weight: 700; letter-spacing: 0.5px;">Welcome to Nike Store</h2>
        
        <p style="color: #444; font-size: 15px; text-align: center;">
          You’re one step away from unlocking exclusive access. Please confirm your email address to complete your sign up.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${verifyUrl}" style="background: #111; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 4px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; display: inline-block;">
            Verify Email
          </a>
        </div>

        <p style="color: #444; font-size: 14px; text-align: center;">
          Or copy and paste this link into your browser:
        </p>
        <p style="word-break: break-all; font-size: 13px; color: #111; text-align: center;">
          ${verifyUrl}
        </p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e5e5;" />

        <p style="color: #999; font-size: 12px; text-align: center;">
          If this wasn’t you, just ignore this email. Your Nike Store account won’t be activated.
        </p>
      </div>
    `,
  });
}
