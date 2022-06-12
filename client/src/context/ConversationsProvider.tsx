import { useContext, createContext, ReactNode } from "react";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { Recipient, Contact, Convo } from "../types/types";

const ConversationsContext = createContext<any>(null);

interface ConPro {
  children: ReactNode;
}

interface OutputValue {
  conversations: JSX.Element[];
  createConversation: (recipients: []) => void;
  selectConversationIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedConversation: JSX.Element;
}

export const useConversations: () => any = () => {
  return useContext<any>(ConversationsContext);
};

export const ConversationsProvider: React.FC<ConPro> = ({ children }) => {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [selectConversationIndex, setSelectConversationIndex] =
    useState<number>(0);
  const { contacts } = useContacts();

  const createConversation: (recipients: []) => void = (recipients) => {
    setConversations((prev: Recipient[]) => [
      ...prev,
      { recipients, messages: [] },
    ]);
  };

  const formattedConvos: JSX.Element[] = conversations.map(
    (convo: Convo, index: number) => {
      const recipients = convo.recipients.map((recip: string) => {
        const contact = contacts.find((contact: Contact) => {
          return contact.id === recip;
        });
        const name: string = (contact && contact.name) || recip;
        return { id: recip, name };
      });
      const selected = index === selectConversationIndex;
      return { ...conversations, recipients, selected };
    }
  );

  const value: OutputValue = {
    conversations: formattedConvos,
    selectedConversation: formattedConvos[selectConversationIndex],
    selectConversationIndex: setSelectConversationIndex,
    createConversation,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};
