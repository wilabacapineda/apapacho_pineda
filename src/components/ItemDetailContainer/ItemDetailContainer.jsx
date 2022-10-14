import ItemDetail from "./../ItemDetail/ItemDetail"
import {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import {db} from './../../utils/firebase'
import {doc, getDoc} from 'firebase/firestore'

const ItemDetailContainer = () => {
    const[item, setItem] = useState([])
    const {id} = useParams()

    useEffect( () => {         
      const q = doc(db,"items",id)
      getDoc(q).then((result) => {
        if(result.exists()){
          const auxItem = {
            ...result.data(),
            id: result.id
          }
          setItem(auxItem)
        } 
      })
      
      return () => {}
    }, [id])

  return (
    <div className="productPage"><ItemDetail item={item} /></div>
  )
}

export default ItemDetailContainer