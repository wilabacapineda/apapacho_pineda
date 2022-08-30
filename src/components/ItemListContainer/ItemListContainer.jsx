import './styles.css'

const ItemListContainer = ({greeting, subtitulo}) => { 

  return (
    <>
      <h1 className="greeting">{greeting}</h1>
      <h4 className='subtitulo'>{subtitulo}</h4>
      <div className="nProductos"><button className='botonLc' id='Anadir'>+</button> N° Productos <button className='botonLc' id='Restar'>-</button></div>      
    </>
    
  )
}

export default ItemListContainer