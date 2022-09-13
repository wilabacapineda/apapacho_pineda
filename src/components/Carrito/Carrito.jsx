import { useState, useEffect } from 'react'
import Productos from './../Productos/productos'
import './styles.css'

const Carrito = ({carrito,setCarrito,totalCartCount}) => {
    const [carro, setCarro] = useState([carrito])  
    useEffect(() => {
        setCarro(carrito)
    },[carrito])

    return <span>{totalCartCount>0 ? (<><div className='carrito'><h1>Carrito de Compras con {totalCartCount} Productos</h1></div></>): (<><div className='carrito'><h1>Carrito de Compras Vacío</h1></div></>)}</span>
}

export default Carrito