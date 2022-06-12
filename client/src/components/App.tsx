import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Login from "./Login";
import Dashboard from "./Dashboard";

const App: React.FC = () => {
  const [id, setId] = useState<string | null>(null);
  // const [id, setId] = useLocalStorage();
  return id ? <Dashboard id={id} /> : <Login setId={setId} />;
};

export default App;
