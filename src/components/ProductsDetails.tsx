import React, { useContext } from 'react'
import ProductImageSlider from './ProductImageSlider'
import { useLocation } from 'react-router-dom'
import Ratings from './Ratings';
import { GlobalContext } from '../context/Context';
import { Button } from 'react-bootstrap';

const ProductsDetails: React.FC = () => {

    const location = useLocation();
    const { product } = location.state;

    const { state:{cart}, dispatch } = useContext(GlobalContext);

    return (
        <div className='details-container'>
            {
                product ?
                    <>
                        <div style={{backgroundColor:'#343a40',width:'100%'}}>
                            <ProductImageSlider imgs={product.images} style={{ height: '30rem' }} />
                        </div>
                        <div>
                            <h2>{product.title}</h2>
                            <h4>{product.description}</h4>
                            <p>Brand: {product.brand}</p>
                            <div>
                                <h5>$ {product.price}</h5>
                                <p>discount: {product.discountPercentage} %</p>
                                <p>In Stock: {product.stock}</p>
                                <span>Ratings: </span>
                                <Ratings rating={product.rating} />
                            </div>
                        </div>
                        <div>
                            {
                                cart.some(p => p.id === product.id) ?
                                <Button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: product})} variant='danger'>Remove from cart</Button> : 
                                <Button onClick={() => { dispatch({ type: 'ADD_TO_CART', payload: product })}} disabled={!product.stock}>{!product.stock ? 'Out of Stoke' : 'Add to cart'}</Button>
                            }
                        </div>
                    </> : <></>
            }
        </div>
    )
}

export default ProductsDetails