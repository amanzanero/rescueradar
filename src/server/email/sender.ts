export interface SendProps {
  to: string;
  subject: string;
  html: string;
}

export interface EmailSender {
  send: (props: SendProps) => Promise<void>;
}
