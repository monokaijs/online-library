import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(FormData);

class MailingService {
  getClient() {
    return mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY!
    })
  }
  sendEmail(to: string, subject: string, body: string) {
    const client = this.getClient();
    return client.messages.create('dev.stable.vn', {
      to,
      from: 'noreply@dfreebooks.com',
      subject,
      html: body,
    });
  }
}

export default new MailingService();
