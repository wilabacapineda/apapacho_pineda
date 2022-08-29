import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar titulo="APAPACHO" descripcion="Vestuario hecho a mano para apapachar a quienes amas"/>
        <ItemListContainer greeting={'Hola Mundo!'} />
      </header>
    </div>
  );
}

export default App;
