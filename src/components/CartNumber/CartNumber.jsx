import { useState, useEffect } from 'react'

const CartNumber = ({number}) => {
    const [cartNumber, setCartNumber] = useState(0)  
    useEffect(() => {
        setCartNumber(number)
    },[number])
    return <span>{cartNumber>0 ? cartNumber: ""}</span>
    
}

export default CartNumber

