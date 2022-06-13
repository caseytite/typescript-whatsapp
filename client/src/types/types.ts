export type Contact = {
  id: string;
  name: string;
};
export type Convo = {
  id: string;
  recipients: string[];
  messages: string[];
  selected: boolean;
};
export type Recipient = {
  name: string;
  id: string;
};
