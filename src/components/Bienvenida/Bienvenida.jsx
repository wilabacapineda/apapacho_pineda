const Bienvenida = ({greeting, subtitulo}) => {
  return (
    <>
        <h1 className="greeting">{greeting}</h1>
        <h4 className='subtitulo'>{subtitulo}</h4>
    </>
  )
}

export default Bienvenida