import React, { useContext, useEffect, useState } from 'react';
//import Card from '../UI/Card/Card';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { CartContext } from '../../ContextStore/Cart-Context';
import classes from './SingleProduct.module.css'
import { Link } from 'react-router-dom';


const AvailableProducts = (props) => {

  const [products, setProducts] = useState([])
  const CartCtx = useContext(CartContext);

  function addCartHendler(item) {
    CartCtx.addToCart({ ...item, quantity: 1, size: 'M' })
  }

  async function fetchProductFromBackend(gender) {
    const prod = await fetch(`http://localhost:4000/store/getItems`, {
      method: 'POST',
      body: JSON.stringify({ gender: gender }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await prod.json()
    setProducts([...data.product])
  }

  useEffect(() => {
    fetchProductFromBackend(props.checked)
  }, [props.checked])


  const availableProducts = products.map((product) => (
    <Col key={product._id} sm={4}>
      <Card className='shadow-lg' style={{ margin: '25px 0', paddingBottom: '15px' }}>
        <Card.Body style={{ width: 'fit-content', height: '350px' }}>
          <img src={product.imageUrl} alt={product.title} style={{ height: '200px', margin: '0' }} />
          <h3 style={{ fontSize: '1rem' }}><Link to={`/singleproduct/${product._id}`}>{product.title}</Link></h3>
          <p>${product.price}</p>
          <h6 className={classes['price-text-discount-cut']}>{product.discount}</h6>
          <h6 className={classes['price-text-discount']}>{product.offer}</h6>
          <Button varient='success' onClick={() => { addCartHendler(product) }}>Add to Cart</Button>
        </Card.Body>
      </Card>
    </Col>

  ));

  return (
    <section>
      <div>
        <Container className='mt-3'>
          <Row>
            {availableProducts}
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default AvailableProducts;