import React, { useContext } from 'react'
import { Product } from '../context/types'
import { Button, Card } from 'react-bootstrap'
import ProductImageSlider from './ProductImageSlider'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../context/Context'
import Ratings from './Ratings'

const SingleProduct: React.FC<{ prodItem: Product }> = ({ prodItem }) => {

  const { state: {cart}, dispatch} = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleDeteilsPage = (product:Product) => {
    // console.log(product);
    navigate('/details', { state: { product } });
  }

  return (
      <Card className='product-card'>
        {/* <Card.Img className='product-card-img' variant='top' src={prodItem.thumbnail} alt={prodItem.title}/> */}
        <ProductImageSlider imgs={prodItem.images} style={{height:'15rem'}}/>
        <Card.Body style={{cursor:'pointer', border:'1px solid', borderRadius:'5px'}} onClick={() => handleDeteilsPage(prodItem)}>
          <Card.Title>{prodItem.title}</Card.Title>
          <Card.Subtitle>
            <span>{prodItem.description}</span>
            <div>$ {prodItem.price}</div>
            <div className='mb-1'>Instock: {prodItem.stock}</div>
          </Card.Subtitle>
          <Ratings rating={prodItem.rating} />
        </Card.Body>
        <div>
          {
            cart.some(p => p.id === prodItem.id) ?
            <Button onClick={() => { dispatch({ type: 'REMOVE_FROM_CART', payload: prodItem })}} variant='danger'>Remove from Cart</Button> :
            <Button onClick={() => { dispatch({ type: 'ADD_TO_CART', payload: prodItem })}} disabled={!prodItem.stock}>{!prodItem.stock ? 'Out of Stoke' : 'Add to cart'}</Button>
          }
        </div>
      </Card>
  )
}

export default SingleProduct