import {db} from './../../utils/firebase'
import {doc,addDoc,updateDoc,collection,getDocs,getDoc,query,where} from 'firebase/firestore'
import { useEffect, useState, useContext } from 'react'
import Item from '../Item/Item'
import './styles.css'

const UserOrders = () => {
    const [orders, setOrders]= useState([])

    useEffect(() => {
        getOrders()  
        return () => {}  
    },[])

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
            setOrders(orders)            
        })
    }
    
    const showOrders = () => {

        const ordersList = orders.map( o => {
            return (
                <div className="orders" key={o.id}>
                    <div className='orderID'>
                        <span className='title'>Order ID</span>
                        <span className='value'>{o.id}</span>
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
            <div className="userOrders">
                <h4>Ordenes realizadas</h4>
                {ordersList}                
            </div>
        )
    }

    const noOrders = () => {
        return (
            <div className="userOrders">
                No hay Ordenes
            </div>
        )
    }

  return ( orders.length > 1 ? showOrders() : noOrders() )

}

export default UserOrders