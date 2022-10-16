import {db} from './../../utils/firebase'
import {doc,getDoc} from 'firebase/firestore'
import {Link} from 'react-router-dom'
import {useState, useEffect, useContext} from 'react'
import { CartContext } from './../../context/CartContext'
import { useParams } from "react-router-dom"
import loading from './Loading_icon.gif'
import './styles.css'

const Order = () => {
    const[orderX, setOrderX] = useState({})
    const cartC = useContext(CartContext) 
    const {id} = useParams()
    

    const load_img = () => {
        return ( <div className="bodyLoading"><div className="loading"><img src={loading} alt="loading" /></div></div> )
    }

    const showOrder = () => {
        if(orderX.id){
            let date = ""
            if(orderX.dateEnd){
                date=orderX.dateEnd
            } else if ( orderX.dateUpdate){
                date=orderX.dateUpdate
            } else if (orderX.dateCreate){
                date=orderX.dateCreate
            }
            const itemes = orderX.items.map( c => {
                return (                     
                    <div key={'product_'+c.id+'_'+c.color+'_'+c.talla} id={'product_'+c.id} className='productCart'>
                        <div className='productCartImg'>
                            <Link to={'/tienda/item/'+c.id} key={'itemLinkImg'+c.id}><img src={c.pictureUrl} alt={c.title} /></Link>                                
                        </div>
                        <div className='productCartInfo'>
                            <h4 className='productCartName'><Link to={'/tienda/item/'+c.id} key={'itemLinkTitle'+c.id}>{c.title} {c.talla}</Link></h4>  
                            <div className='productCartDetail'>Talla: {c.talla} | Color: {c.color}</div>  
                            <div className='productCartDetailTitle'>
                                <div className='productCartDetailTValue'><span>Valor</span><span>${c.price.toLocaleString()}</span></div>
                                <div className='productCartDetailTValue'><span>Cant.</span><span>{c.cartCount}</span></div>
                                <div className='productCartDetailTValue'><span>TOTAL</span><span>${(c.cartCount * c.price).toLocaleString()}</span></div>                               
                            </div>                                               
                        </div>                                               
                    </div>                                                            
                )
                
            })
            
            return(
                <div className='orden'>                    
                    <h3>ORDEN N° {orderX.id}</h3>
                    <div className='ordenBuyer' key={'ordenBuyer_1'}>
                        <div>
                            <span className='title'>
                                Nombre
                            </span>
                            <span className='value'>
                                {`${orderX.buyer.name} ${orderX.buyer.lastname}`}
                            </span>
                        </div>
                        <div>
                            <span className='title'>
                                Correo
                            </span>
                            <span className='value'>
                                {orderX.buyer.email}
                            </span>
                        </div>
                        <div>
                            <span className='title'>
                                Telefono
                            </span>
                            <span className='value'>
                                {orderX.buyer.phone}
                            </span>
                        </div>
                    </div>
                    <div className='ordenBuyer' key={'ordenBuyer_2'}>
                        <div>
                            <span className='title'>
                                Fecha
                            </span>
                            <span className='value'>
                                {date}
                            </span>
                        </div>
                        <div>
                            <span className='title'>
                                Total
                            </span>
                            <span className='value'>
                                {orderX.total}
                            </span>
                        </div>
                        <div>
                            <span className='title'>
                                Estado
                            </span>
                            <span className='value'>
                                {orderX.end ? "enviada":"no enviada "}
                            </span>
                        </div>
                    </div>
                    <div className='orderItems' key={'ordenBuyer_3'}>
                        <h4>Lista de Productos</h4>
                        {itemes}
                    </div>
                </div>
            )
        } else {
            return(
                <div className='orden'>
                    <h2>ORDEN NO EXISTE</h2>
                </div>
            )
        }
    }

    useEffect(() => {
        cartC.setLoadBol(true)        
        if(id!==undefined) {
            const orderDoc = doc(db,'orders',id)
            getDoc(orderDoc).then(p => {
                if(p.data()){
                    const aux = {
                        id:id,
                        buyer:p.data().buyer,
                        end:p.data().end,
                        total:p.data().total,
                        items:p.data().items,
                        dateUpdate:p.data().dateUpdate,
                        dateCreate:p.data().dateCreate,
                        dateEnd:p.data().dateEnd,
                    }
                    setOrderX(aux)
                }                
            })
        } 
        setTimeout(() => {   
            cartC.setLoadBol(false)    
        }, 2000)
        return () => {}
    }, [id])
    
  return (cartC.loadBol ? load_img() : showOrder()) 

}

export default Order