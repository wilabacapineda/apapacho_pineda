import ItemDetail from "./../ItemDetail/ItemDetail"
import Productos from './../Productos/productos'
import {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"

const ItemDetailContainer = () => {
    const[item, setItem] = useState([])
    const {id} = useParams()

    useEffect( () => {
        const getItem = new Promise((resolve,reject) => {
          setTimeout(() => {      
            resolve(Productos)
          }, 2000)
        })
    
        getItem.then((result) => {
          const itemAux = result.filter( (i) => parseInt(i.id) === parseInt(id))      
          setItem(itemAux)      
        })

    }, [id])

  return (
    <div className="productPage"><ItemDetail item={item} /></div>
  )
}

export default ItemDetailContainer