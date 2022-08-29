const Menu = ({menuName,url}) => {
  return (
    <li className="nav-item">
        <a href={url} className="nav-link">{menuName}</a>
    </li>
  )
}

export default Menu