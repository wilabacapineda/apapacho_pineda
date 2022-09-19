import ItemDetail from "./../ItemDetail/ItemDetail"
import {useState, useEffect, useContext} from 'react'
import { useParams } from "react-router-dom"
import { CartContext } from "./../../context/CartContext"

const ItemDetailContainer = () => {
    const[item, setItem] = useState([])
    const {id} = useParams()
    const cartC = useContext(CartContext)

    useEffect( () => {          
      const getItems = cartC.getItems()
      getItems.then((result) => {
          const itemAux = result.filter( (i) => parseInt(i.id) === parseInt(id))                
          setItem(itemAux)      
      })
    }, [id])

  return (
    <div className="productPage"><ItemDetail item={item} /></div>
  )
}

export default ItemDetailContainer