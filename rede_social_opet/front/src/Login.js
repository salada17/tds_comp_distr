import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

function Login() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    setValidated(true);
    
    if (form.checkValidity() === false) {
      return false  
    }

    const email = form.elements.email.value;
    const password = form.elements.password.value;
    
    // TODO: login the user.
    console.log(email, password);

    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <>
      <h2>Login</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
        <Form.Control name="password" type="password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Entrar
        </Button>
      </Form>

      <hr />

      <p>OU</p>

      <Button variant="primary" type="button">Login com Google</Button>
    </>
  );
}

export default Login;
