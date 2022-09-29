import { useEffect, useContext} from 'react'
import { CartContext } from '../../context/CartContext'
import {Link} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import loading from './Loading_icon.gif'
import trash_icon from './trash-solid.svg'
import {db} from './../../utils/firebase'
import {doc,addDoc,updateDoc,collection,getDocs,getDoc,query,where} from 'firebase/firestore'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'
import withReactContent from 'sweetalert2-react-content'
import './styles.css'

const Cart = () => {
    const cartC = useContext(CartContext)       
    const { register, handleSubmit, formState: { errors } } = useForm();   
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate();
    
    const sendOrder = (e) => {   
        cartC.setUserInfo(e)
        cartC.idOrder ? updateOrder (e) : createOrder (e)        
    }

    const updateOrder = (e) => {
        let date = new Date();
        const order = {
            buyer: e,
            items: cartC.carrito,
            dateUpdate: date.toLocaleDateString(),
            total: cartC.carrito.reduce((acc,c) => acc + (c.cartCount * c.price),0)
        } 
        const orderDoc = doc(db,'orders',cartC.idOrder)
        updateDoc(orderDoc, order)
        MySwal.fire({
            icon: 'success',
            title: 'Su Orden ha sido actualizada correctamente!',
            html: 'ID de Orden: '+cartC.idOrder+'<br/><p class="endCart">¿Desea terminar su compra?</p>',
            showCancelButton: true,
            confirmButtonText: 'Terminar compra',
            cancelButtonText: 'Continuar comprando',
        }).then((result) => {
            if(result.isConfirmed) {   
                endOrder() 
                MySwal.fire({
                    icon: 'success',
                    title: 'Muchas Gracias por su compra!',
                    text: 'Su orden ha sido finalizada',
                }).then(navigate('/')) 
            } else {
                navigate('/tienda')
            }
        })
    }

    const createOrder = (e) => {
        let date = new Date();
        const order = {
            buyer: e,
            items: cartC.carrito,
            date: date.toLocaleDateString(),
            dateCreate: date.toLocaleDateString(),
            total: cartC.carrito.reduce((acc,c) => acc + (c.cartCount * c.price),0)
        }      
        const ordersCollection = collection(db,'orders')
        addDoc(ordersCollection, order).then( response => {                        
            cartC.setIdOrder(response.id)       
            MySwal.fire({
                icon: 'success',
                title: 'Su Orden ha sido creada correctamente',
                html: 'ID de Orden: '+response.id+'<br/>¿Está seguro de Terminar su compra?',
                showCancelButton: true,
                confirmButtonText: 'Terminar compra',
                cancelButtonText: 'Continuar comprando',
            }).then((result) => {
                if(result.isConfirmed) {
                    endOrder()    
                    MySwal.fire({
                        icon: 'success',
                        title: 'Muchas Gracias por su compra!',
                        text: 'Su orden ha sido finalizada',
                    }).then(navigate('/'))                              
                } else {
                    navigate('/tienda')
                }
            })           
        })        
    }

    const endOrder = () => {                
        cartC.setLoadBol(true)           
        cartC.carrito.forEach( c => {
            const q = doc(db,"items",c.id)
            getDoc(q).then(resp => {
                if(resp.exists()){
                    const updateStock = doc(db,'items',c.id)
                    const aux = resp.data().stock - c.cartCount                    
                    updateDoc(updateStock,{ stock: aux})
                }            
            })            
            const q2 = query(
                collection(db,"items",c.id,'productos'),
                where("color","==",c.color),
                where("talla","==",c.talla)
            )
            getDocs(q2).then(resp => {
                resp.docs.forEach(p=> {
                    const updateStock = doc(db,'items',c.id,'productos',p.id)
                    const aux = p.data().stock - c.cartCount
                    const aux2 = p.data().ventas + c.cartCount
                    updateDoc(updateStock,{ stock: aux, ventas:aux2})
                })
            })
            
        })         
        cartC.setLoadBol(false) 
        cartC.clear()
        cartC.setIdOrder("")                    
    }    

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
                    <Link to={'/tienda/item/'+c.id} key={'itemLinkImg'+c.id}><img src={c.pictureUrl} alt={c.title} /></Link>                                
                </div>
                <div className='productCartInfo'>
                    <h2 className='productCartName'><Link to={'/tienda/item/'+c.id} key={'itemLinkTitle'+c.id}>{c.title} {c.talla}</Link></h2>  
                    <div className='productCartDetail'>Talla: {c.talla} | Color: {c.color}</div>  
                    <div className='productCartDetailTitle'>
                        <div className='productCartDetailTValue'><span>Valor</span><span>${c.price.toLocaleString()}</span></div>
                        <div className='productCartDetailTValue'><span>Cant.</span><span><input type="number" disabled={cartC.loadBol} set="1" min="1" value={c.cartCount} onChange={ (e) => { cartC.setNumberOfItem(c,e.target.value) } } /></span></div>
                        <div className='productCartDetailTValue'><span>TOTAL</span><span>${(c.cartCount * c.price).toLocaleString()}</span></div>                               
                        <div className='productCartDetailTValue'><button className='removeItem' onClick={ () => {cartC.removeItem(c)}}><img src={trash_icon} alt='trash icon' /></button></div>                                 
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
                                    <h4 className='totalCarrito'>Total: ${(cartC.carrito.reduce((acc,c) => acc + (c.cartCount * c.price),0)).toLocaleString()}</h4>
                                    <span className='cantProd'>Cantidad de Productos: {cartC.totalCartCount}</span>
                                    <div className='vaciarCarrito'>
                                        <button disabled={cartC.totalCartCount===0} className='botonLc' onClick={() => {cartC.clear()}}>Vaciar Carrito</button>
                                    </div>
                                    <div className='orderInfo'>
                                        <form onSubmit={handleSubmit(sendOrder)} className="orderForm">
                                            <h4>Información Comprador</h4>
                                            <div>
                                                <label>Nombre: </label>
                                                <input type="text" defaultValue={ cartC.userInfo.name} placeholder="Nombre" {...register("name", {required: true, maxLength: 80})} />
                                            </div>
                                            <div>
                                                <label>Telefono: </label>
                                                <input type="tel" defaultValue={cartC.userInfo && cartC.userInfo.phone} placeholder="Telefono" {...register("phone", {required: true, maxLength: 12, pattern: /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/i})} />
                                            </div>
                                            <div>
                                                <label>Correo: </label>
                                                <input type="email" defaultValue={cartC.userInfo && cartC.userInfo.email} placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
                                            </div>                                            
                                            <button className="botonLc" type="submit">{cartC.idOrder ? "Actualizar Orden" : "Crear Orden"}</button>
                                        </form>
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