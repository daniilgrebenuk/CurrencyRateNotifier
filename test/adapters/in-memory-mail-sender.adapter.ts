import {
  MailInfo,
  MailSenderPort,
} from '../../src/currency-rate/domain/port/mail-sender.port';

export class InMemoryMailSenderAdapter implements MailSenderPort {
  private sendMailCallsAmount = 0;
  private sentMails: Record<string, MailInfo> = {};

  async sendMail(destination: string, mail: MailInfo) {
    this.sendMailCallsAmount++;
    this.sentMails[destination] = mail;
  }

  getSentMail(destination: string) {
    return this.sentMails[destination];
  }

  getSendMailCallsAmount() {
    return this.sendMailCallsAmount;
  }
}
