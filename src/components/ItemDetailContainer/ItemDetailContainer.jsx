import ItemDetail from "./../ItemDetail/ItemDetail"
import Productos from './../Productos/productos'
import {useState, useEffect} from 'react'

const ItemDetailContainer = ({totalCartCount, setTotalCartCount}) => {
    const[item, setItem] = useState([])

    useEffect(() => {
        const getItem = new Promise((resolve,reject) => {
          setTimeout(() => {      
            resolve(Productos)
          }, 2000)
        })
    
        getItem.then((result) => {
          //const title = 'Poleron Amaranta'          
          const id = 11
          const itemAux = []
          result.forEach( (i) => {
            if(i.stock > 0) {
                /*
                    if(title===item.title){                      
                        itemsByTitle.push(item)
                    }
                */
                if(id===i.id){                      
                    itemAux.push(i)
                }
            }            
          })
          setItem(itemAux[0])      
        })
      }, [])

  return (
    <div className="productPage"><ItemDetail item={item} totalCartCount={totalCartCount} setTotalCartCount={setTotalCartCount} /></div>
  )
}

export default ItemDetailContainer