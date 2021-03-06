import React from "react";
import Store from "../../context/store";
import { fetchProduct, deleteProduct } from "../../actions";
import Navbar from "../base/Navbar";
import AdminEditProduct from "./AdminEditProduct";

export default function AdminShowProduct({ history }) {
  const { products, dispatch } = React.useContext(Store);
  const [editProduct, setEditProduct] = React.useState(false);
  let id = history.location.pathname.slice(16);

  React.useEffect(() => {
    if (products === null || !products[id]) {
      fetchProduct(dispatch, id);
    }
  }, [dispatch, id]);

  function handleDeleteProduct() {
    let promptValue = prompt("Please type 'yes' in order to delete product");
    if (promptValue === "yes") {
      deleteProduct(dispatch, id, history);
    }
  }
  function renderProduct() {
    if (products !== null) {
      let product = products[id];
      if (product) {
        if (!editProduct) {
          return (
            <div className="editblock-container">
              <div className="eb-left">
                <img
                  alt={`${product.name}`}
                  src={`/uploads/products/${product.image}/${product.image}`}
                />
                <h4>{product.name}</h4>
                <button
                  className="btn-primary btn-edit"
                  onClick={() => setEditProduct(!editProduct)}
                >
                  Edit
                </button>
                <button
                  className="btn-primary btn-danger"
                  onClick={handleDeleteProduct}
                >
                  Delete Product
                </button>
              </div>
              <div className="eb-right">
                <p>
                  Name: <span>{product.name}</span>
                </p>
                <p>
                  Type: <span>{product.type}</span>
                </p>
                <p>
                  Price: <span>{product.price}</span>
                </p>
                <p>
                  Amount: <span>{product.amount}</span>
                </p>
                <p>
                  description : <span>{product.description}</span>
                </p>
              </div>
            </div>
          );
        } else {
          return (
            <AdminEditProduct
              setEditProduct={setEditProduct}
              editProduct={editProduct}
              product={product}
              history={history}
              handleDeleteProduct={handleDeleteProduct}
            />
          );
        }
      }
    } else {
      return <div>Loading</div>;
    }
  }
  return (
    <div className="editblock">
      <header>
        <Navbar />
      </header>
      {renderProduct()}
    </div>
  );
}
