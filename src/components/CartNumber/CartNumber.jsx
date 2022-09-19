import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

const CartNumber = () => {
    const cartC = useContext(CartContext)
    return <span>{cartC.totalCartCount>0 ? cartC.totalCartCount: ""}</span>
    
}

export default CartNumber