import React, { createContext, useState } from "react";
import { Product } from "../types/Prouduct";

interface Props {
  children: React.ReactNode;
}

type AddedProductType = {
  addedProducts: Product[];
  setAddedProducts: (product: Product[]) => void;
};

const AddedProductsContext = createContext<AddedProductType>({
  addedProducts: [],
  setAddedProducts: (products: Product[]) => {},
});

const AddedProductsProvider: React.FC<Props> = ({ children }) => {
  const [addedProducts, setAddedProducts] = useState<Product[]>([]);

  const updateAddedProducts = (products: Product[]) => {
    setAddedProducts(products);
  };

  return (
    <AddedProductsContext.Provider
      value={{ addedProducts, setAddedProducts: updateAddedProducts }}
    >
      {children}
    </AddedProductsContext.Provider>
  );
};

export { AddedProductsContext, AddedProductsProvider };
