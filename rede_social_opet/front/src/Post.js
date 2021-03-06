import { useNavigate, useParams } from "react-router";
import {
  Card,
  Form,
  Button
} from 'react-bootstrap';
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";

function Post() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.postId;
  const [post, setPost] = useState({});
  const [courses, setCourses] = useState([]);

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

    axios.get(`http://localhost:3001/api/v1/posts/${postId}`, {
      headers: {
        'x-access-token': auth.user.token
      }
    }).then(resp => {
      setPost(resp.data.post)
    }).catch(err => {
      if ([401, 403].indexOf(err.response.status) !== -1) {
        navigate('/login');
      }
    });
  }, [postId, auth, navigate]);

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
    
    axios.put(`http://localhost:3001/api/v1/posts/${postId}`, {title, content, url, course_id: courseId}, {
      headers: {
        'x-access-token': auth.user.token
      }
    }).then(resp => {
      if (resp.status === 200) {
        navigate('/posts');
      } else if (resp.status === 401 || resp.status === 403) {
        navigate('/login');
      } else {
        // handle errors
      }
    }).catch(err => console.log(err));

    return false;
  };

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
        <h1 className="h3 mb-0 text-gray-800">Editar Post</h1>
      </div>

      <Card>
        <Card.Body>
          <Form method="post" onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Curso</Form.Label>
              <Form.Select name="course_id" value={post.courseId} onChange={e => setPost({...post, ...{ courseId: e.target.value }})}>
                {courses.map(function(course){
                  return <option key={course.id} value={course.id}>{course.name}</option>;
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>T??tulo</Form.Label>
              <Form.Control type="text" name="title" value={post.title || ''} onChange={e => setPost({...post, ...{ title: e.target.value }})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL</Form.Label>
              <Form.Control type="url" name="url" value={post.url || ''} onChange={e => setPost({...post, ...{ url: e.target.value }})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Conte??do</Form.Label>
              <Form.Control as="textarea" rows={3} name="content" value={post.content || ''} onChange={e => setPost({...post, ...{ content: e.target.value }})} />
            </Form.Group>

            <Button variant="dark" type="submit">Editar</Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default Post;
