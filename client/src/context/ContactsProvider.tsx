import { useContext, createContext, ReactNode } from "react";
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Contact } from "../types/types";

const ContactsContext = createContext<any>(null);

interface ConPro {
  children: ReactNode;
}

interface ContactsOutput {
  contacts: {}[];
  createContact: (contact: Contact) => void;
}

export const useContacts: () => any = () => {
  return useContext<any>(ContactsContext);
};

export const ContactsProvider: React.FC<ConPro> = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  const createContact: (contact: Contact) => void = ({ id, name }) => {
    setContacts((prev: {}[]) => [...prev, { id, name }]);
  };
  const value: ContactsOutput = {
    contacts,
    createContact,
  };

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
};
