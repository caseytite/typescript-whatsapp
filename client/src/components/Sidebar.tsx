import { useState } from "react";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import { Nav, TabContainer, TabContent, TabPane } from "react-bootstrap";
interface SidebarProps {
  id: string;
}

const convoKey: string = "conversations";
const contactKey: string = "contacts";

const Sidebar: React.FC<SidebarProps> = ({ id }) => {
  const [activeKey, setActiveKey] = useState<any>(convoKey);
  return (
    <div className="d-flex flex-column" style={{ width: "250px" }}>
      <TabContainer activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={convoKey}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={contactKey}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent>
          <TabPane eventKey={convoKey}>
            <Conversations />
          </TabPane>
        </TabContent>
        <TabContent>
          <TabPane eventKey={contactKey}>
            <Contacts />
          </TabPane>
        </TabContent>
      </TabContainer>
    </div>
  );
};

export default Sidebar;
