import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../context/ContactsProvider";
import { useConversations } from "../context/ConversationsProvider";
import { Contact } from "../types/types";

interface ModalProps {
  closeModal: () => void;
}

// The modal that pops up when a users initiates a new Conversation
const NewConversationModal: React.FC<ModalProps> = ({ closeModal }) => {
  // Handles the selected checkbox states
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const { contacts }: { contacts: Contact[] } = useContacts();
  const {
    createConversation,
  }: { createConversation: (recipients: string[]) => void } =
    useConversations();

  const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();

    createConversation(selectedContactIds);
    closeModal();
  };

  // Handles the checkboxs
  const handleCheckBoxChange: (id: string) => void = (id) => {
    setSelectedContactIds((prev: string[]) => {
      //If the box is selected unselects it
      if (prev.includes(id)) {
        return prev.filter((prevId: string) => {
          return prevId !== id;
        });
        // else selects the checkbox
      } else {
        return [...prev, id];
      }
    });
  };

  // Sets a boolean to select the checkbox or not
  const checkId: (id: string) => any = (id) => {
    return selectedContactIds.includes(id);
  };

  // Builds the contact list
  const contactList: JSX.Element[] = contacts.map((contact: Contact) => (
    <Form.Group key={contact.id} controlId={contact.id}>
      <Form.Check
        type={"checkbox"}
        value={checkId(contact.id)}
        label={contact.name}
        onChange={() => handleCheckBoxChange(contact.id)}
      />
    </Form.Group>
  ));

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contactList}
          <Button className="mt-2" type={"submit"}>
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewConversationModal;
