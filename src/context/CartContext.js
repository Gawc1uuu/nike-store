import { createContext, useReducer } from "react";
import { ToastContainer, toast } from "react-toastify";

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: state.items.concat(action.payloadItem).sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          } else return false;
        }),
      };
    case "ADD_ITEM_REPEAT":
      return {
        ...state,
      };
    case "OPEN_CART":
      return {
        ...state,
        isOpen: action.payloadIsOpen,
      };
    case "CLOSE_CART":
      return {
        ...state,
        isOpen: action.payloadIsOpen,
      };
    case "DELETE":
      return {
        ...state,
        items: action.payloadItems,
      };
    case "ON_PLUS":
      return {
        ...state,
        items: action.payloadItems.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          } else return false;
        }),
      };
    case "ON_MINUS":
      return {
        ...state,
        items: action.payloadItems.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          } else return false;
        }),
      };
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const notifyAdd = () =>
    toast.success("Added to the cart", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notifyAddRepeat = () =>
    toast.info("Item already in the cart!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notifyDelete = () =>
    toast.error("Deleted from the cart", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  const addToCart = (addedItem) => {
    addedItem.qty = 1;
    if (!state.items.find((item) => item.id === addedItem.id)) {
      dispatch({
        type: "ADD_ITEM",
        payloadItem: [addedItem],
      });
      notifyAdd();
    } else {
      dispatch({
        type: "ADD_ITEM_REPEAT",
      });
      notifyAddRepeat();
    }
  };

  const openCart = () => {
    dispatch({ type: "OPEN_CART", ...state, payloadIsOpen: true });
  };
  const closeCart = () => {
    dispatch({ type: "CLOSE_CART", ...state, payloadIsOpen: false });
  };

  const deleteItem = (deletedItem) => {
    deletedItem.qty = 0;
    dispatch({
      type: "DELETE",
      payloadItems: state.items.filter((item) => {
        if (item.id !== deletedItem.id) {
          return item;
        } else return false;
      }),
      payloadAmount: deletedItem.retailPrice,
      ...state,
    });
    notifyDelete();
  };

  const onInc = (id) => {
    let item = state.items.find((item) => item.id === id);
    item.qty = item.qty + 1;
    const newArr = state.items.filter((item) => {
      if (item.id !== id) {
        return item;
      } else return false;
    });
    dispatch({
      type: "ON_PLUS",
      payloadItems: [item, ...newArr],
    });
  };
  const onDec = (id) => {
    let item = state.items.find((item) => item.id === id);
    item.qty = item.qty - 1;
    const newArr = state.items.filter((item) => {
      if (item.id !== id) {
        return item;
      } else return false;
    });
    dispatch({
      type: "ON_MINUS",
      payloadItems: [item, ...newArr],
    });
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        state,
        closeCart,
        openCart,
        deleteItem,
        onInc,
        onDec,
        ToastContainer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
