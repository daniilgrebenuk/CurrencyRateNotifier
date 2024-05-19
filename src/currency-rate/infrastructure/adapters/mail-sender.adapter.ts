import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { MailInfo, MailSenderPort } from '../../domain/port/mail-sender.port';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailSenderAdapter implements MailSenderPort {
  private readonly sender: string;
  private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor(configService: ConfigService) {
    const host = configService.getOrThrow('EMAIL_HOST');
    const port = configService.getOrThrow('EMAIL_PORT');
    const user = configService.getOrThrow('EMAIL_USERNAME');
    const password = configService.getOrThrow('EMAIL_PASSWORD');
    this.sender = configService.getOrThrow('EMAIL_SENDER');

    this.transporter = createTransport({
      host: host,
      port: port,
      auth: {
        user: user,
        pass: password,
      },
    });
  }

  public async sendMail(destination: string, mail: MailInfo) {
    await this.transporter.sendMail({
      from: this.sender,
      to: destination,
      subject: mail.subject,
      text: mail.body,
    });
  }
}
