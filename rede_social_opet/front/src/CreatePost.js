import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';
import { AuthContext } from './authContext';
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/courses', {
      headers: {
        'x-access-token': auth.user.token
      }
    }).then(resp => {
      setCourses(resp.data.courses);
    }).catch(err => {
      if ([401, 403].indexOf(err.response.status) !== -1) {
        navigate('/login');
      }
    });
  }, [auth, navigate]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const content = event.target.content.value;
    const url = event.target.url.value;
    const courseId = event.target.course_id.value;

    if (!title || !content || !courseId || !url) {
      // TODO: display validation errors
      return false;
    }
    
    // create a post.
    axios.post('http://localhost:3001/api/v1/posts', {title, content, url, course_id: courseId}, {
      headers: {
        'x-access-token': auth.user.token
      }
    }).then(resp => {
      if (resp.status === 201) {
        navigate('/posts');
      } else if (resp.status === 401 || resp.status === 403) {
        navigate('/login');
      } else {
        // handle errors
      }
    }).catch(err => console.log(err));

    return false;
  }

  return (
    <>
      <h1>Novo Post</h1>

      <Card>
        <Card.Body>
          <Form method="post" onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Curso</Form.Label>
              <Form.Select name="course_id">
                {courses.map(function(course){
                  return <option key={course.id} value={course.id}>{course.name}</option>;
                })}
              </Form.Select>              
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control type="text" name="title" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL</Form.Label>
              <Form.Control type="url" name="url" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Conteúdo</Form.Label>
              <Form.Control as="textarea" rows={3} name="content" />
            </Form.Group>

            <Button variant="dark" type="submit">Cadastrar</Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default CreatePost;
