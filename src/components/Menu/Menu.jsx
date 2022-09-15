import {NavLink} from 'react-router-dom'

const Menu = ({menuName,url}) => {
  return (
    <li className="nav-item">
        <NavLink to={url} className={({isActive}) => isActive ? "nav-link active" : "nav-link"} >{menuName}</NavLink>        
    </li>
  )
}

export default Menu