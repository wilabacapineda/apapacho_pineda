import {useState, useEffect} from 'react'

const ItemCount = ({stock, initial, onAdd}) => {
    const [itemCount, setItemCount]= useState(initial)

    const addCartPlus = () => {
        if(stock>0){
            setItemCount(parseInt(itemCount)+1 > stock ? parseInt(itemCount) : parseInt(itemCount) + 1)
        } 
    }
    const addCartMinus = () => {
        if(stock > 0){
            setItemCount(parseInt(itemCount)-1 > 0 ? parseInt(itemCount)-1 : parseInt(itemCount))
        } 
    }
    /*
    useEffect(() => {
        setCartCount(itemCount)
    },[itemCount])
    */

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
        <button disabled={stock===0} onClick={addCartPlus} className='botonLc' id='addCartPlus'>+</button> N° Productos {itemCount} <button disabled={stock===0} onClick={addCartMinus} className='botonLc' id='addCartMinus'>-</button>
    </div>    
    <div>
        <button onClick={() => onAdd(itemCount)} className='botonLc' id='addCart'>Agregar al Carrito</button>
    </div>
    </>    
  )
}

export default ItemCount