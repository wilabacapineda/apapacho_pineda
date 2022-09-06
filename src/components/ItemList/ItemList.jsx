import Item from '../Item/Item'
import loading from './Loading_icon.gif'

const ItemList = ({productos, totalCartCount,setTotalCartCount}) => {   

    if(Object.keys(productos).length==0){
        return (
            <>
                <img src={loading} />
            </>
        )
    } else {
        return (
            <>
                {
                    productos.map((p) => {
                        if(p.stock>0){
                            return(                    
                                <Item key={p.id} id={'product_'+p.id} title={p.title} description={p.description} price={p.price} pictureUrl={p.pictureUrl} s={p.stock} totalCartCount={totalCartCount} setTotalCartCount={setTotalCartCount} />                    
                            )   
                        }
                                     
                    })    
                }
                
            </>
            
          )
    }   
  
}

export default ItemList