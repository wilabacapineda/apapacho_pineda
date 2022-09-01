import {useState} from 'react'
import ItemCount from '../ItemCount/ItemCount'
import CartNumber from '../CartNumber/CartNumber'
import './styles.css'

const ItemListContainer = ({greeting, subtitulo}) => { 
  const [cartCount, setCartCount]= useState(0)
  const [totalCartCount, setTotalCartCount]= useState(0)
  const [stock, setStock] = useState(5)
  const addCart = (e) => {
    setCartCount(parseInt(e.target.value))
    setStock(parseInt(stock)-parseInt(e.target.value))
    setTotalCartCount(parseInt(totalCartCount)+parseInt(e.target.value))
    if(stock>1){
      e.target.disabled = false
    } else {
      e.target.disabled = true
    }
  }

  return (
    <>
      <h1 className="greeting">{greeting}</h1>
      <h4 className='subtitulo'>{subtitulo}</h4>
      <div className="nProductos"><ItemCount stock={stock} initial={1} onAdd={addCart} /></div>      
      <div className="itemCarrito">Stock {stock} | Añadiste <CartNumber number ={cartCount}/> al Carrito | Total Productos en Carrito: {totalCartCount}</div>
    </>
    
  )
}

export default ItemListContainer