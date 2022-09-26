import { useEffect, useState, useContext } from 'react'
import { CartContext } from './../../context/CartContext'
import ItemCount from './../ItemCount/ItemCount'
import {Link} from 'react-router-dom'
import loading from './Loading_icon.gif'
import './styles.css'
import {db} from './../../utils/firebase'
import {collection, getDocs} from 'firebase/firestore'

const ItemDetail = ({item}) => {
    const cartC = useContext(CartContext)
    const [cartCount, setCartCount]= useState(1)
    const [stock, setStock] = useState()
    const [tallaSelected, setTallaSelected] = useState("")
    const [colorSelected, setColorSelected] = useState("")
    const [optionColor, setOptionColor] = useState("")
    const [optionTalla, setOptionTalla] = useState("")
    const [botonDisabled,setBotonDisabled] = useState(true)
    const [precio, setPrecio] = useState(0)
    const [endCart, setEndCart] = useState(false)

    useEffect(() => {
        if(Object.keys(item).length!==0){
            const q = collection(db,'items',item.id,'productos')             
            getDocs(q).then( resp => {  
                let color = []
                let talla = []
                resp.docs.map( p => {
                    if (p.data().stock>0) {
                        if(color.length===0){
                            color.push(p.data().color)
                        } else {
                            let entro_c=0
                            for (const c of color){
                                if(c===p.data().color){
                                    entro_c=1
                                }
                            }
                            if(entro_c===0){
                                color.push(p.data().color)
                            }
                        }  
                
                        if(talla.length===0){
                            talla.push(p.data().talla)
                        } else {
                            let entro_t=0
                            for (const c of talla){
                                if(c===p.data().talla){
                                    entro_t=1
                                }
                            }
                            if(entro_t===0){
                                talla.push(p.data().talla)
                            }
                        }  
                    }
                })                
                setOptionColor(color.map((c) => (<option key={c} value={c}>{c}</option>)))
                setOptionTalla(talla.map((c) => (<option key={c} value={c}>{c}</option>)))    
            })
            
        }        
        return(() => {})
    },[item])

    const addCart = (itemCount) => {
        setCartCount(itemCount)
        setStock(stock-itemCount)
        cartC.addItem(item,itemCount,tallaSelected,colorSelected)
                
        if(stock>1){
            setBotonDisabled(false)
        } else {
            setBotonDisabled(true)
        }
        setEndCart(true)
    }    

    const load_cart = () => {       

        const resultado = endCart ? 
        (
            <div className='productoShop'>
                <span>¿Desea continuar su compra?</span>
                <div className='cartEnd'>
                    <Link to={'/tienda'}><button className='botonLc'>Continuar</button></Link>   
                    <Link to={'/cart'}><button className='botonLc'>Terminar</button></Link>                           
                </div>
                
            </div>
        )
        :
        (           
            <div className='productoShop'>
                <ItemCount disabled={botonDisabled} key={item.id} stock={stock} initial={1} cartCount={cartCount} setCartCount={setCartCount} onAdd={addCart} />
                <div className="itemCarrito"> Stock {stock} | Total Productos en Carrito: {cartC.totalCartCount} </div>
            </div>
        )
        
        return resultado
    }

    const load_prod = () => {       
        return (            
            <div className="producto" id={item.id}>
                <h1>{item.title}</h1>
                <div className='productoItem'>
                    <div className='productoImage'>
                        <img src={item.pictureUrl} alt={item.title} />
                    </div>                            
                    <div className='productoInfo'>
                        <div className="productoInfoDesc">{item.description}</div>
                        <div className='productoInfoColor'>
                            <span>Color:</span>
                            <select key={'selectColor'} onChange={ (e) => setColorSelected(e.target.value) } defaultValue={colorSelected} name="color" id="color">
                                <option value="" disabled>Seleccione un Color</option>
                                {optionColor}
                            </select>
                        </div>
                        <div className='productoInfoTalla'>
                            <span>Talla:</span>
                            <select key={'selectTalla'} onChange={ (e) => setTallaSelected(e.target.value) } defaultValue={tallaSelected} name="talla" id="talla">
                                <option value="" disabled>Seleccione un Talla</option>
                                {optionTalla}
                            </select>
                        </div>
                        <div className='productoInfoPrice'>
                            {precio>0 && 'Precio: $'+precio.toLocaleString()}
                        </div>                                             
                        {stock>=0 && load_cart()}                        
                    </div>                    
                </div>                      
            </div>            
        )
    }

    const load_img = () => {
        return ( <div className="bodyLoading"><div className="loading"><img src={loading} alt="loading" /></div></div> )
    }
    
    useEffect( () => {            
        if(tallaSelected!=="" && colorSelected !==""){
            if(Object.keys(item).length!==0){
                const q = collection(db,'items',item.id,'productos')             
                getDocs(q).then( resp => {                      
                    resp.docs.map( p => {                        
                        if(p.data().color === colorSelected && p.data().talla === tallaSelected ) {

                            cartC.isInCart(item.id,tallaSelected,colorSelected) ? setStock(p.data().stock-(cartC.carrito.find( (c) => c.id===item.id && c.talla === tallaSelected && c.color === colorSelected).cartCount)) : setStock(p.data().stock)                             
                            setPrecio(p.data().price)
                            if(p.data().stock>1){
                                setBotonDisabled(false)
                            } else {
                                setBotonDisabled(true)
                            }     
                        }
                    })                                   
                })
            }                    
        }  
        return () => {}
    },[tallaSelected,colorSelected])

    useEffect( () => {
        if(stock<=0){
            setCartCount(0)
        } else {
            setCartCount(1)
        }
        return () => {}
    },[stock])    
    
    return (
        <>            
            { Object.keys(item).length===0 ? load_img() : load_prod() }
        </>
    )    
}

export default ItemDetail