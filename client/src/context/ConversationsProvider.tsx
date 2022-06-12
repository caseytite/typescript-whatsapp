import { useContext, createContext, ReactNode } from "react";
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { Contact } from "../types/types";

const ConversationsContext = createContext<any>(null);

interface ConPro {
  children: ReactNode;
}
export type Convo = {
  id: string;
  recipients: string[];
  messages: string[];
};
interface OutputValue {
  conversations: JSX.Element[];
  createConversation: (recipients: []) => void;
}
export interface Recipient {
  name: string;
  id: string;
}

export const useConversations: () => any = () => {
  return useContext<any>(ConversationsContext);
};

export const ConversationsProvider: React.FC<ConPro> = ({ children }) => {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const { contacts } = useContacts();

  const createConversation: (recipients: []) => void = (recipients) => {
    setConversations((prev: Recipient[]) => [
      ...prev,
      { recipients, messages: [] },
    ]);
  };

  const formattedConvos: JSX.Element[] = conversations.map((convo: Convo) => {
    const recipients = convo.recipients.map((recip: string) => {
      const contact = contacts.find((contact: Contact) => {
        return contact.id === recip;
      });
      const name: string = (contact && contact.name) || recip;
      return { id: recip, name };
    });
    return { ...conversations, recipients };
  });

  const value: OutputValue = {
    conversations: formattedConvos,
    createConversation,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};
