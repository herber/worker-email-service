import { renderEmail } from './renderEmail';
import { EmailRequest } from './schema';
import { SendEmail } from './send';

export let buildEmails = (request: EmailRequest): SendEmail[] => {
  return request.to.map(to => ({
    from: request.from,
    to: {
      name: to.name,
      email: to.email
    },
    replyTo: to.replyTo ?? request.replyTo,
    cc: to.cc ?? request.cc,
    bcc: to.bcc ?? request.bcc,
    headers: {
      ...request.headers,
      ...to.headers
    },
    ...renderEmail({
      subject: request.subject,
      text: request.text,
      html: request.html,
      variables: to.variables
    })
  }));
};
