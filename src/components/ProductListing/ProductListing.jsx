import React from "react";



const ProductList = ({productData,handleDelete}) =>{
    
    return (
        <div>
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Gender</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {
                productData.map((product)=>(
                    <tr key={product.id} >
                        <td><img src={product.image} alt="" /></td>
                        <td>{product.title}</td>
                        <td>{product.gender}</td>
                        <td>₹ {product.price}</td>
                        <td>{product.category}</td>
                        <td><button onClick={()=>{handleDelete(product.id)}} >Delete</button></td>
                   </tr>
                ))
            }
            </tbody>
            </table>
        </div>
    )
}


export default ProductList;