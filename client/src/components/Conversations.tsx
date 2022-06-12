import { ListGroup } from "react-bootstrap";
import { Convo, useConversations } from "../context/ConversationsProvider";

const Conversations = () => {
  const { conversations } = useConversations();
  const convo: JSX.Element[] = conversations.map(
    (conversation: Convo, index: number) => (
      <ListGroup.Item key={index}>
        {conversation.recipients.map((r: any) => r.name).join(", ")}
      </ListGroup.Item>
    )
  );
  return <ListGroup variant="flush">{convo}</ListGroup>;
};

export default Conversations;
