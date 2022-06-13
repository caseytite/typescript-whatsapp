import { useState, useCallback } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useConversations } from "../context/ConversationsProvider";
import { Contact, Message } from "../types/types";

const OpenConversation = () => {
  const [text, setText] = useState<string>("");
  const { sendMessage, selectedConversation } = useConversations();

  // Scrolls the chat down to the last message
  const setRef = useCallback((node: any) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  // Sends the new message to the chat
  const handleSubmit: (e: React.FormEvent) => void = (e) => {
    e.preventDefault();

    sendMessage(
      selectedConversation.recipients.map((r: Contact) => r.id),
      text
    );
    setText("");
  };

  // Maps the conversation messages and builds a JSX structure
  const convoMessages: JSX.Element[] = selectedConversation.messages.map(
    (message: Message, i: number) => {
      const lastMessage: boolean =
        selectedConversation.messages.length - 1 === i;
      return (
        <div
          key={i}
          ref={lastMessage ? setRef : null}
          className={`my-1 d-flex flex-column  ${
            message.fromMe ? "align-self-end" : ""
          }`}
        >
          <div
            className={`rounded px-2 py-1 ${
              message.fromMe ? "bg-primary text-white" : "border"
            }`}
          >
            {message.text}
          </div>
          <div
            className={`text-muted small ${message.fromMe ? "text-right" : ""}`}
          >
            {message.fromMe ? "You" : message.senderName}
          </div>
        </div>
      );
    }
  );
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {convoMessages}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />

            <Button type={"submit"}>Send</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
};

export default OpenConversation;
