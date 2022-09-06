import { useEffect } from 'react'
import {useState} from 'react'
import ItemCount from '../ItemCount/ItemCount'
import './styles.css'

const Item = ({id,title,description,price, pictureUrl,s, totalCartCount, setTotalCartCount}) => {

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
    <div className="producto">
        <div className='productoItem'>
          <div className='productoImage'>
            <img src={require('./'+pictureUrl)} alt={description} />
          </div>        
          <div className='productoInfo'>
            <h2>{title}</h2>
            <div className="productoInfoDesc">{description}</div>
            <div className="productoInfoPrice">
              <span>${price}</span>
              <div className='productoShop'>
                <ItemCount key={id} stock={stock} initial={1} cartCount={cartCount} setCartCount={setCartCount} onAdd={addCart} />
                <div className="itemCarrito"> Stock {stock} | Total Productos en Carrito: {totalCartCount} </div>
              </div>
            </div>
          </div>
        </div>
                        
    </div>
  )
}

export default Item