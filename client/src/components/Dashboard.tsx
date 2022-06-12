import SideBar from "./Sidebar";
interface DashboardProps {
  id: string;
}

const Dashboard: React.FC<DashboardProps> = ({ id }) => {
  return <SideBar id={id} />;
};

export default Dashboard;
