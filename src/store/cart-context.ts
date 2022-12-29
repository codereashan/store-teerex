import * as React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item: any) => {},
  removeItem: (id: any) => {},
  deleteProduct: (id: any) => {},
  getItemsOnload: () => {},
});

export default CartContext;
