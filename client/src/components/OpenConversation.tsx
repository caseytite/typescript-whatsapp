import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useConversations } from "../context/ConversationsProvider";
import { Recipient } from "../types/types";

const OpenConversation = () => {
  const [text, setText] = useState<string>("");
  const { sendMessage, selectedConversation } = useConversations();
  const handleSubmit: (e: React.FormEvent) => void = (e) => {
    e.preventDefault();
    console.log(text);
    sendMessage(
      selectedConversation.recipients.map((r: Recipient) => r.id),
      text
    );
    setText("");
  };
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto"></div>
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
