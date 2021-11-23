import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import {
  Button,
  Row,
  Col,
  Card,
  FormControl,
  InputGroup
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './authContext';

function Posts() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/posts', {
      headers: {
        'x-access-token': auth.user.token
      }
    }).then(resp => {
      setPosts(resp.data.posts);
    }).catch(err => {
      if ([401, 403].indexOf(err.response.status) !== -1) {
        navigate('/login');
      }
    });
  }, [auth, navigate]);

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
        <h1 className="h3 mb-0 text-gray-800">Posts</h1>
      </div>

      <Row className="mt-4">
        <Col>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Pesquise um Post..."
              aria-label="Pesquise um Post..."
              aria-describedby="basic-addon2"
            />
            <Button variant="outline-secondary" id="button-addon2">Pesquisar</Button>
          </InputGroup>
        </Col>
        <Col>
          <Link to="/posts/new">
            <Button variant="dark" className="float-right">Criar Post</Button>
          </Link>
        </Col>
      </Row>

      {posts.map(post => {
        return (
          <Row key={post.id} className="mt-4">
            <Card>
              <Card.Body>
                <Link to={`/posts/${post.id}`} key={post.id}>
                  {post.title}
                </Link>
              </Card.Body>
            </Card>
          </Row>
        );
      })}
    </>
  )
}

export default Posts;
