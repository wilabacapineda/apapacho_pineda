import { useEffect } from 'react'
import {useState} from 'react'
import ItemCount from '../ItemCount/ItemCount'
import loading from './Loading_icon.gif'
import './styles.css'

const ItemDetail = ({item, totalCartCount, setTotalCartCount}) => {
    const [cartCount, setCartCount]= useState(1)
    const [stock, setStock] = useState(item.stock)

    useEffect( () => {
        setStock(item.stock)        
    },[item])

    useEffect( () => {
        if(stock<=0){
            setCartCount(0)
        } else {
            setCartCount(1)
        }
    },[stock])

    const addCart = (e) => {
    
        setStock(stock-cartCount)
        setTotalCartCount(parseInt(totalCartCount)+parseInt(cartCount))     

        if(stock>1){
            e.target.disabled = false
        } else {
            e.target.disabled = true
        }
    
    }

    const load_img = () => {
        return ( <img src={loading} alt="loading" /> )
    }
    
    const load_prod = () => {
        return (            
            <div className="producto" id={item.id}>
                <h1>Vista de Producto</h1>
                <div className='productoItem'>
                    <div className='productoImage'>
                        <img src={require('./'+item.pictureUrl)} alt={item.title} />
                    </div>                            
                    <div className='productoInfo'>
                        <h2>{item.title}</h2>
                        <div className="productoInfoDesc">{item.description}</div>
                        <div className="productoInfoPrice">
                            <span>${item.price}</span>              
                        </div>
                    </div>                    
                </div>    
                <div className='productoShop'>
                    <ItemCount key={item.id} stock={stock} initial={1} cartCount={cartCount} setCartCount={setCartCount} onAdd={addCart} />
                    <div className="itemCarrito"> Stock {stock} | Total Productos en Carrito: {totalCartCount} </div>
                </div>                    
            </div>            
        )
    }

    const resultado = Object.keys(item).length===0 ? load_img() : load_prod() 

        return (
            <>
                {resultado}
            </>
        )  

  
}

export default ItemDetail