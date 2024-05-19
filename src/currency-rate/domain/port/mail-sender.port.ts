export abstract class MailSenderPort {
  abstract sendMail(destination: string, mail: MailInfo): Promise<void>;
}

export type MailInfo = { subject: string; body: string };
