import ItemList from './../ItemList/ItemList'
import Productos from './../Productos/productos'
import {useState, useEffect} from 'react'
import './styles.css'

const ItemListContainer = ({greeting, subtitulo, totalCartCount, setTotalCartCount}) => {  
  const[productos, setProductos] = useState([])
  const getProductos = new Promise((resolve,reject) => {
    setTimeout(() => {      
      resolve(Productos)
    }, 2000)
  })

  useEffect(() => {
    getProductos.then((result) => {
      
      setProductos(result)      
    })
  }, [])

  return (
    <>
      <h1 className="greeting">{greeting}</h1>
      <h4 className='subtitulo'>{subtitulo}</h4>
      <div className="nProductos">
        <ItemList productos={productos} totalCartCount={totalCartCount} setTotalCartCount={setTotalCartCount} />        
      </div>            
    </>    
  )
}

export default ItemListContainer