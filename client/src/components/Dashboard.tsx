import { useConversations } from "../context/ConversationsProvider";
import OpenConversation from "./OpenConversation";
import SideBar from "./Sidebar";
interface DashboardProps {
  id: string;
}

const Dashboard: React.FC<DashboardProps> = ({ id }) => {
  const { selectedConversation } = useConversations();
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <SideBar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  );
};

export default Dashboard;
