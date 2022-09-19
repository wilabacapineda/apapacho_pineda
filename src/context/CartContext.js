import React, { useState } from 'react'
export const CartContext = React.createContext()

export const CartProvider = ({children}) => {
    const [totalCartCount, setTotalCartCount]= useState(0)
    const [carrito, setCarrito]= useState([])    
    const addItem = (item,quantity,tallaSelected,colorSelected) => {

        setTotalCartCount(parseInt(totalCartCount)+parseInt(quantity))             
        if(tallaSelected!=="" && colorSelected !==""){
            const auxitem = carrito
            for(let p in item){
                for(const j in item[p].productos){
                    if(item[p].productos[j].color === colorSelected && item[p].productos[j].talla === tallaSelected ) {                        
                        item[p].productos[j].stock = item[p].productos[j].stock-quantity            
                        let entro_c = 0
                        for(let c in auxitem){
                            if(auxitem[c].id === item[p].id && item[p].productos[j].color === auxitem[c].color && item[p].productos[j].talla === auxitem[c].talla){
                                entro_c = 1
                                auxitem[c].stock = item[p].productos[j].stock
                                auxitem[c].cartCount += quantity
                            } 
                        }
                        if(entro_c === 0) {                            
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

    return(
        <CartContext.Provider value={{totalCartCount:totalCartCount,carrito:carrito, addItem}}>
            {children}
        </CartContext.Provider>
    )
}