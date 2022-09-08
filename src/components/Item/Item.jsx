import './styles.css'

const Item = ({id,title,price,pictureUrl,s}) => {
   
  return (
    <div className="producto" id={id}>
        <div className='productoItem'>
          <div className='productoImage'>
            <img src={require('./'+pictureUrl)} alt={title} />
          </div>        
          <div className='productoInfo'>
            <h2>{title}</h2>
            <div className="productoInfoPrice">
              <span>${price}</span>              
            </div>
            <span>Stock: {s}</span>
          </div>
        </div>                        
    </div>
  )
}

export default Item