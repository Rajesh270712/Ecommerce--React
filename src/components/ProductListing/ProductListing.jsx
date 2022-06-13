import React from "react";



const ProductList = ({productData,handleDelete,showSortHTL,showSortLTH ,filterByGender}) =>{
    // console.log(showSortHTL,showSortLTH);
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
                productData
                .sort((a,b)=> showSortLTH ? a.price-b.price : false  )
                .sort((a,b)=> showSortHTL ? b.price-a.price : false  )
                .filter((product)=> filterByGender==="male" ? product.gender==="male" : filterByGender==="female" ? product.gender==="female" : true )
                .map((product)=>(
                    <tr key={product.id} >
                        <td><img  src={product.image} alt="" /></td>
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