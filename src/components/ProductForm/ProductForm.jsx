import React from "react";
import ProductList from "../ProductListing/ProductListing";

const ProductForm = () => {
  const [formData, setFormData] = React.useState({
    title: "",
    gender: "",
    price: "",
    category: "",
    image: "https://picsum.photos/200",
  });
  const { title, price, category, gender } = formData;
  const imgRef = React.useRef();
  const [loading, setLoading] = React.useState(false);
  const [Error, setError] = React.useState(false);
  const [productData, setProductData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalProducts, setTotalProducts] = React.useState(0);
  const [showSortHTL, setShowSortHTL] = React.useState(false);
  const [showSortLTH, setShowSortLTH] = React.useState(false);
  const [filterByGender, setFilterByGender] = React.useState(false);
  let filterGender = React.useRef();
  React.useEffect(() => {
    getData();
  }, [page, showSortLTH, showSortHTL]);

  if (loading) {
    return <h3>...Loading</h3>;
  }
  if (Error) {
    return <h3>Error... Something Went Wrong</h3>;
  }
  const handleSubmitForm = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`http://localhost:3000/products`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "Application/json",
      },
    })
      .then(() => {
        getData();
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getData = () => {
    fetch(`http://localhost:3000/products?_page=${page}&_limit=5`)
      .then((data) => {
        let totalItems = data.headers.get("X-Total-Count");
        setTotalProducts(totalItems);
        return data.json();
      })
      .then((data) => setProductData(data));
  };

  function handleDelete(id) {
    setLoading(true);
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "Application/json",
      },
    })
      .then(() => {
        getData();
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleFilter = (e) => {
    setFilterByGender(e.target.value);
    getData();
  };

  return (
    <>
      <div>
        <h1
          style={{
            textAlign: "center",
            color: "blue",
            fontSize: "40px",
            fontFamily: "cursive",
          }}
        >
          Cloth Shop
        </h1>
      </div>
      <div
        style={{
          border: " thick double #32a1ce",
          width: "33%",
          margin: "auto",
        }}
      >
        <h2
          style={{ textAlign: "center", marginBottom: "-25px", color: "blue" }}
        >
          Add Product
        </h2>

        <form
          onSubmit={() => {
            handleFormSubmit(encodeURI);
          }}
        >
          <input
            type="text"
            placeholder="Enter Title "
            name="title"
            value={title}
            onChange={handleSubmitForm}
          />
          <br />
          <label htmlFor="">
            Gender :
            <select name="gender" value={gender} onChange={handleSubmitForm}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <br />
          <input
            type="number"
            placeholder="Enter Price "
            name="price"
            value={price}
            onChange={handleSubmitForm}
          />
          <br />
          <input
            type="text"
            placeholder="Enter Category "
            name="category"
            value={category}
            onChange={handleSubmitForm}
          />
          <br />
          <input type="file" ref={imgRef} />
          <br />
          <input type="Submit" onClick={handleFormSubmit} />
        </form>
      </div>
      <div
        style={{ margin:"20px", textAlign: "center", color: "blue", fontFamily: "cursive" }}
      >
        <label>
          Sort
          <button
            onClick={() => {
              setShowSortLTH(!showSortLTH);
            }}
          >
            Low To High{" "}
          </button>
          <button
            onClick={() => {
              setShowSortHTL(!showSortHTL);
            }}
          >
            High To Low{" "}
          </button>
        </label>
            {"  "}
        <label>
          Filter
          <select onChange={handleFilter} ref={filterGender}>
            <option value="male"> Male</option>
            <option value="female"> Female </option>
          </select>
        </label>
      </div>
      <ProductList
        productData={productData}
        handleDelete={handleDelete}
        showSortHTL={showSortHTL}
        showSortLTH={showSortLTH}
        filterByGender={filterByGender}
      />
      <div  style={{ margin:"20px", textAlign: "center", color: "blue", fontFamily: "cursive" }} >

      <button
        disabled={page === 1}
        onClick={() => {
            setPage(page - 1);
        }}
        >
        Previous
      </button>
      {"  "}
      <label>{page}</label>
      {"  "}
      <button
        disabled={page === Math.ceil(totalProducts / 5)}
        onClick={() => {
            setPage(page + 1);
        }}
        >
        Next
      </button>
          </div>
    </>
  );
};

export default ProductForm;
