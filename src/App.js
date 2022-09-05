import './App.css';
import {useState} from 'react'
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';


function App() {
  const [totalCartCount, setTotalCartCount]= useState(0)
    
  return (
    <div className="App">
      <header className="App-header">
        <NavBar titulo={'APAPACHO'} totalCartCount={totalCartCount} setTotalCartCount={setTotalCartCount} descripcion={'Vestuario hecho a mano para apapachar a quienes amas'}/>
        <ItemListContainer totalCartCount={totalCartCount} setTotalCartCount={setTotalCartCount} greeting={'Hola Visitante! - Bienvenida a APAPACHO'} subtitulo={'En nuestra tienda encontrarás vestuario hecho a mano para apapachar a quienes amas '} />
      </header>
    </div>
  );
}

export default App;
