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
        for(let j in result){
          const [min, max, stock] = rangoPrecios(result[j].id)
          itemsByX.push({
            title: result[j].title,    
            id: result[j].id,         
            price: min+' - '+max,
            stock: stock,
            pictureUrl: result[j].pictureUrl
          }) 
        }   
      } else {
        for(let j in result){
          if(result[j].categoria===id){
            const [min, max, stock] = rangoPrecios(result[j].id)
            itemsByX.push({
              title: result[j].title,    
              id: result[j].id,         
              price: min+' - '+max,
              stock: stock,
              pictureUrl: result[j].pictureUrl
            })                
          }
        }
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