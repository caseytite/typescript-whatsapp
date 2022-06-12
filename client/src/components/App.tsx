import { useState } from "react";
import Login from "./Login";

const App: React.FC = () => {
  const [id, setId] = useState<number>(0);
  return <Login setId={setId} />;
};

export default App;
