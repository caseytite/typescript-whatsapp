import { ListGroup } from "react-bootstrap";
import { useConversations } from "../context/ConversationsProvider";
import { Convo } from "../types/types";

const Conversations = () => {
  const { conversations, selectConversationIndex } = useConversations();

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
