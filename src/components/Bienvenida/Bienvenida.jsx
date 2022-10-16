import {useContext} from 'react'
import { CartContext } from './../../context/CartContext'

const Bienvenida = ({greeting, subtitulo}) => {
  const cartC = useContext(CartContext) 

  return (
    <>
        <h1 className="greeting">{cartC.userBool ? greeting.replace('Visitante',JSON.parse(localStorage.getItem('user')).displayName) : greeting}</h1>
        <h4 className='subtitulo'>{subtitulo}</h4>
    </>
  )
}

export default Bienvenida