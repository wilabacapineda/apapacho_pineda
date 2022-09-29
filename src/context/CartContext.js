import React, { useState } from 'react'
import {db} from './../../src/utils/firebase'
import {collection, getDocs, query,where} from 'firebase/firestore'

export const CartContext = React.createContext()


export const CartProvider = ({children}) => {
    const [totalCartCount, setTotalCartCount]= useState(0)
    const [carrito, setCarrito]= useState([])        
    const [loadBol, setLoadBol]= useState(true)     
    const [idOrder, setIdOrder] = useState("")
    const [userInfo, setUserInfo]=useState("")

    const addItem = (item,quantity,tallaSelected,colorSelected) => {
        setTotalCartCount(parseInt(totalCartCount)+parseInt(quantity))    
        if(tallaSelected!=="" && colorSelected !==""){            
            if(Object.keys(item).length!==0){
                const q = query(
                    collection(db,"items",item.id,'productos'),
                    where("color","==",colorSelected),
                    where("talla","==",tallaSelected)
                )
                getDocs(q).then( resp => {
                    const auxitem = carrito
                    resp.docs.forEach( p => {
                        if(isInCart(item.id,p.data().talla,p.data().color)){                            
                            for(let c in auxitem){
                                if(auxitem[c].id === item.id && p.data().color === auxitem[c].color && p.data().talla === auxitem[c].talla){
                                    auxitem[c].cartCount += quantity
                                } 
                            }
                        } else {
                            auxitem.push({
                                id:item.id,
                                categoria:item.categoria,
                                title:item.title,                                
                                pictureUrl:item.pictureUrl,
                                cartCount:quantity,                            
                                color:p.data().color,
                                talla:p.data().talla,
                                price:p.data().price,  
                            })
                        }
                    })
                    setCarrito(auxitem)
                })                
            }            
        }
    }

    //falta actualizar setNumberOfItem
    const setNumberOfItem = (item, value) => {   
        const q = query(
            collection(db,"items",item.id,'productos'),
            where("color","==",item.color),
            where("talla","==",item.talla)
        )
        getDocs(q).then( resp => {
            resp.docs.forEach( p => {
                if(parseInt(value)>=0 && parseInt(value)<=p.data().stock){
                    const dif = parseInt(value) - parseInt(item.cartCount)
                    if(dif!==0){
                        item.stock -= dif
                        if(item.stock>p.data().stock){
                            item.stock = p.data().stock
                        }
                        item.cartCount = parseInt(value)
                        setTotalCartCount(totalCartCount+dif)
                        setCarrito(carrito)       
                    }
                }
            })
        })       
    }

    const isInCart = (id,tallaSelected,colorSelected) => {
        const resultado = carrito.find( (c) => c.id===id && c.talla === tallaSelected && c.color === colorSelected)
        return ( resultado ? true : false)        
    }

    const removeItem = (item) => {
        setLoadBol(true)           
        setTimeout(() => {   
            setTotalCartCount(totalCartCount-item.cartCount)
            const resultado = carrito.filter( (c) => {                
                if(c.id===item.id && c.talla === item.talla && c.color === item.color){
                    return null
                } else {
                    return c
                }                
            } )
            setCarrito(resultado) 
            setLoadBol(false)    
        }, 1000)   
    }

    const clear = () => {
        setLoadBol(true)    
        setTimeout(() => {      
            setTotalCartCount(0)
            setCarrito([]) 
            setLoadBol(false)    
        }, 1000)                                 
    }

    return(
        <CartContext.Provider value={{totalCartCount:totalCartCount,carrito:carrito, addItem, removeItem, clear,setNumberOfItem, loadBol:loadBol,setLoadBol,isInCart,idOrder:idOrder,setIdOrder,userInfo:userInfo,setUserInfo}}>            
            {children}
        </CartContext.Provider>
    )
}