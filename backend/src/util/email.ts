import nodemailer from 'nodemailer';

async function sendResetPasswordEmail(email: string, resetLink: string): Promise<void> {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'your_email_address@gmail.com', // your email address
      pass: 'your_email_password', // your email password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'your_email_address@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Reset Your Password', // Subject line
    text: `Click on this link to reset your password: ${resetLink}`, // plain text body
    html: `Click <a href="${resetLink}">here</a> to reset your password.`, // html body
  });

  console.log('Message sent: %s', info.messageId);
}

export { sendResetPasswordEmail };
