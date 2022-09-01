import CartIcon from './cart-shopping-solid.svg'
import UserIcon from './user-solid.svg'
import CartNumber from './../CartNumber/CartNumber'
import './styles.css'

const CartWidget = () => {  
  return (    
    <div className="cartWidget">  
        <img className="cartIcon" id="usuario" src={UserIcon} />
        <img className="cartIcon" src={CartIcon} />
        <span id="cartNumber"><CartNumber/></span>
    </div>
  )
}

export default CartWidget