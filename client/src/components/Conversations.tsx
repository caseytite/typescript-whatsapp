import { ListGroup } from "react-bootstrap";
import { useConversations } from "../context/ConversationsProvider";
import { Convo } from "../types/types";

// Conversations in the Sidebar Component
const Conversations = () => {
  //Grabs info about conversations
  const {
    conversations,
    selectConversationIndex,
  }: {
    conversations: Convo[];
    selectConversationIndex: React.Dispatch<React.SetStateAction<number>>;
  } = useConversations();

  const convo: JSX.Element[] = conversations.map(
    (conversation: Convo, i: number) => (
      <ListGroup.Item
        key={i}
        action
        active={conversation.selected}
        onClick={() => selectConversationIndex(i)}
      >
        {conversation.recipients.map((r: any) => r.name).join(", ")}
      </ListGroup.Item>
    )
  );
  return <ListGroup variant="flush">{convo}</ListGroup>;
};

export default Conversations;
