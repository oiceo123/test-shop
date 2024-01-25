import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import ProductSearch from "../pages/ProductSearch";
import ProductCategory from "../pages/ProductCategory";
import ProductAdd from "../pages/ProductAdd";
import ProductEdit from "../pages/ProductEdit";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/products/category/:category" exact>
        <ProductCategory />
      </Route>
      <Route path="/products/edit/:id" exact>
        <ProductEdit />
      </Route>
      <Route path="/products/search" exact>
        <ProductSearch />
      </Route>
      <Route path="/products/add" exact>
        <ProductAdd />
      </Route>
      <Route path="/products/:id" exact>
        <ProductDetail />
      </Route>
      <Route path="/" exact>
        <Home />
      </Route>
    </Switch>
  );
};

export default Router;
