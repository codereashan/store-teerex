import { useReducer } from "react";
import CartContext from "./cart-context";

const initialCartState = {
  items: [] as any,
  totalAmount: 0,
};

const cartReducer = (state: any, action: any): any => {
  if (action.type === "ADD") {
    const existingCartItemIndex = state.items.findIndex(
      (item: any) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.item.quantity,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.quantity;
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item: any) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;

    if (existingCartItem.quantity === 1) {
      updatedItems = state.items.filter((item: any) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "DELETE") {
    const existingCartItemIndex = state.items.findIndex(
      (item: any) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;
    if (existingCartItem) {
      updatedItems = state.items.filter((item: any) => item.id !== action.id);
    }
    const updatedTotalAmount =
      state.totalAmount - existingCartItem.price * existingCartItem.quantity;
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "ONLOAD") {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      let loadedItems = JSON.parse(cartItems);
      let updatedAmount: number = 0;
      loadedItems.map((item: any) => {
        updatedAmount = updatedAmount + item.price * item.quantity;
        return updatedAmount;
      });

      return {
        items: loadedItems,
        totalAmount: updatedAmount,
      };
    }
  }

  return initialCartState;
};

const CartProvider = ({ children }: any) => {
  const [cartState, dispatchAction] = useReducer(cartReducer, initialCartState);

  const addItemToCartHandler = (item: any) => {
    dispatchAction({ type: "ADD", item: item });
  };
  const removeItemToCartHandler = (id: any) => {
    dispatchAction({ type: "REMOVE", id: id });
  };
  const deleteProductItemHandler = (id: any) => {
    dispatchAction({ type: "DELETE", id: id });
  };
  const getItemsOnloadCartHandler = () => {
    dispatchAction({ type: "ONLOAD" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    deleteProduct: deleteProductItemHandler,
    getItemsOnload: getItemsOnloadCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
