import React from "react";
import { useContacts } from "../context/ContactsProvider";
import { ListGroup } from "react-bootstrap";
import { Contact } from "../types/types";

const Contacts: React.FC = () => {
  const { contacts } = useContacts();
  const contactList: JSX.Element[] = contacts.map((contact: Contact) => (
    <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
  ));
  return <ListGroup variant="flush">{contactList}</ListGroup>;
};

export default Contacts;
