import { useEffect, useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import {Link} from 'react-router-dom'
import loading from './Loading_icon.gif'
import trash_icon from './trash-solid.svg'
import './styles.css'

const Cart = () => {
    const cartC = useContext(CartContext)   
    
    useEffect( () => {        
        cartC.setLoadBol(true)    
        setTimeout(() => {   
            cartC.setLoadBol(false)    
        }, 2000)   
        return () => {}     
    },[])
    
    const carro = () => {
        const resultado = cartC.carrito.map((c) => (
            <div key={'product_'+c.id+'_'+c.color+'_'+c.talla} id={'product_'+c.id} className='productCart'>
                <div className='productCartImg'>
                    <Link to={'/tienda/item/'+c.id} key={'itemLinkImg'+c.id}><img src={require('./'+c.pictureUrl)} alt={c.title} /></Link>                                
                </div>
                <div className='productCartInfo'>
                    <h2 className='productCartName'><Link to={'/tienda/item/'+c.id} key={'itemLinkTitle'+c.id}>{c.title} {c.talla}</Link></h2>  
                    <div className='productCartDetail'>Talla: {c.talla} | Color: {c.color} | Stock: {c.stock}</div>  
                    <div className='productCartDetailTitle'>
                        <div className='productCartDetailTValue'><span>Valor</span><span>${c.price.toLocaleString()}</span></div>
                        <div className='productCartDetailTValue'><span>Cant.</span><span><input type="number" disabled={cartC.loadBol} set="1" min="1" max={parseInt(c.stock) + parseInt(c.cartCount)} value={c.cartCount} onChange={ (e) => { cartC.setNumberOfItem(c,e.target.value) } } /></span></div>
                        <div className='productCartDetailTValue'><span>TOTAL</span><span>${(c.cartCount * c.price).toLocaleString()}</span></div>                               
                        <div className='productCartDetailTValue'><button className='removeItem' onClick={ () => {cartC.removeItem(c.id, c.talla, c.color)}}><img src={trash_icon} alt='trash icon' /></button></div>                                 
                    </div>                            
                </div>                       
            </div>
            )
        )  
        return (
            <>
                <div className='carrito'>
                    <h1>Carrito de Compras</h1>
                    {
                        cartC.totalCartCount > 0 ?
                        (
                            <div className='carritoPage'>
                                <div className='carritoLeft'>
                                    {resultado}
                                </div>
                                <div className='carritoRight'>
                                    <h2>Resumen Carrito</h2>
                                    <h5>Cantidad de Productos: {cartC.totalCartCount}</h5>
                                    <h4>Total: ${(cartC.carrito.reduce((acc,c) => acc + (c.cartCount * c.price),0)).toLocaleString()}</h4>
                                    <div className='vaciarCarrito'>
                                        <button disabled={cartC.totalCartCount===0} className='botonLc' onClick={() => {cartC.clear()}}>Vaciar Carrito</button>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        (
                            <>
                                <h3>Carrito de Compras Vacio</h3>
                                <Link to={'/tienda'}><h4>Ir a la Tienda</h4></Link>                                                                
                            </>                            
                        )
                    }                                                                  
                </div>
            </>
        )
    }

    const load_img = () => {
        return ( <div className="bodyLoading"><div className="loading"><img src={loading} alt="loading" /></div></div> )
    }

    return (
        <>            
            { cartC.loadBol ? load_img() : carro()}
        </>
    ) 
}

export default Cart