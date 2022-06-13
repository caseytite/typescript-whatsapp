import { useContacts } from "../context/ContactsProvider";
import { ListGroup } from "react-bootstrap";
import { Contact } from "../types/types";

//Renders the list of contacts in the Sidebar Component
const Contacts: React.FC = () => {
  //Grabs the contacts
  const { contacts }: { contacts: Contact[] } = useContacts();

  const contactList: JSX.Element[] = contacts.map((contact: Contact) => (
    <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
  ));
  return <ListGroup variant="flush">{contactList}</ListGroup>;
};

export default Contacts;
