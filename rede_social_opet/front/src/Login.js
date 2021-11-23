import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router';
import { AuthContext } from './authContext';
import { Navigate } from 'react-router';

function Login() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (auth.user) {
    // Se o aluno já estiver "loggado", não faz sentido permitir
    // que o mesmo prossiga na tela de login.
    return <Navigate to="/posts" />;
  }

  const handleGoogleLogin = async googleData => {
    auth.signin(googleData, (err) => {
      if (err) {
        alert(err);
        return;
      }

      navigate('/posts');
    });
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-6 d-none d-lg-block bg-login-image">
                              <img src={process.env.PUBLIC_URL + '/mercurio.jpg'} alt="" width="100%" height="600" />
                            </div>
                            <div className="col-lg-6">
                                <div className="p-5 mt-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Bem-vindo novamente!</h1>
                                    </div>
                                    <form className="user">
                                      <div className="text-center">
                                    <GoogleLogin
                                      clientId={'900391367393-u4oqasgbj6ssbr5tmhlncipuniidr0vi.apps.googleusercontent.com'}
                                      buttonText="Entrar com a conta Google"
                                      onSuccess={handleGoogleLogin}
                                      onFailure={handleGoogleLogin}
                                      cookiePolicy={'single_host_origin'}
                                    />
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

      </div>
    </>
  );
}

export default Login;
