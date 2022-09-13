import CartIcon from './cart-shopping-solid.svg'
import UserIcon from './user-solid.svg'
import CartNumber from './../CartNumber/CartNumber'
import {Link} from 'react-router-dom'

import './styles.css'

const CartWidget = ({totalCartCount, setTotalCartCount}) => {  
  return (    
    
      <div className="cartWidget">  
          <img className="cartIcon" id="usuario" src={UserIcon} />
          <Link to='/carrito' className='cartWidget'>
            <img className="cartIcon" src={CartIcon} />
            <span id="cartNumber"><CartNumber totalCartCount={totalCartCount} setTotalCartCount={setTotalCartCount} /></span>
          </Link>         
      </div>
    
    
  )
}

export default CartWidget