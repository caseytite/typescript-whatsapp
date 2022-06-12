import useLocalStorage from "../hooks/useLocalStorage";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../context/ContactsProvider";
import { ConversationsProvider } from "../context/ConversationsProvider";

const App: React.FC = () => {
  // const [id, setId] = useState<string | null>(null);
  const [id, setId] = useLocalStorage("id");

  const dashboard: JSX.Element = (
    <ContactsProvider>
      <ConversationsProvider id={id}>
        <Dashboard id={id} />
      </ConversationsProvider>
    </ContactsProvider>
  );
  return id ? dashboard : <Login setId={setId} />;
};

export default App;
