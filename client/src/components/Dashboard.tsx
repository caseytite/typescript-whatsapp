import SideBar from "./Sidebar";
interface DashboardProps {
  id: string;
}

const Dashboard: React.FC<DashboardProps> = ({ id }) => {
  return (
    <div className="d-flex " style={{ height: "100vh" }}>
      <SideBar id={id} />
    </div>
  );
};

export default Dashboard;
