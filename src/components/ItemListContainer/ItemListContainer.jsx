import ItemList from './../ItemList/ItemList'
import {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import './styles.css'
import {db} from './../../utils/firebase'
import {collection, getDocs,query,where} from 'firebase/firestore'

const ItemListContainer = () => {  
  const[items, setItems] = useState([])
  const {id} = useParams() 

  useEffect(() => {
    setItems([])   
    
    const getItems = async () => {
      //creamos referencia
      if(id===undefined) {
        const q = collection(db,"items")
        const response = await getDocs(q)            
        const productos = response.docs.map(doc => {              
            const newCat = {
                ... doc.data(),
                id: doc.id,
            }
            return newCat
        })  
        return productos
      } else {
        const q = query(collection(db,"items"),where("categoria","==",id))
        const response = await getDocs(q)            
        const productos = response.docs.map(doc => {              
            const newCat = {
                ... doc.data(),
                id: doc.id,
            }
            return newCat
        })  
        return productos
      }              
                           
    }
    getItems().then((result) => {      
      setItems(result) 
    })   
    
    return () => {}
  }, [id])

  return (
    <>      
      <div className="nProductos">
        { id===undefined ? (<h2>Productos Tienda</h2>) : (<h2 className='capitalizar'>Productos Categoria: {id.replace("-"," ")}</h2>) }        
        <ItemList items={items} />        
      </div>            
    </>    
  )
}

export default ItemListContainer  