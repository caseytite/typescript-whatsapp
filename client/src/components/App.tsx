import useLocalStorage from "../hooks/useLocalStorage";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../context/ContactsProvider";
import { ConversationsProvider } from "../context/ConversationsProvider";
import SocketProvider from "../context/SocketProvider";

const App: React.FC = () => {
  // Sets the users id into local storage
  const [id, setId] = useLocalStorage("id");

  const dashboard: JSX.Element = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );
  return id ? dashboard : <Login setId={setId} />;
};

export default App;
