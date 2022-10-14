import './App.css'
import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import Bienvenida from './components/Bienvenida/Bienvenida'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import Cart from './components/Cart/Cart'
import { CartProvider } from './context/CartContext'
import Users from './components/Users/Users'
import Order from './components/Order/Order'

function App() {

  const inicio = () => {
    return (
      <>
        <Bienvenida greeting={'Hola Visitante! - Bienvenida a APAPACHO'} subtitulo={'En nuestra tienda encontrarás vestuario hecho a mano para apapachar a quienes amas '} />
        <ItemListContainer />
      </>
    )
  }
  
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <NavBar titulo={'APAPACHO'} descripcion={'Vestuario hecho a mano para apapachar a quienes amas'}/>
            <Routes>
              <Route path='/' element={inicio()} />                    
              <Route path='/tienda' element={<ItemListContainer />} /> 
              <Route path='/cart' element={<Cart/>} /> 
              <Route path='/tienda/categoria/:id' element={<ItemListContainer />} /> 
              <Route path='/tienda/item/:id' element={<ItemDetailContainer />} />                                                  
              <Route path='/users/' element={<Users />} />
              <Route path='/order/:id' element={<Order />} /> 
            </Routes>
          </header>
        </div>
      </BrowserRouter>
    </CartProvider>    
  )
}

export default App;
