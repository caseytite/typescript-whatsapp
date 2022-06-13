import { useConversations } from "../context/ConversationsProvider";
import OpenConversation from "./OpenConversation";
import SideBar from "./Sidebar";
interface DashboardProps {
  id: string;
}
// The main view of the page
const Dashboard: React.FC<DashboardProps> = ({ id }) => {
  // Renders a conversation when a user selects one
  const { selectedConversation }: { selectedConversation: JSX.Element } =
    useConversations();
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <SideBar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  );
};

export default Dashboard;
