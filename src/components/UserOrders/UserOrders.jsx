import {db} from './../../utils/firebase'
import {collection,getDocs,query,where} from 'firebase/firestore'
import { useEffect, useState, useContext} from 'react'
import { CartContext } from '../../context/CartContext'
import {NavLink} from 'react-router-dom'
import loading from './Loading_icon.gif'
import './styles.css'

const UserOrders = () => {
    const [orders, setOrders]= useState([])
    const cartC = useContext(CartContext)       
    
    const showOrders = () => {
        const ordersList = orders.map( o => {
            return (
                <div className="orders" key={o.id}>
                    <div className='orderID'>
                        <span className='title'>Order ID</span>
                        <span className='value'>
                            <NavLink to={'/order/'+o.id} title={'Order ID-'+o.id}>{o.id}</NavLink>                                        
                        </span>
                    </div>
                    <div className='orderID'>
                        <span className='title'>Total</span>
                        <span className='value'>${o.total.toLocaleString()}</span>
                    </div>     
                    <div className='orderID'>
                        <span className='title'>Estado</span>
                        <span className='value'>{o.end === true ? "enviada" : "no enviada" }</span>
                    </div>
                    <div className='orderID'>
                        <span className='title'>Fecha</span>
                        <span className='value'>{o.dateEnd ? o.dateEnd : o.dateUpdate }</span>
                    </div>               
                </div>            
            )   
        })

        return (
            ordersList ? 
            (
                <div className="userOrders">
                    <h4>Ordenes realizadas</h4>
                    {ordersList}                
                </div>
            )
            :
            (
                <div className="userOrders">
                    <h4>No existen Ordenes realizadas</h4>
                    {ordersList}                
                </div>
            )

            
        )
    }

    const getOrders = () => {
        
        const q = query(
            collection(db,"orders"),
            where("id","==",JSON.parse(localStorage.getItem('user')).uid),
        )
        getDocs(q).then( r => {            
            
            r.docs.forEach(p => {  
                const auxOrder = orders.find( o => o.id === p.id)
                if(!auxOrder){
                    orders.push({
                        id:p.id,
                        buyer:p.data().buyer,
                        end:p.data().end,
                        total:p.data().total,
                        items:p.data().items,
                        dateUpdate:p.data().dateUpdate,
                        dateCreate:p.data().dateCreate,
                        dateEnd:p.data().dateEnd,
                    })
                }                                 
            }) 
            console.log(orders)
            setOrders(orders)            
        })
    }

    const load_img = () => {
        return ( <div className="bodyLoading"><div className="loading"><img src={loading} alt="loading" /></div></div> )
    }

    useEffect(() => {   
        cartC.setLoadBol(true)   
        getOrders()
        setTimeout(() => {   
            cartC.setLoadBol(false)    
        }, 2000)          
        return () => {}  
    },[])

  return (cartC.loadBol ? load_img() : showOrders()) 

}

export default UserOrders