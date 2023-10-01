import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { handle } from 'hono/cloudflare-pages';
import { buildEmails } from '../lib/buildEmails';
import { emailSchema } from '../lib/schema';
import { send } from '../lib/send';

let app = new Hono<{ Bindings: { TOKEN: string } }>();

app.notFound(c =>
  c.json(
    {
      code: 'not_found',
      message: 'The requested resource was not found.'
    },
    404
  )
);

app.onError((e, c) => {
  console.error(e);

  return c.json(
    {
      code: 'internal_error',
      message: 'An internal error occurred.'
    },
    500
  );
});

app.get('/ping', c => c.json({ ok: true }));

app.post('/send', zValidator('json', emailSchema), async c => {
  if (c.env.TOKEN && c.env.TOKEN != c.req.headers.get('authorization')?.split(' ')[1]) {
    return c.json(
      {
        code: 'unauthorized',
        message: 'You are not authorized to use this endpoint.'
      },
      401
    );
  }

  let data = c.req.valid('json');
  let emails = buildEmails(data);

  await Promise.all(emails.map(email => send(email)));

  return c.json({ ok: true, emails });
});

export let onRequest = handle(app);
