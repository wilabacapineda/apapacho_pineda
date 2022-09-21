import Item from '../Item/Item'
import loading from './Loading_icon.gif'
import {Link} from 'react-router-dom'

const ItemList = ({items}) => {   

    const load_img = () => {
        return ( <div className="bodyLoading"><div className="loading"><img src={loading} alt="loading" /></div></div> )
    }
    
    const load_prod = () => {
        const resultado = items.map(
            (p) => p.stock>=0 && (<Link to={'/tienda/item/'+p.id} key={'itemLink'+p.id}><Item key={'item_'+p.id} id={'product_'+p.id} title={p.title} price={p.price} pictureUrl={p.pictureUrl} s={p.stock} /></Link>)  
        )
        return resultado 
    }    

    return (
        <>
            {Object.keys(items).length===0 ? load_img() : load_prod() }
        </>
    )    
}

export default ItemList