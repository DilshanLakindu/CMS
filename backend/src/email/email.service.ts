import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'graphql';
import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';

let token = '';

@Injectable()
export class EmailService {
  constructor(private jwtService: JwtService) {}
  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dilshanlakindu5@gmail.com',
      pass: 'mmlgudrxuouoowao',
    },
  });

  async generateToken(to: string): Promise<string> {
    // Replace this with your own secret key
    const token = this.jwtService.sign('');
    console.log('---------token', token);
    console.log(to);
    return token;
  }

  defaults: {
    from: '"No Reply" <dilshanlakindu5@gmail.com>';
  };

  async sendEmail(to: string) {
    const token = await this.generateToken(to);
    console.log(token);
    const magicLink = `http://localhost:3006/newpsw?${token}`;
    const template = `
    
    <html>
    <head>
      <title>CMS Back Office</title>
    </head>
      <body>
      <h1>Reset Password</h1>
      <p>${magicLink}</p>
      <p>Thank you for signing up to our website.</p>
      <p>Best regards,</p>
      <p>The My Website Team</p>
      </body>
      </html>`;

    const mailOptions = {
      from: 'dilshanlakindu5@gmail.com',
      to,
      html: template,
    };
    return await this.transporter.sendMail(mailOptions);
  }
}
