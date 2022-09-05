import {useState, useEffect} from 'react'

const ItemCount = ({stock, initial, cartCount,setCartCount, onAdd}) => {
    const [itemCount, setItemCount]= useState(initial)

    const addCartPlus = () => {
        if(stock>0){
            const aux = parseInt(itemCount)+1 > stock ? parseInt(itemCount) : parseInt(itemCount) + 1
            setItemCount(aux)            
            document.getElementById('addCart').disable = false
        } else {
            document.getElementById('addCart').disable = true
        }
    }
    const addCartMinus = () => {
        if(stock > 0){
            const aux = parseInt(itemCount)-1 > 0 ? parseInt(itemCount)-1 : parseInt(itemCount)
            setItemCount(aux)
            document.getElementById('addCart').disable = false
        } else {
            document.getElementById('addCart').disable = true
        }
    }
    
    useEffect(() => {
        setCartCount(itemCount)
    },[itemCount])

    useEffect(() => {
        if(stock<=0){
            setItemCount(0)
        } else {
            setItemCount(1)
        }
    },[stock])

  return (
    <>
    <div>
        <button onClick={addCartPlus} className='botonLc' id='addCartPlus'>+</button> N° Productos {cartCount}<button onClick={addCartMinus} className='botonLc' id='addCartMinus'>-</button>
    </div>    
    <div>
        <button onClick={onAdd} className='botonLc' id='addCart' value={itemCount}>Agregar al Carrito</button>
    </div>
    </>    
  )
}

export default ItemCount