import { useEffect, useState, useContext } from 'react'
import { CartContext } from './../../context/CartContext'
import ItemCount from './../ItemCount/ItemCount'
import {Link} from 'react-router-dom'
import loading from './Loading_icon.gif'
import './styles.css'

const ItemDetail = ({item}) => {
    const cartC = useContext(CartContext)
    const [cartCount, setCartCount]= useState(1)
    const [stock, setStock] = useState()
    const [tallaSelected, setTallaSelected] = useState("")
    const [colorSelected, setColorSelected] = useState("")
    const [botonDisabled,setBotonDisabled] = useState(true)
    const [precio, setPrecio] = useState(0)
    const [endCart, setEndCart] = useState(false)

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

        let color = []
        let talla = []
        for(let p in item){
            for(const j in item[p].productos){
                if (item[p].productos[j].stock>0) {
                    if(color.length===0){
                        color.push(item[p].productos[j].color)
                    } else {
                        let entro_c=0
                        for (const c of color){
                            if(c===item[p].productos[j].color){
                                entro_c=1
                            }
                        }
                        if(entro_c===0){
                            color.push(item[p].productos[j].color)
                        }
                    }  
            
                    if(talla.length===0){
                        talla.push(item[p].productos[j].talla)
                    } else {
                        let entro_t=0
                        for (const c of talla){
                            if(c===item[p].productos[j].talla){
                                entro_t=1
                            }
                        }
                        if(entro_t===0){
                            talla.push(item[p].productos[j].talla)
                        }
                    }  
                }                
            } 
        }              
        
        const optionColor = color.map((c) => (<option key={c} value={c}>{c}</option>))
        const optionTalla = talla.map((c) => (<option key={c} value={c}>{c}</option>))
        
        return (            
            <div className="producto" id={item[0].id}>
                <h1>{item[0].title}</h1>
                <div className='productoItem'>
                    <div className='productoImage'>
                        <img src={require('./'+item[0].pictureUrl)} alt={item[0].title} />
                    </div>                            
                    <div className='productoInfo'>
                        <div className="productoInfoDesc">{item[0].description}</div>
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
            for(let p in item){
                for(const j in item[p].productos){
                    if(item[p].productos[j].color === colorSelected && item[p].productos[j].talla === tallaSelected ) {
                        setStock(item[p].productos[j].stock) 
                        setPrecio(item[p].productos[j].price)
                        if(item[p].productos[j].stock>1){
                            setBotonDisabled(false)
                        } else {
                            setBotonDisabled(true)
                        }                       
                    }                    
                } 
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