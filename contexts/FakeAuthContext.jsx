import { createContext, useReducer } from "react";

// Step- 1
const FakeContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

// Step 6 - declare initial state
const initialState = {
  isAuthenticated: false,
  user: null,
};

// Step 7 - define reducer function
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "logout":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case "error":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return new Error("Unknown action type");
  }
}
// Step- 2
function FakeAuthProvider({ children }) {
  // Step 5 - define reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  function login(username, password) {
    if (username === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      dispatch({ type: "error", payload: "Invalid credentials" });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }
  // step-8 add defined fields in the value object
  return (
    <FakeContext.Provider value={{ ...state, login, logout }}>
      {children}
    </FakeContext.Provider>
  );
}

// Step- 3
// function useFakeAuth() {
//   const context = useContext(FakeContext);
//   if (!context) {
//     throw new Error("useFakeAuth must be used within a FakeAuthProvider");
//   }
//   return context;
// }

// Step- 4
export { FakeAuthProvider, FakeContext };
