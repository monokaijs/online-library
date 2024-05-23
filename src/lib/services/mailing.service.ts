import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(FormData);

class MailingService {
  getClient() {
    const mailgunKey = process.env.MAILGUN_API_KEY!
    if (!mailgunKey) throw new Error("Please configure mailgun first!");

    return mailgun.client({
      username: 'api',
      key: mailgunKey
    })
  }
  sendEmail(to: string, subject: string, body: string) {
    const client = this.getClient();
    return client.messages.create(process.env.MAILGUN_DOMAIN ?? 'dev.stable.vn', {
      to,
      from: 'noreply@dfreebooks.com',
      subject,
      html: body,
    });
  }
}

export default new MailingService();
