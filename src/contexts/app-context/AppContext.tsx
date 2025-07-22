"use client";

import React from "react";

// TYPES
import { ActionType, InitialState, ContextProps } from "./types";
// DATA
import { INITIAL_CART } from "./data";

const INITIAL_STATE = { cart: INITIAL_CART, isHeaderFixed: false };

// Always create the context - don't make it conditional
export const AppContext = React.createContext<ContextProps>({
  state: INITIAL_STATE,
  dispatch: () => { }
});

const reducer = (state: InitialState, action: ActionType) => {
  switch (action.type) {
    case "TOGGLE_HEADER":
      return { ...state, isHeaderFixed: action.payload };

    case "CHANGE_CART_AMOUNT":
      const cartList = state.cart;
      const cartItem = action.payload;
      const exist = cartList.find((item) => item.id === cartItem.id);

      if (cartItem.qty < 1) {
        const filteredCart = cartList.filter((item) => item.id !== cartItem.id);
        return { ...state, cart: filteredCart };
      }

      if (exist) {
        const newCart = cartList.map((item) =>
          item.id === cartItem.id ? { ...item, qty: cartItem.qty } : item
        );

        return { ...state, cart: newCart };
      }

      return { ...state, cart: [...cartList, cartItem] };

    default: {
      return state;
    }
  }
};

export function AppProvider({ children }: React.PropsWithChildren) {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
  const contextValue = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  return React.useContext(AppContext);
};