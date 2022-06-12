interface DashboardProps {
  id: string;
}

const Dashboard: React.FC<DashboardProps> = ({ id }) => {
  return <div>Dashboard: {id}</div>;
};

export default Dashboard;
