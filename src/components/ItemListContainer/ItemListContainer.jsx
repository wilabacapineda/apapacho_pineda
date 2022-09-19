import ItemList from './../ItemList/ItemList'
import Productos from './../Productos/productos'
import {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import './styles.css'

const ItemListContainer = () => {  
  const[items, setItems] = useState([])
  const {id} = useParams()
  

  useEffect(() => {
    setItems([])
    const getItems = new Promise((resolve,reject) => {
      setTimeout(() => {   
        resolve(Productos)
      }, 2000)
    })

    getItems.then((result) => {
      const rangoPrecios = (idx) => {
        let min = 0
        let max = 0    
        let stock = 0
        const rg = result.find( (p) => p.id === idx)
        for(let i in rg.productos){
          if((rg.productos[i].price>min && min===0) || (min!==0 && rg.productos[i].price<min)){
            min = rg.productos[i].price
          }
          if(rg.productos[i].price>max){
            max = rg.productos[i].price
          }   
          stock = stock + rg.productos[i].stock
        }
        return [min,max,stock]
      }

      const itemsByX = result.filter( (p) => {        
        if(id===undefined){ 
          const [min, max, stock] = rangoPrecios(p.id)         
          p.price = min+' - '+max
          p.stock = stock
          return p          
        } else if(p.categoria===id){            
          const [min, max, stock] = rangoPrecios(p.id)
          p.price = min+' - '+max
          p.stock = stock
          return p
        } else {
          return null
        }
      })
      setItems(itemsByX) 
    })
  }, [id])

  return (
    <>      
      <div className="nProductos">
        <ItemList items={items} />        
      </div>            
    </>    
  )
}

export default ItemListContainer