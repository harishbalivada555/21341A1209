import React, { Fragment, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Filters from './components/Filters/Filters';
import Products from './components/products/Products';
import Productcard from './components/Productcard/Productcard';

function App() {
  const [company, setCompany] = useState("AMZ");
  const [category, setCategory] = useState("PC");
  const [pages, setPages] = useState(10);
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [order, setOrder] = useState("desc");
  const [type, setType] = useState("price");

  const [products, setproducts] = useState(null);
  const [selectedp, setselectedp] = useState(null);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Fragment>
                <Navbar />
                <Filters
                  company={company}
                  setCompany={setCompany}
                  category={category}
                  setCategory={setCategory}
                  pages={pages}
                  setPages={setPages}
                  minPrice={minPrice}
                  setMinPrice={setMinPrice}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  order={order}
                  setOrder={setOrder}
                  type={type}
                  setType={setType}
                  setproducts={setproducts}
                />
                <Products products={products} setselectedp={setselectedp} />
              </Fragment>
            }
          />
          <Route
            path="/product/:id"
            element={<Productcard selectedp={selectedp} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
