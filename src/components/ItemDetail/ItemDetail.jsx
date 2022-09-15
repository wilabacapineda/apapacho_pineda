import { useEffect } from 'react'
import {useState} from 'react'
import ItemCount from '../ItemCount/ItemCount'
import loading from './Loading_icon.gif'
import './styles.css'

const ItemDetail = ({item, totalCartCount, setTotalCartCount,carrito,setCarrito}) => {
    const [cartCount, setCartCount]= useState(1)
    const [stock, setStock] = useState()
    const [tallaSelected, setTallaSelected] = useState("")
    const [colorSelected, setColorSelected] = useState("")
    const [botonDisabled,setBotonDisabled] = useState(true)
    const [precio, setPrecio] = useState(0)
    
    useEffect( () => {
        if(stock<=0){
            setCartCount(0)
        } else {
            setCartCount(1)
        }
    },[stock])

    useEffect( () => {        
        mostrarStock()
    },[tallaSelected])

    useEffect( () => {
        mostrarStock()
    },[colorSelected])

    const addCart = (itemCount) => {
        setCartCount(itemCount)
        setStock(stock-itemCount)
        setTotalCartCount(parseInt(totalCartCount)+parseInt(itemCount))     

        if(tallaSelected!=="" && colorSelected !==""){
            const auxitem = carrito
            for(let p in item){
                for(const j in item[p].productos){
                    if(item[p].productos[j].color === colorSelected && item[p].productos[j].talla === tallaSelected ) {                        
                        item[p].productos[j].stock = item[p].productos[j].stock-itemCount
            
                        let entro_c = 0
                        for(let c in auxitem){
                            if(auxitem[c].id === item[p].id && item[p].productos[j].color === auxitem[c].color && item[p].productos[j].talla === auxitem[c].talla){
                                entro_c = 1
                                auxitem[c].stock = item[p].productos[j].stock
                                auxitem[c].cartCount += itemCount
                            } 
                        }
                        if(entro_c === 0) {                            
                            auxitem.push({
                                id:item[p].id,
                                categoria:item[p].categoria,
                                title:item[p].title,                                
                                description:item[p].description,
                                pictureUrl:item[p].pictureUrl,
                                cartCount:itemCount,                            
                                color:item[p].productos[j].color,
                                talla:item[p].productos[j].talla,
                                stock:item[p].productos[j].stock,  
                                price:item[p].productos[j].price,  
                                ventas:item[p].productos[j].ventas
                            })
                        }                        
                        setCarrito(auxitem)
                    }                    
                } 
            }
         
        }
        
        if(stock>1){
            setBotonDisabled(false)
        } else {
            setBotonDisabled(true)
        }
    }

    const load_img = () => {
        return ( <img src={loading} alt="loading" /> )
    }

    const changeColor = (e) => {
        setColorSelected(e.target.value)
    }

    const changeTalla = (e) => {
        setTallaSelected(e.target.value)
    }

    const mostrarStock = () => {
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
    }

    const load_cart = () => {
        return (
            <div className='productoShop'>
                <ItemCount disabled={botonDisabled} key={item.id} stock={stock} initial={1} cartCount={cartCount} setCartCount={setCartCount} onAdd={addCart} />
                <div className="itemCarrito"> Stock {stock} | Total Productos en Carrito: {totalCartCount} </div>
            </div>
        )
    }

    const load_prod = () => {

        let color = []
        let talla = []
        for(let p in item){
            for(const j in item[p].productos){
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
                            <select key={'selectColor'} onChange={changeColor} defaultValue={colorSelected} name="color" id="color">
                                <option value="" disabled>Seleccione un Color</option>
                                {optionColor}
                            </select>
                        </div>
                        <div className='productoInfoTalla'>
                            <span>Talla:</span>
                            <select key={'selectTalla'} onChange={changeTalla} defaultValue={tallaSelected} name="talla" id="talla">
                                <option value="" disabled>Seleccione un Talla</option>
                                {optionTalla}
                            </select>
                        </div>
                        <div className='productoInfoPrice'>
                            {precio>0 ? 'Precio: $'+precio.toLocaleString() : ""}
                        </div>                                             
                        {stock>=0 ? load_cart() : ""}                        
                    </div>                    
                </div>    
                   
            </div>            
        )
    }

    const resultado = Object.keys(item).length===0 ? load_img() : load_prod() 

    return (
        <>
            {resultado}
        </>
    )    
}

export default ItemDetail