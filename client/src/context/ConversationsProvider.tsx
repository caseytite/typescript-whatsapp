import { useContext, createContext, ReactNode } from "react";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import {
  Recipient,
  Contact,
  Convo,
  Message,
  SendMessage,
} from "../types/types";

const ConversationsContext = createContext<any>(null);

interface ConPro {
  children: ReactNode;
  id: string;
}
type NewMessage = {
  recipients: string[];
  text: string;
  sender: string;
};

interface OutputValue {
  conversations: JSX.Element[];
  createConversation: (recipients: []) => void;
  selectConversationIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedConversation: JSX.Element;
  sendMessage: (recipients: [], text: string) => void;
}

export const useConversations: () => any = () => {
  return useContext<any>(ConversationsContext);
};

export const ConversationsProvider: React.FC<ConPro> = ({ children, id }) => {
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

  const addMessageToConversation: (newMessage: NewMessage) => void = ({
    recipients,
    text,
    sender,
  }) => {
    setConversations((prevConversations: Recipient[]) => {
      let updateConversation: boolean = false;
      const newMessage: Message = { sender, text };
      const newConversations: Recipient[] = prevConversations.map(
        (convo: Recipient) => {
          if (convosAreEqual(recipients, convo.recipients)) {
            updateConversation = true;
            return {
              ...convo,
              messages: [...convo.messages, newMessage],
            };
          }
          return convo;
        }
      );

      if (updateConversation) {
        return newConversations;
      } else {
        return [...prevConversations, { recipients, messages: newMessage }];
      }
    });
  };

  const sendMessage: (recipients: string[], text: string) => void = (
    recipients,
    text
  ) => {
    addMessageToConversation({ recipients, text, sender: id });
  };
  //fix from here!

  const formattedConvos: [] = conversations.map(
    (convo: Convo, index: number) => {
      const recipients: Contact[] = convo.recipients.map((recip: string) => {
        const contact: Contact = contacts.find((contact: Contact) => {
          return contact.id === recip;
        });
        const name: string = (contact && contact.name) || recip;

        return { id: recip, name };
      });

      const messages: Message[] = convo.messages.map((message: Message) => {
        const contact: Contact = contacts.find((contact: Contact) => {
          return +contact.id === +message.sender;
        });
        const name: string = (contact && contact.name) || message.sender;
        const fromMe: boolean = id === message.sender;

        return { ...message, senderName: name, fromMe };
      });

      const selected: boolean = index === selectConversationIndex;

      return { ...conversations, messages, recipients, selected };
    }
  );

  const value: OutputValue = {
    conversations: formattedConvos,
    selectedConversation: formattedConvos[selectConversationIndex],
    selectConversationIndex: setSelectConversationIndex,
    sendMessage,
    createConversation,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};

const convosAreEqual: (a: string[], b: string[]) => boolean = (a, b) => {
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();

  return a.every((element: string, index: number) => {
    return element === b[index];
  });
};
