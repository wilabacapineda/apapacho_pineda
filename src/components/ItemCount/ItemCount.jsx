import {useState, useEffect} from 'react'

const ItemCount = ({stock, initial, onAdd}) => {
    const [itemCount, setItemCount]= useState(initial)

    const addCartPlus = () => {
        if(stock>0){
            setItemCount((parseInt(itemCount)+1) > stock ? parseInt(itemCount) : parseInt(itemCount) + 1 )
            document.getElementById('addCart').disable = false
        } else {
            document.getElementById('addCart').disable = true
        }
    }
    const addCartMinus = () => {
        if(stock > 0){
            setItemCount((parseInt(itemCount)-1) > 0 ? parseInt(itemCount)-1 : parseInt(itemCount))
            document.getElementById('addCart').disable = false
        } else {
            document.getElementById('addCart').disable = true
        }
    }
    
    useEffect(() => {
        console.log(stock)
    },[stock])

  return (
    <>
    <div>
        <button onClick={addCartPlus} className='botonLc' id='addCartPlus'>+</button> N° Productos {itemCount}<button onClick={addCartMinus} className='botonLc' id='addCartMinus'>-</button>
    </div>    
    <div>
        <button onClick={onAdd} className='botonLc' id='addCart' value={itemCount}>Agregar al Carrito</button>
    </div>
    </>    
  )
}

export default ItemCount