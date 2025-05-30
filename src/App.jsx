import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [pageDetails, setPageDetails] = useState({
    pageIndex: 1,
    pageSize: 10,
  });

  const start = (pageDetails.pageIndex - 1) * pageDetails.pageSize;

  const end = start + pageDetails.pageSize;

  const ProductCard = ({ image, title }) => {
    return (
      <div className="product-card">
        <img src={image} alt={title} className="product-img" />
        <span>{title}</span>
      </div>
    );
  };

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=500")
      .then((resp) => resp.json())
      .then((data) => {
        setProducts(data.products);
        console.log(data);
      });
  }, []);

  const handlePageChange = (pageIndex) => {
    setPageDetails((pageDetails) => ({
      ...pageDetails,
      pageIndex: pageIndex + 1,
    }));
  };

  const backwardBtn = () => {
    setPageDetails({ ...pageDetails, pageIndex: pageDetails.pageIndex - 1 });
  };

  const forwardBtn = () => {
    setPageDetails({ ...pageDetails, pageIndex: pageDetails.pageIndex + 1 });
  };

  const totalProducts = products.length;
  const noOfpages = Math.ceil(totalProducts / 10);

  return (
    <>
      <div className="app">
        <h1>Shopping Cart</h1>
        <div>
          <button disabled={pageDetails.pageIndex === 1} onClick={backwardBtn}>
            ◀️
          </button>
          {[...Array(noOfpages).keys()].map((n) => (
            <button
              onClick={() => handlePageChange(n)}
              key={n}
              className={
                "buttons" + (n === pageDetails.pageIndex - 1 ? "active" : "")
              }
            >
              {n + 1}
            </button>
          ))}
          <button disabled={pageDetails.pageIndex === 20} onClick={forwardBtn}>
            ▶️
          </button>
        </div>
        <div className="product-container">
          {products.slice(start, end).map((p) => (
            <ProductCard key={p.id} image={p.thumbnail} title={p.title} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
