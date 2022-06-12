export interface Contact {
  id: string;
  name: string;
}
export type Convo = {
  id: string;
  recipients: string[];
  messages: string[];
  selected: boolean;
};
export interface Recipient {
  name: string;
  id: string;
}
