export type Contact = {
  id: string;
  name: string;
};
export type Convo = {
  id: string;
  recipients: string[];
  messages: Message[];
  selected: boolean;
};
export type Message = {
  sender: string;
  text: string;
  senderName?: string;
  fromMe?: boolean;
};

export type SendMessage = {
  recipients: string[];
  text: string;
};
export type Recipient = {
  recipients: string[];
  messages: Message[];
};
