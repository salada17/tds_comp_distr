import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Client from './api';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { AuthContext } from './AuthProvider';

function Signup() {
  const auth = React.useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const client = new Client()
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    setValidated(true);
    
    if (form.checkValidity() === false) {
      return false  
    }

    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    const registration_code = form.elements.registration_code.value

    event.preventDefault();
    event.stopPropagation();
    
    client.createAccount({name, email, password, registration_code})
      .then(resp => {
        if (resp.status === 201) {
          navigate('/posts');
        }
      })
      .catch(err => console.log(err));
  };

  const handleGoogleLogin = async googleData => {
    const res = await fetch('http://localhost:3001/api/v1/auth/google', {
      method: 'POST',
      body: JSON.stringify({ token: googleData.tokenId }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      // TODO: handle error
    }

    const student = await res.json();
    auth.signin(student);
    navigate('/posts');
  }

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" placeholder="Nome" name="name" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" name="email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" placeholder="Senha" name="password" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Matrícula</Form.Label>
          <Form.Control type="text" placeholder="Matrícula" name="registration_code" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Criar conta
        </Button>
      </Form>

      <hr />

      <p className="mt-4">OU</p>

      <GoogleLogin
        clientId={'900391367393-u4oqasgbj6ssbr5tmhlncipuniidr0vi.apps.googleusercontent.com'}
        buttonText="Usar conta Google"
        onSuccess={handleGoogleLogin}
        onFailure={handleGoogleLogin}
        cookiePolicy={'single_host_origin'}
      />
    </>
  );
}

export default Signup;
