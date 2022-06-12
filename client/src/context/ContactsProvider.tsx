import { useContext, createContext, ReactNode } from "react";
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ContactsContext = createContext<any>(null);

interface ConPro {
  children: ReactNode;
}

export const useContacts: () => any = () => {
  return useContext<any>(ContactsContext);
};

export const ContactsProvider: React.FC<ConPro> = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  const createContact: (id: string, name: string) => void = (id, name) => {
    setContacts((prev: {}[]) => [...prev, { id, name }]);
  };

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
};
