import { useState } from 'react'
import CartIcon from './cart-shopping-solid.svg'
import UserIcon from './user-solid.svg'
import './styles.css'

const CartWidget = () => {

  const [cartNumber, setCartNumber] = useState(1)

  return (    
    <div className="cartWidget">  
        <img className="cartIcon" id="usuario" src={UserIcon} />
        <img className="cartIcon" src={CartIcon} />
        <span id="cartNumber">{ cartNumber > 0 ? cartNumber : "" }</span>
    </div>
  )
}

export default CartWidget