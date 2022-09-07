import ItemList from './../ItemList/ItemList'
import Productos from './../Productos/productos'
import {useState, useEffect} from 'react'
import './styles.css'

const ItemListContainer = ({greeting, subtitulo, totalCartCount, setTotalCartCount}) => {  
  const[items, setItems] = useState([])

  useEffect(() => {
    const getItems = new Promise((resolve,reject) => {
      setTimeout(() => {      
        resolve(Productos)
      }, 2000)
    })

    getItems.then((result) => {
      const rangoPrecios = (title) => {
        let min = 0
        let max = 0    
        let stock = 0
        result.forEach( (item) => { 
            if(item.title===title) {                
                if((item.price>min && min===0) || (min!==0 && item.price<min)){
                    min = item.price
                }
                if(item.price>max){
                    max = item.price
                }   
                stock = stock + item.stock
            }     
        })  
        return [min,max,stock]
      }

      const itemsByTitle = []
      result.forEach( (item) => {
        if(item.stock > 0) {
          let itemExists = 0
          itemsByTitle.forEach( itembt => {
            if(itembt.title===item.title){
              itemExists = 1
            }
          })

          if(itemExists===0){                      
            const [min, max, stock] = rangoPrecios(item.title)
            itemsByTitle.push({
              title: item.title,            
              price: min+' - '+max,
              stock: stock,
              pictureUrl: item.pictureUrl
            })
          }
        }
        
      })
      setItems(itemsByTitle)      
    })
  }, [])

  return (
    <>
      <h1 className="greeting">{greeting}</h1>
      <h4 className='subtitulo'>{subtitulo}</h4>
      <div className="nProductos">
        <ItemList items={items} />        
      </div>            
    </>    
  )
}

export default ItemListContainer