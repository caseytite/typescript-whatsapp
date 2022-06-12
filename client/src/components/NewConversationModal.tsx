import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../context/ContactsProvider";
import { useConversations } from "../context/ConversationsProvider";
import { Contact } from "../types/types";

interface ModalProps {
  closeModal: () => void;
}

const NewConversationModal: React.FC<ModalProps> = ({ closeModal }) => {
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();

    createConversation(selectedContactIds);
    closeModal();
  };

  const handleCheckBoxChange: (id: string) => void = (id) => {
    setSelectedContactIds((prev: string[]) => {
      if (prev.includes(id)) {
        return prev.filter((prevId: string) => {
          return prevId !== id;
        });
      } else {
        return [...prev, id];
      }
    });
  };

  const checkId: (id: string) => any = (id) => {
    return selectedContactIds.includes(id);
  };

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
