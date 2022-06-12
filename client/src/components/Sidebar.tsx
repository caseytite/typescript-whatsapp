import { useState } from "react";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import NewConversationModal from "./NewConversationModal";
import NewContactModal from "./NewContactModal";
import { Nav, Tab, Button, Modal } from "react-bootstrap";
interface SidebarProps {
  id: string;
}

const convoKey: string = "conversations";
const contactKey: string = "contacts";

const Sidebar: React.FC<SidebarProps> = ({ id }) => {
  const [activeKey, setActiveKey] = useState<any>(convoKey);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const convoOpen = activeKey === convoKey;

  const closeModal: () => void = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <div className="d-flex flex-column" style={{ width: "250px" }}>
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={convoKey}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={contactKey}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right over-flow-auto flex-grow-1">
          <Tab.Pane eventKey={convoKey}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={contactKey}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small">
          Your Id: <span className="text-muted">{id}</span>
        </div>
        <Button
          className="rounded-0"
          onClick={() => setModalOpen((prev) => !prev)}
        >
          New {convoOpen ? "Conversation" : "Contact"}
        </Button>
      </Tab.Container>
      <Modal show={modalOpen} onHide={closeModal}>
        {convoOpen ? (
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
};

export default Sidebar;
