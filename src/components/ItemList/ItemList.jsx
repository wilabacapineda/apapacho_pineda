import Item from '../Item/Item'
import loading from './Loading_icon.gif'

const ItemList = ({items}) => {   

    const load_img = () => {
        return ( <img src={loading} alt="loading" /> )
    }
    
    const load_prod = () => {
        const resultado = items.map(
            (p) => p.stock>0 ? (<Item key={p.title} id={'product_'+p.title} title={p.title} price={p.price} pictureUrl={p.pictureUrl} s={p.stock} />) : ""  
        )
        return resultado 
    }

    const resultado = Object.keys(items).length===0 ? load_img() : load_prod() 

        return (
            <>
                {resultado}
            </>
        )    
}

export default ItemList