# Send emails with a Cloudflare Worker

The worker uses the [Mailchannels](https://blog.cloudflare.com/sending-email-from-workers-with-mailchannels/) integration for Cloudflare Workers to send emails for free.

# Development

## Install

```bash
cd worker-email-service

yarn
```

## Run

```bash
yarn dev
```

This will start a development instance on `http://localhost:8788`.

# Deployment

This repo can be deployed on Cloudflare Pages using their GitHub integration or by running `yarn deploy`.

> You should set the `TOKEN` environment variable to a random string to prevent unauthorized access to the worker.
> To authenticate set the `Authorization` header to `Bearer <TOKEN>`.

> Don't forget to [set up your domain](https://support.mailchannels.com/hc/en-us/articles/16918954360845-Secure-your-domain-name-against-spoofing-with-Domain-Lockdown-) for sending emails with Mailchannels.

# Usage

## Send email

```http
POST /send
```

### Request

```js
{
  "from": {
    "name": "Jane Doe",
    "email": "jane@example.com"
  },
  "to": [
    {
      "name": "John Doe",
      "email": "john@example.com"
    }
  ],
  "subject": "Hello from Cloudflare Workers",
  "text": "This is the plain text body.",
  "html": "<p>This is the HTML body.</p>"
}
```

## Templates

You can use `{{key}}` to insert dynamic values into email subject and body.

### Request

```js
{
  "from": {
    "name": "Jane Doe",
    "email": "jane@example.com"
  },
  "to": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "variables": {
        "name": "Jane Doe"
      }
    }
  ],
  "subject": "Hello {{name}}",
  "text": "Hello {{name}}",
  "html": "<p>Hello {{name}}</p>"
}

# License

MIT © Tobias Herber