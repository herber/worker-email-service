export interface SendEmail {
  from: {
    name?: string;
    email: string;
  };
  to: {
    name?: string;
    email: string;
  };
  replyTo?: string;
  cc?: string[];
  bcc?: string[];
  headers?: Record<string, string>;

  subject: string;
  text?: string;
  html?: string;
}

export let send = async (opts: SendEmail) => {
  let res = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      from: opts.from,
      subject: opts.subject,
      content: [
        {
          type: 'text/plain',
          value: opts.text
        },
        {
          type: 'text/html',
          value: opts.html
        }
      ].filter(x => x.value),
      headers: opts.headers,
      personalizations: [
        {
          to: [opts.to],
          bcc: opts.bcc?.map(x => ({ email: x })),
          cc: opts.cc?.map(x => ({ email: x }))
        }
      ],
      replyTo: opts.replyTo
    })
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
};
