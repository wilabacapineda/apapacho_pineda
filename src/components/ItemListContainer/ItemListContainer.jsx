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
        result.forEach( (item) => {             
            if(item.id===idx) {                
              for(let i in item.productos){
                if((item.productos[i].price>min && min===0) || (min!==0 && item.productos[i].price<min)){
                  min = item.productos[i].price
                }
                if(item.productos[i].price>max){
                  max = item.productos[i].price
                }   
                stock = stock + item.productos[i].stock
              }
            }     
        })  
        return [min,max,stock]
      }

      const itemsByX = []

      if(id===undefined){
        result.forEach( (item) => {
          const [min, max, stock] = rangoPrecios(item.id)                   
          itemsByX.push({
            title: item.title,    
            id: item.id,         
            price: min+' - '+max,
            stock: stock,
            pictureUrl: item.pictureUrl
          })                     
        })    
      } else {
        result.filter( (item) => {
          if(item.categoria===id){
            const [min, max, stock] = rangoPrecios(item.id)
            itemsByX.push({
              title: item.title,    
              id: item.id,         
              price: min+' - '+max,
              stock: stock,
              pictureUrl: item.pictureUrl
            })                
          }
        } )          

      }          
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