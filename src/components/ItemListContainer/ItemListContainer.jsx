import ItemList from './../ItemList/ItemList'
import Productos from './../Productos/productos'
import {useState, useEffect} from 'react'
import './styles.css'

const ItemListContainer = ({totalCartCount, setTotalCartCount}) => {  
  const[items, setItems] = useState([])

  useEffect(() => {
    const getItems = new Promise((resolve,reject) => {
      setTimeout(() => {      
        resolve(Productos)
      }, 2000)
    })

    getItems.then((result) => {
      const rangoPrecios = (id) => {
        let min = 0
        let max = 0    
        let stock = 0
        result.forEach( (item) => {             
            if(item.id===id) {                
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

      const itemsByTitle = []
      result.forEach( (item) => {
        const [min, max, stock] = rangoPrecios(item.id)
       
        if(stock > 0) {
          let itemExists = 0   
          itemsByTitle.push({
            title: item.title,    
            id: item.id,         
            price: min+' - '+max,
            stock: stock,
            pictureUrl: item.pictureUrl
          })      
        }     
      })
      setItems(itemsByTitle)      
    })
  }, [])

  return (
    <>      
      <div className="nProductos">
        <ItemList items={items} />        
      </div>            
    </>    
  )
}

export default ItemListContainer