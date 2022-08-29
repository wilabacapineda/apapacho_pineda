import CartIcon from './cart-shopping-solid.svg'
import UserIcon from './user-solid.svg'
import './styles.css'

const CartWidget = () => {
  return (    
    <div class="cartWidget">  
        <img className="cartIcon" id="usuario" src={UserIcon} />
        <img className="cartIcon" src={CartIcon} />
        <span id="cartNumber">4</span>
    </div>
  )
}

export default CartWidget