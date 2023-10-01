let replaceVariables = (str: string, variables: Record<string, string | number>) => {
  // {{name}}, {{ name }}
  let regex = /{{\s*([\w\d]+)\s*}}/g;

  return str.replace(regex, (_, name) => {
    return (variables[name] ?? '').toString();
  });
};

export let renderEmail = ({
  subject,
  text,
  html,
  variables
}: {
  subject: string;
  text?: string;
  html?: string;
  variables?: Record<string, string | number>;
}) => {
  return {
    subject: replaceVariables(subject, variables ?? {}),
    text: text ? replaceVariables(text, variables ?? {}) : undefined,
    html: html ? replaceVariables(html, variables ?? {}) : undefined
  };
};
