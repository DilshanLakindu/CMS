import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';

@Injectable()
export class EmailService {
  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dilshanlakindu5@gmail.com',
      pass: 'mmlgudrxuouoowao',
    },
  });
  async sendEmail(to: string, subject: string, htmls: string) {
    console.log('email', to, subject, htmls);

    const template = `<html>
    <head>
      <title>CMS Back Office</title>
    </head>
      <body>
      <h1>Reset Password</h1>
      <p>Dear ${subject},</p>
      <p>Thank you for signing up to our website.</p>
      <p>Best regards,</p>
      <p>The My Website Team</p>
      </body>
     </html>`;

    const mailOptions = {
      from: 'dilshanlakindu5@gmail.com',
      to,
      subject,
      html: template,
    };
    return await this.transporter.sendMail(mailOptions);
  }
}
