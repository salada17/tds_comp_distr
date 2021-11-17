import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <h1 className="text-center">Rede Social Opet</h1>

      <div className="row mt-4 text-center">
        <div className="col-6">
          <h2>É novo?</h2>
          <Link to="/signup">
            <button className="btn btn-info">Cadastrar</button>
          </Link>
        </div>
        <div className="col-6">
          <h2>Já tem conta?</h2>
          <Link to="/login">
            <button className="btn btn-info">Entrar</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
