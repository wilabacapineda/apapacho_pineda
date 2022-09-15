import { useState, useEffect } from 'react'
import loading from './Loading_icon.gif'
import './styles.css'

const Carrito = ({carrito,totalCartCount}) => {

    const [carro, setCarro]= useState(<img src={loading} alt="loading" />) 
      
    useEffect( () => {
        const getItems = new Promise((resolve,reject) => {
            setTimeout(() => {   
                resolve(carrito)
            }, 2000)
        })
        getItems.then((result) => {            
            const resultado = result.map((c) => (
                    <div key={'product_'+c.id+'_'+c.color+'_'+c.talla} id={'product_'+c.id} className='productCart'>
                        <div className='productCartImg'><img src={require('./'+c.pictureUrl)} alt={c.title} /></div>
                        <div className='productCartInfo'>
                            <h2 className='productCartName'>{c.title} {c.talla}</h2>  
                            <div className='productCartDetail'>Talla: {c.talla} | Color: {c.color}</div>  
                            <div className='productCartDetailTitle'>
                                <div className='productCartDetailTValue'><span>Valor</span><span>${c.price.toLocaleString()}</span></div>
                                <div className='productCartDetailTValue'><span>Cant.</span><span>{c.cartCount}</span></div>
                                <div className='productCartDetailTValue'><span>TOTAL</span><span>${(c.cartCount * c.price).toLocaleString()}</span></div>                                
                            </div>
                        </div>                       
                    </div>
                )
            )            
            setCarro(
                <>
                    <div className='carrito'>
                        <h1>Carrito de Compras</h1>
                        <div className='carritoPage'>
                            <div className='carritoLeft'>
                                {resultado}
                            </div>
                            <div className='carritoRight'>
                                <h3>Total de Productos {totalCartCount}</h3>
                            </div>
                        </div>                                                
                    </div>
                </>
            )    
        })
    },[])

    return (
        <>
            {carro}
        </>
    ) 
}

export default Carrito