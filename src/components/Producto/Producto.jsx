import { useEffect } from 'react'
import {useState} from 'react'
import ItemCount from '../ItemCount/ItemCount'

const Producto = ({totalCartCount, setTotalCartCount, s}) => {

    const [cartCount, setCartCount]= useState(1)
    const [stock, setStock] = useState(parseInt(s))

    const addCart = (e) => {
    
      setStock(stock-cartCount)
      setTotalCartCount(parseInt(totalCartCount)+parseInt(cartCount))     
      
      if(stock>1){
        e.target.disabled = false
      } else {
        e.target.disabled = true
      }
    
    }

    useEffect( () => {
        if(stock<=0){
            setCartCount(0)
        } else {
            setCartCount(1)
        }
    },[stock])

    
  return (
    <div>
        <ItemCount stock={stock} initial={1} cartCount={cartCount} setCartCount={setCartCount} onAdd={addCart} />
        <div className="itemCarrito">Stock {stock} | Total Productos en Carrito: {totalCartCount}</div>
    </div>
  )
}

export default Producto