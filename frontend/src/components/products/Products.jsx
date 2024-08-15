import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const Products = ({products,setselectedp}) => {
  const navigate=useNavigate();
  return (
    <div>
      {
        products &&
        (
            <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
  {products.map((product,index) => (
    <div key={index}  className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
    <h3 className="text-lg font-semibold mb-2">{product.productName}</h3>
    <p className="text-gray-600 mb-2">Price: ${product.price}</p>
    <p className="text-gray-600 mb-2">Rating: {product.rating} ★</p>
    <p className="text-gray-600 mb-4">Discount: {product.discount}%</p>
  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={()=>{setselectedp(product);navigate(`/product/:${product.id}`)}}>View info</button>
  </div>
  
  ))}
</div>

        )
      }
    </div>
  )
}

export default Products
