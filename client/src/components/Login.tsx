import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";

interface LoginProps {
  setId: React.Dispatch<React.SetStateAction<number>>;
}

const Login: React.FC<LoginProps> = () => {
  const idRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idRef.current?.value) {
      console.log(idRef.current.value);
      return;
    }
  };
  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form className="w-100" onSubmit={handleSubmit}>
        <Form.Label>Enter your Id</Form.Label>
        <Form.Control type={"text"} ref={idRef} required />
        <Button type={"submit"} className="mn-2">
          Login
        </Button>
        <Button variant="secondary">Create an ID</Button>
      </Form>
    </Container>
  );
};

export default Login;
