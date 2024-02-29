import React, { useContext } from 'react'
import { Badge, Button, Container, Dropdown, FormControl, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import shopping from './shopping.webp'
import { FaCartArrowDown } from "react-icons/fa";
import { GlobalContext } from '../context/Context';
import { AiFillDelete } from 'react-icons/ai';

const Header: React.FC = () => {
    const { state: { cart }, dispatch, filterDispach } = useContext(GlobalContext);
    return (
        <Navbar bg='dark' variant='dark' style={{ width: '100%', height: 75, position: 'fixed', zIndex: 1000, top: 0, left: 0 }}>
            <Container>
                <Navbar.Brand>
                    <Link to='/' style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                        <img src={shopping} width="60" height="40" className="d-inline-block align-top" alt="shopping cart pic" ></img>
                        <span>Shopping Cart</span>
                    </Link>
                </Navbar.Brand>
                <Navbar.Text className='nav-search'>
                    <FormControl style={{ width: '30vw' }} type='search' placeholder='Search a product....' className='m-auto' aria-label='Search'
                        onChange={(e) => {
                            filterDispach({
                                type: 'FILTER_BY_SEARCH',
                                payload: e.target.value
                            })
                        }}
                    />
                </Navbar.Text>
                <Nav>
                    <Dropdown align={'end'}>
                        <Dropdown.Toggle variant='success'>
                            <FaCartArrowDown color='white' fontSize="25px" />
                            <Badge bg='none' className='me-3 fs-6'>{cart.length}</Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ width:'30vw' }}>
                            {
                                cart.length > 0 ? <>
                                    {
                                        cart.map(prod => (
                                            <span className='cart-item' key={prod.id}>
                                                <img src={prod.thumbnail} className='cart-item-img' alt={prod.title} />
                                                <div className='cart-item-details'>
                                                    <span>{prod.title}</span>
                                                    <span>$ {prod.price}</span>
                                                </div>
                                                <AiFillDelete fontSize='2vw' cursor='pointer'
                                                    onClick={() => {
                                                        dispatch({
                                                            type: "REMOVE_FROM_CART",
                                                            payload: prod,
                                                        })
                                                    }}
                                                />
                                            </span>))
                                    }
                                    <Link to='/cart'>
                                        <Button style={{ width: "100%" }}>Go to cart</Button>
                                    </Link>
                                </> :
                                    <span>Cart is Empty</span>

                            }

                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header