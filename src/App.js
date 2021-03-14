import './App.css';
import Calendar from './components/Calendar';
import Navb from './components/Navb';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <div className="App">
      <Navb />
      <h1>Ver citas</h1>
      <p className="desc">Selecciona los días marcados en azul para ver el horario de la cita</p>
      <div className="container">
        <Calendar />
        <div className="schedule-info">
          <div className="day-info"><div className="pending day-container"></div>Próximas citas</div>
          <div className="day-info"><div className="passed day-container"></div>Citas pasadas</div>
          <Button variant="primary">Regresar al menú</Button>
          <Button variant="primary">Añadir cita</Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
