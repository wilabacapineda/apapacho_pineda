import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import {Link} from 'react-router-dom'
import loading from './Loading_icon.gif'
import trash_icon from './trash-solid.svg'
import './styles.css'

const Carrito = () => {
    const cartC = useContext(CartContext)
    const [carro, setCarro]= useState()       

    useEffect( () => {
        cartC.setBol(true)
        setTimeout(() => {   
            const getItems = new Promise((resolve,reject) => {resolve(cartC.carrito)})
            getItems.then((carrito) => {            
                const resultado = carrito.map((c) => (
                        <div key={'product_'+c.id+'_'+c.color+'_'+c.talla} id={'product_'+c.id} className='productCart'>
                            <div className='productCartImg'>
                                <Link to={'/tienda/item/'+c.id} key={'itemLinkImg'+c.id}><img src={require('./'+c.pictureUrl)} alt={c.title} /></Link>                                
                            </div>
                            <div className='productCartInfo'>
                                <h2 className='productCartName'><Link to={'/tienda/item/'+c.id} key={'itemLinkTitle'+c.id}>{c.title} {c.talla}</Link></h2>  
                                <div className='productCartDetail'>Talla: {c.talla} | Color: {c.color}</div>  
                                <div className='productCartDetailTitle'>
                                    <div className='productCartDetailTValue'><span>Valor</span><span>${c.price.toLocaleString()}</span></div>
                                    <div className='productCartDetailTValue'><span>Cant.</span><span>{c.cartCount}</span></div>
                                    <div className='productCartDetailTValue'><span>TOTAL</span><span>${(c.cartCount * c.price).toLocaleString()}</span></div>                               
                                    <div className='productCartDetailTValue'><button className='removeItem' onClick={ () => {cartC.removeItem(c.id, c.talla, c.color)}}><img src={trash_icon} alt='trash icon' /></button></div>                                 
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
                                    <h2>Total Carrito</h2>
                                    <h5>Cantidad de Productos: {cartC.totalCartCount}</h5>
                                    <h4>Total: ${(carrito.reduce((acc,c) => acc + (c.cartCount * c.price),0)).toLocaleString()}</h4>
                                    <div className='vaciarCarrito'>
                                        <button disabled={cartC.totalCartCount===0} className='botonLc' onClick={() => {cartC.clear()}}>Vaciar Carrito</button>
                                    </div>
                                </div>
                            </div>                                                
                        </div>
                    </>
                )    
            })
            cartC.setBol(false)    
        }, 2000)   
        return () => {}     
    },[cartC.carrito])

    return (
        <>
            { cartC.bol===true ? (<div className="bodyLoading"><div className="loading"><img src={loading} alt="loading" /></div></div>) : "" }
            {carro}
        </>
    ) 
}

export default Carrito