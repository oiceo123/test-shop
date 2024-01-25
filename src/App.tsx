import Router from "./routes";
import Navbar from "./components/Navbar/Navbar";
import "./App.scss";

import { AddedProductsProvider } from "./context/AddedProductsContext.tsx";

function App() {
  return (
    <AddedProductsProvider>
      <Navbar />
      <Router />
    </AddedProductsProvider>
  );
}

export default App;
