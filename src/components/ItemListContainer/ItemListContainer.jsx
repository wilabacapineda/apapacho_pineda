import './styles.css'
const ItemListContainer = ({greeting, subtitulo}) => {
  return (
    <>
      <h1 className="greeting">{greeting}</h1>
      <h4 className='subtitulo'>{subtitulo}</h4>
      <button className='botonLc'>Login</button>
    </>
    
  )
}

export default ItemListContainer