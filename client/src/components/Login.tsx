import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";
interface LoginProps {
  setId: React.Dispatch<React.SetStateAction<string | null>>;
}

const Login: React.FC<LoginProps> = ({ setId }) => {
  let idRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idRef.current?.value) {
      setId(idRef.current.value);
      idRef.current.value = "";
    }
  };

  const createNewId = () => {
    if (idRef.current?.value) {
      setId(uuidV4());
      idRef.current.value = "";
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
        <Button type={"submit"} className="me-2 mt-2">
          Login
        </Button>
        <Button variant="secondary" onClick={createNewId} className="mt-2">
          Create an ID
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
