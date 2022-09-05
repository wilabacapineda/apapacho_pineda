import { useState, useEffect } from 'react'

const CartNumber = ({totalCartCount, setTotalCartCount}) => {
    const [cartNumber, setCartNumber] = useState(totalCartCount)  
    useEffect(() => {
        setCartNumber(totalCartCount)
    },[totalCartCount])
    return <span>{cartNumber>0 ? cartNumber: ""}</span>
    
}

export default CartNumber

