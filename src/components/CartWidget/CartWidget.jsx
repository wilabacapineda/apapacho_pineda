import CartIcon from './cart-shopping-solid.svg'
import UserIcon from './user-solid.svg'
import CartNumber from './../CartNumber/CartNumber'
import './styles.css'

const CartWidget = ({totalCartCount, setTotalCartCount}) => {  
  return (    
    <div className="cartWidget">  
        <img className="cartIcon" id="usuario" src={UserIcon} />
        <img className="cartIcon" src={CartIcon} />
        <span id="cartNumber"><CartNumber totalCartCount={totalCartCount} setTotalCartCount={setTotalCartCount} /></span>
    </div>
  )
}

export default CartWidget