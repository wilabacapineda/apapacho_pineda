import React, { useState } from 'react'
import Productos from './../../src/components/Productos/productos'
export const CartContext = React.createContext()


export const CartProvider = ({children}) => {
    const [totalCartCount, setTotalCartCount]= useState(0)
    const [carrito, setCarrito]= useState([])        
    const [loadBol, setLoadBol]= useState(true)        

    const getItems = () => {
        const productos = new Promise((resolve,reject) => {
            setTimeout(() => {   
              resolve(Productos)
            }, 2000)
        })
        return productos        
    } 
    const productos = getItems()

    const addItem = (item,quantity,tallaSelected,colorSelected) => {
        setTotalCartCount(parseInt(totalCartCount)+parseInt(quantity))             
        if(tallaSelected!=="" && colorSelected !==""){
            const auxitem = carrito
            for(let p in item){
                for(const j in item[p].productos){
                    if(item[p].productos[j].color === colorSelected && item[p].productos[j].talla === tallaSelected ) {                        
                        item[p].productos[j].stock = item[p].productos[j].stock-quantity                            
                        if(isInCart(item[p].id,item[p].productos[j].talla,item[p].productos[j].color)){
                            for(let c in auxitem){
                                if(auxitem[c].id === item[p].id && item[p].productos[j].color === auxitem[c].color && item[p].productos[j].talla === auxitem[c].talla){
                                    auxitem[c].stock = item[p].productos[j].stock
                                    auxitem[c].cartCount += quantity
                                } 
                            }
                        } else {
                            auxitem.push({
                                id:item[p].id,
                                categoria:item[p].categoria,
                                title:item[p].title,                                
                                description:item[p].description,
                                pictureUrl:item[p].pictureUrl,
                                cartCount:quantity,                            
                                color:item[p].productos[j].color,
                                talla:item[p].productos[j].talla,
                                stock:item[p].productos[j].stock,  
                                price:item[p].productos[j].price,  
                                ventas:item[p].productos[j].ventas
                            })
                        }
                    }                    
                } 
            }
            setCarrito(auxitem)       
        }
    }

    const setNumberOfItem = (item, value) => {        
        productos.then((results) => {
            const producto = results.find((p) => p.id===item.id)  
            //const itemToSetNumberOfItem = carrito.find((c) => c.id===itemId && c.talla === tallaSelected && c.color === colorSelected)                                                
            const auxStock = parseInt(item.stock) + parseInt(item.cartCount)
            if(parseInt(value)>=0 && parseInt(value)<=auxStock){
                const dif = parseInt(value) - parseInt(item.cartCount)
                if(dif!==0){
                                             
                    item.stock -= dif
                    if(item.stock>auxStock){
                        item.stock = auxStock
                    }
                    producto.stock-=dif
                    item.cartCount = parseInt(value)

                    for(const p in producto.productos){
                        if(producto.productos[p].talla === item.talla && producto.productos[p].color === item.color){
                            producto.productos[p].stock-=item.stock
                            //itemToSetNumberOfItem.cartCount > value ? producto.productos[p].stock-=(parseInt(itemToSetNumberOfItem.cartCount)-parseInt(value)) : producto.productos[p].stock+=(parseInt(value)-parseInt(itemToSetNumberOfItem.cartCount))           
                        }
                    }                                    
                    setTotalCartCount(totalCartCount+dif)
                    setCarrito(carrito)                     
                }
            }                                      
        })        
    }

    const isInCart = (id,tallaSelected,colorSelected) => {
        const resultado = carrito.find( (c) => c.id===id && c.talla === tallaSelected && c.color === colorSelected)
        return ( resultado ? true : false)        
    }

    const removeItem = (itemId,tallaSelected,colorSelected) => {
        setLoadBol(true)    
        setTimeout(() => {   
            productos.then((results) => {
                const producto = results.find((p) => p.id===itemId)            
                const itemToRemoveCart = carrito.find((c) => c.id===itemId && c.talla === tallaSelected && c.color === colorSelected)            
                producto.stock+=itemToRemoveCart.cartCount
                for(const p in producto.productos){
                    if(producto.productos[p].talla === itemToRemoveCart.talla && producto.productos[p].color === itemToRemoveCart.color){
                        producto.productos[p].stock+=itemToRemoveCart.cartCount
                    }
                }            
                
                const resultado = carrito.filter( (c) => {                
                    if(c.id===itemId && c.talla === tallaSelected && c.color === colorSelected){
                        return null
                    } else {
                        return c
                    }                
                } )
                setTotalCartCount(totalCartCount-itemToRemoveCart.cartCount)
                setCarrito(resultado)                               
            })
            setLoadBol(false)    
        }, 1000)   
    }

    const clear = () => {
        setLoadBol(true)    
        setTimeout(() => { 
            productos.then((results) => {
                carrito.forEach((c) => {
                    const producto = results.find((p) => p.id===c.id)            
                    producto.stock+=c.cartCount
                    for(const p in producto.productos){
                        if(producto.productos[p].talla === c.talla && producto.productos[p].color === c.color){
                            producto.productos[p].stock+=c.cartCount
                        }
                    }        
                })                         
            })        
            setTotalCartCount(0)
            setCarrito([]) 
            setLoadBol(false)    
        }, 1000)                                 
    }

    return(
        <CartContext.Provider value={{totalCartCount:totalCartCount,carrito:carrito, getItems, addItem, removeItem, clear,setNumberOfItem, loadBol:loadBol,setLoadBol}}>            
            {children}
        </CartContext.Provider>
    )
}