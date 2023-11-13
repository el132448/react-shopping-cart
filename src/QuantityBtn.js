import React from 'react'
import { useState, useContext } from "react"
import { CartContext } from './CartContext'

export default function QuantityBtn({productInfo}) {

    const {cartItems, setCartItems} = useContext(CartContext)

    //check if the product is in cart
    let productIndexInCart = cartItems.findIndex((element)=>{
        return element.id === productInfo.id
    })
    //findIndex
    //if the product is found in cart => return array/index position, i.e. 0,1,2...
    //if the product is not found in cart => return -1

    //if product is in cart (>-1): read the quantity
    let [numInCart,setNumInCart] = useState(
        (productIndexInCart === -1) ? 0 : cartItems[productIndexInCart].quantity
    )

    const handleAdd = ()=>{
        if(productIndexInCart===-1)
        {
            //not in cart: add new element(object) in the cartItems array
            setCartItems(
                [{
                id : productInfo.id,
                name : productInfo.name,
                image : productInfo.image,
                price : productInfo.price,
                description : productInfo.description,
                quantity: 1
                },
                ...cartItems] //addition to the cartItems
            )
        }else{
            //in cart: add(update) quantity only
            let newCartArray = [...cartItems] //[...cartItems] means original array
            newCartArray[productIndexInCart].quantity++ //quantity +1
            setCartItems(newCartArray) //update by using setCartItems
        }
        setNumInCart(numInCart+1)
    }

    const handleSubtract = ()=>{

        if(cartItems[productIndexInCart].quantity===1)
        {
            //if only 1 remains: remove object
            let newCartArray = [...cartItems]
            newCartArray.splice(productIndexInCart,1) //splice拼接
            setCartItems(newCartArray)
        }
        else
        {
            //if more than one: minus quantity
            let newCartArray = [...cartItems]
            newCartArray[productIndexInCart].quantity--
            setCartItems(newCartArray)
        }

        setNumInCart(numInCart-1)
    }

    return (
    <div className='addToCart'>
        {
            (numInCart === 0) ?
            <div className="addToCartBtn" onClick={handleAdd}>Add to Cart</div>:
            <div>
                <span className="subtractBtn" onClick={handleSubtract}>-</span>
                {numInCart}
                <span className="addBtn" onClick={handleAdd}>+</span>
            </div>
        }
        
    </div>
  )
}
