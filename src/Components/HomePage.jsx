import reactLogo from '../assets/react.svg'
import "../styles/global.css";

const HomePage = () => {
    return (
      <div className='home-page'>
        <img src={reactLogo} className="logo react" alt="React logo" />

        <h1>Bienvenido a Administrador de Tareas</h1>
        <br />
        <p>Este proyecto fue desarrollado como parte del curso Front End - React.</p>
      </div>
    );
  };
  
  export default HomePage;