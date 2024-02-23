import React, { useContext, useEffect, useRef, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { CartContext } from '../../ContextStore/Cart-Context';
import classes from './SingleProduct.module.css'
import AuthContext from "../../ContextStore/Auth-Context";

export default function SingleProduct() {

  const authCtx = useContext(AuthContext)
  const token = authCtx.isToken;

  const [sigle, setSingle] = useState([])
  const [commentList, setCommentList] = useState([])
  const [size, setSize] = useState('M')
  const commentRef = useRef()

  const prarams = useParams()

  async function getSingleProduct(prodId) {

    const res = await fetch(`http://localhost:4000/store/getSingleProduct/${prodId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await res.json()

    setSingle([...sigle, data.singleProduct])
  }

  useEffect(() => {
    getSingleProduct(prarams.prodId)
    getCommentHandler()
  }, [prarams.prodId])

  const CartCtx = useContext(CartContext);
  function addCartHendler(item) {
    CartCtx.addToCart({ ...item, quantity: 1, size: size })
  }


  async function commentHandler() {
    const comm = commentRef.current.value
    const rate = document.getElementById('rateing').value;

    const res = await fetch(`http://localhost:4000/contact/postcomment`, {
      method: 'POST',
      body: JSON.stringify({ comment: comm, rateing: rate, prodId: prarams.prodId }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    const data = await res.json()
    setCommentList([...commentList, data.comm])
    commentRef.current.value = ''
  }

  async function getCommentHandler() {

    const res = await fetch(`http://localhost:4000/contact/getcomment/${prarams.prodId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await res.json()
    setCommentList([...commentList, ...data.comm])
  }

  return (
    <React.Fragment>
      {sigle[0] !== undefined && <div className={classes.products}>
        <Card>
          <Card.Img variant="top" src={sigle[0].imageUrl} alt='img' className={classes['img-style']} />
          <Card.Body>
            <Card.Title>{sigle[0].title}</Card.Title>
            <Card.Subtitle style={{ paddingBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto', padding: '10px' }}>
                <h1 style={{ margin: '0 10px' }}>
                  ${sigle[0].price}
                </h1>
                <h6 className={classes['price-text-discount-cut']}> {sigle[0].discount}</h6>
                <h6 className={classes['price-text-discount']}>{sigle[0].offer}</h6>
              </div>
              <div>4 Days Delivery</div>
            </Card.Subtitle>
            <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}>
              <Card.Img variant="top" src={sigle[0].imageUrl} alt={sigle[0].title} className={classes['alter-img-style']} />

              <Card.Img variant="top" src={sigle[0].imageUrl} alt={sigle[0].title} className={classes['alter-img-style']} />

              <Card.Img variant="top" src={sigle[0].imageUrl} alt={sigle[0].title} className={classes['alter-img-style']} />

              <Card.Img variant="top" src={sigle[0].imageUrl} alt={sigle[0].title} className={classes['alter-img-style']} />
            </div>
          </Card.Body>

          <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}>
            <h5 style={{ margin: '20px' }}>container size</h5>
            <button style={{ hover: { color: 'black' } }} className={classes['product-container-size']} onClick={() => { setSize('S') }}>S</button>
            <button className={classes['product-container-size']} onClick={() => { setSize('M') }}>M</button>
            <button className={classes['product-container-size']} onClick={() => { setSize('L') }}>L</button>
          </div>
        </Card>
        <Button onClick={() => addCartHendler(sigle[0])} >add to cart</Button>
      </div>}
      <br />

      {sigle[0] !== undefined && <div>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h3 style={{ padding: '0 100px' }}>Ratings & Reviews</h3>
          <div >
            <h5 style={{ background: 'green', color: 'white', borderRadius: '40px', width: 'fit-content', padding: '5px 10px' }}>4⭐</h5>
            415,035 ratings and 1,440 reviews</div>
        </span>


        <div className={classes.commentBox}>
          <input type="text" className={classes.inputComment} ref={commentRef} />
          <input id="rateing" type='number' min='1' max='5' step='1' defaultValue='1' className={classes.rateing} />
          <Button onClick={commentHandler}>comment</Button>
        </div>

        {commentList !== undefined && commentList.map((com) => (

          <div key={com._id} className={classes['comments']}>
            <div style={{ display: 'flex' }}>
              <h6 className={classes['personal-comment']}>{com.rateing}⭐</h6>
              <h6>{com.comment}💕</h6>
            </div>
            <img src={sigle[0].imageUrl} alt={sigle[0].title} style={{ width: '50px', margin: '10px' }} />
            <div>
              <span style={{ margin: '3px', fontSize: 'smaller' }}>{com.user}</span>
              <span style={{ margin: '3px', fontSize: 'smaller' }}>jan2020</span>
            </div>
            <p style={{ fontSize: '10px' }}>Certified Buyer, Bhubaneswar</p>
          </div>

        ))
        }
      </div>}
    </React.Fragment>
  )
}
