import './styles.css'

const Item = ({id,title,price_range,pictureUrl,s}) => {
   
  return (
    <div className="producto" id={id}>
        <div className='productoItem'>
          <div className='productoImage'>
            <img src={pictureUrl} alt={title} />
          </div>        
          <div className='productoInfo'>
            <h2>{title}</h2>
            <div className="productoInfoPrice">
              <span>{price_range}</span>              
            </div>
            <span>Stock: {s}</span>
          </div>
        </div>                        
    </div>
  )
}

export default Item