import React, { useContext } from 'react'
import Title from "./Title"
import {Link} from 'react-router-dom'
import QuantityBtn from './QuantityBtn'
import { CartContext } from './CartContext'

export default function Checkout() {

  let {cartItems} = useContext(CartContext)
  let cartEmpty = cartItems.length <= 0 ? true : false

  let grandTotal = cartItems.reduce((total, product)=>{
    return total += product.price*product.quantity
  },0)
  const freeShippingPrice = 100

  return (
    <>
      <Title mainTitle="Your Cart"/>
      {
        cartEmpty &&
        <div className="nothingInCart">
          Nothing in cart<br/><br/>
            <Link className="backToGoodsListBtn" to="/">Back to Homepage</Link>
        </div>
      }

      {
        !cartEmpty &&
        <div className="container">
          <div id="cartSection">
            <table className="checkoutTable">
              <tbody>
                {
                  /* product list */
                  cartItems.map(product=>(
                    <tr key={product.id}>
                      <td>
                        <Link to={'/product/'+product.id}>
                          <img src={process.env.PUBLIC_URL+'/img/'+product.image} alt={product.name}/>
                        </Link>
                      </td>
                      <td>
                        <p>Name : {product.name}</p>
                        <p>Price : ${product.price}</p>
                        <p>{product.description}</p>
                      </td>
                      <td width="200">
                        <QuantityBtn productInfo={product} />
                      </td>
                      <td>
                        <div className="productSubTotal">
                            ${product.price*product.quantity}
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          <div className="checkoutSection">
            <div>Order total</div>
            <div className="grandTotal">${grandTotal}</div>
            {
              // price sum + free delivery
              grandTotal >= freeShippingPrice ?
              <div className="freeShipping">Free Shipping for ≥${freeShippingPrice}!</div> :
              <div className="noShipping">Free shpping for ≥${freeShippingPrice}
              <br/>
              ${freeShippingPrice-grandTotal} remains</div>
            }
            <button onClick={handleCheckout}>Place your order</button>
          </div>
        </div>
      }
    </>
  )

  function handleCheckout() {
    fetch("http://localhost:5000/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cartItems)
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("Checkout success:", data);
      alert("Order placed successfully!");
      // 這裡可以加清除購物車等後續處理
    })
    .catch((err) => {
      console.error("Checkout error:", err);
      alert("Something went wrong. Please try again.");
    });
  }
}
