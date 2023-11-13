import styles from './ProductList.module.css'
import React, {useState, useEffect} from "react" //React Hook
import {Link} from "react-router-dom"
import Title from "./Title"
import QuantityBtn from './QuantityBtn'

export default function ProductList() {
    // manually input information (no use)
    // let productList = [
    //     {"id":1, "name":"apple", "price":5, "image":"apple.jpg", "description":"apple ~100g, Orgin: Japan"},
    //     {"id":2, "name":"orange", "price":3, "image":"orange.jpg", "description":"orange ~130g, Orgin: Australia"},
    //     {"id":3, "name":"mango", "price":4, "image":"mango.jpg", "description":"mango ~150g, Orgin: Thailand"},
    //     {"id":4, "name":"watermelon", "price":20, "image":"watermelon.jpg", "description":"watermelon ~2kg, Orgin: Japan"},
    //     {"id":5, "name":"blueberry", "price":10, "image":"blueberry.jpg", "description":"blueberry ~100g, Orgin: Australia"},
    //     {"id":6, "name":"grape", "price":5, "image":"grape.jpg", "description":"grape ~150g, Orgin: Japan"},
    // ]

    let [productList, setProductList] = useState([])

    //useEffect hook
    useEffect(()=>{
        //Situation 1: if without 2nd variable: will active the component for every render
        //Situation 2: if Dependency Array is empty array: only active once when the page 1st render
        //Situation 3: if Dependency Array is variable: active when 1st page render + destinated variable change
        fetch('https://raw.githubusercontent.com/el132448/react-shopping-cart/master/product-info.json')
        .then(response => response.json())
        .then(data => setProductList(data))
        console.log(productList)
    },[])

    // //button showing or hiding product list(unwanted)
    // const [showProduct, setShowProduct] = useState(false)

    return (
        //React Fragment: empty tag
        <>
            <Title mainTitle="Online Fruit Store"/>

            <div className="container">
                {
                    productList.map(product=>
                    <React.Fragment  key={product.id}>
                        <div className="containerItem">
                            <Link to={'/product/'+product.id}>
                            <img width="200px" src={process.env.PUBLIC_URL+'/img/'+product.image}></img>
                            </Link>
                            <div className="productName">
                                {product.name}  ${product.price}
                            </div>                    
                            <QuantityBtn productInfo={product} />
                        </div>
                    </React.Fragment>
                    )
                }
            </div>
        </>
    )
}
