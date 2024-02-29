import React, { useContext, useEffect, useState } from 'react'
import { Col, ListGroup, Row, Image, Form, Button } from 'react-bootstrap'
import { GlobalContext } from '../context/Context'
import Ratings from './Ratings';
import { AiFillDelete } from 'react-icons/ai';

const Cart: React.FC = () => {
  const { state: { cart }, dispatch } = useContext(GlobalContext);

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(
      Math.round(cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0) * 100) / 100
    );
  }, [cart]);

  return (
    <div className='home'>
      <div className='cart-container'>
        <ListGroup>
          {
            cart.map((prod,index) => <ListGroup.Item style={{width:'100%', height:'15vh',display:'flex', alignItems:'center'}} key={index}>
              <Row>
                <Col md={2}><Image src={prod.thumbnail} alt={prod.title} fluid rounded /></Col>
                <Col md={2}> <span>{prod.title}</span></Col>
                <Col md={2}>$ {prod.price}</Col>
                <Col md={2}> <Ratings rating={prod.rating} /></Col>
                <Col md={2}>
                  <Form.Control as="select" type="number" value={prod.qty} onChange={(e) =>
                    dispatch(
                      {
                        type: "CHANGE_CART_QTY", payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      })
                  }
                  >
                    {Array.from({ length: prod.stock }, (_, index) => (
                      <option key={index + 1}>{index + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button type="button" variant="light" onClick={() =>
                    dispatch(
                      {
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      }
                    )}>
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>)
          }
        </ListGroup>
      </div>
      <div className="filters cart-summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: $ {total}</span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  )
}

export default Cart