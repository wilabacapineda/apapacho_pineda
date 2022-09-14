import './App.css';
import {useState} from 'react'
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Bienvenida from './components/Bienvenida/Bienvenida';
import {BrowserRouter, Routes,Router, Route} from 'react-router-dom'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Carrito from './components/Carrito/Carrito';

function App() {
  const [totalCartCount, setTotalCartCount]= useState(0)
  const [carrito, setCarrito]= useState([])

  const inicio = () => {
    return (
      <>
        <Bienvenida greeting={'Hola Visitante! - Bienvenida a APAPACHO'} subtitulo={'En nuestra tienda encontrarás vestuario hecho a mano para apapachar a quienes amas '} />
        <ItemListContainer />
      </>
    )
  }
  
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <NavBar titulo={'APAPACHO'} totalCartCount={totalCartCount} setTotalCartCount={setTotalCartCount} descripcion={'Vestuario hecho a mano para apapachar a quienes amas'}/>
          <Routes>
            <Route path='/' element={inicio()} />                    
            <Route path='/tienda' element={<ItemListContainer />} /> 
            <Route path='/carrito' element={<Carrito carrito={carrito}  totalCartCount={totalCartCount}/>} /> 
            <Route path='/tienda/categoria/:id' element={<ItemListContainer />} /> 
            <Route path='/tienda/item/:id' element={<ItemDetailContainer totalCartCount={totalCartCount} setTotalCartCount={setTotalCartCount} carrito={carrito} setCarrito={setCarrito} />} />                    
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
