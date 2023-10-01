import { z } from 'zod';

export let emailSchema = z.object({
  from: z.object({
    name: z.string().optional(),
    email: z.string().email()
  }),
  to: z.array(
    z.object({
      name: z.string().optional(),
      email: z.string().email(),

      variables: z.record(z.union([z.string(), z.number()])).optional(),

      replyTo: z.string().email().optional(),
      cc: z.array(z.string().email()).optional(),
      bcc: z.array(z.string().email()).optional(),
      headers: z.record(z.string()).optional()
    })
  ),

  replyTo: z.string().email().optional(),
  cc: z.array(z.string().email()).optional(),
  bcc: z.array(z.string().email()).optional(),
  headers: z.record(z.string()).optional(),

  subject: z.string(),
  text: z.string().optional(),
  html: z.string().optional()
});

export type EmailRequest = z.infer<typeof emailSchema>;
