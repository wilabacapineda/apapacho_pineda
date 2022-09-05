import Producto from '../Producto/Producto'
import './styles.css'

const ItemListContainer = ({greeting, subtitulo, totalCartCount, setTotalCartCount}) => {  
  return (
    <>
      <h1 className="greeting">{greeting}</h1>
      <h4 className='subtitulo'>{subtitulo}</h4>
      <div className="nProductos">
        <Producto totalCartCount={totalCartCount} setTotalCartCount={setTotalCartCount} s={'5'}/>
        </div>      
      
    </>
    
  )
}

export default ItemListContainer