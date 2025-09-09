# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

-Syntax
npm create vite @latest [in CRA, npx create-react-app appname] <!--insted of @latest we can use specific version also -->

- vite is a **modern front end build tool**
- designed to make web development faster & efficient compared to old bundlers
  like webpack, parcel or gulp
- uses **native ES modules** in the browser for development

- no need for bundling the whole app before serving (instant startup)

  - When you run npm start in Create React App (CRA), Webpack **bundles your entire app first**.
  - It takes all your JS/TS/CSS files, processes them, and outputs a single (or few) big files.
  - Only **after bundling is complete**, it starts the dev server.
  - For large apps, this takes time → slow startup.
  - But in vite approach,
    - Starts the server immediately (no bundling).
    - When the browser requests main.jsx, Vite serves it as-is (with a little transformation if needed, e.g., JSX → JS).
    - If main.jsx imports App.jsx, the browser then requests only that file.
    - Each file is processed on-demand (just-in-time).

- changes apply super quickly (HMR- Hot Module Replacement)
- use **Rollup** under the hood to create highly optimized app
  - Rollup is a Javascript module bundler [like webpack]
  - ie it takes all javascript (& other assets) and bundles them into a form that
    browser can understand efficiently
- tree shaking friendly ie only imports the parts in use

# ECM - ECMA Script Modules

    - official & standard way to organize & reuse javascript code
    - introduced in ES6 (2015)
    - instead of throwing everything into a single giant script, we can split code
      into modules and use by *import/export*
    - because the browser itself understands import & exports without any bundler
    - Before browsers supports ESM, we had to relay on,
        - CommonJS in nodeJS (require() & module.exports)
        - Bundlers (like webpack) to convert code into something that browser can understand

# How it works with vite

    - Browser loads index.html.
    - main.jsx mounts your React app to <div id="root"></div>.
    - App.jsx renders your UI

# Configure ESlint if not exist if react app (install the below packages)

- npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev
- add .eslintrc.json file, with "extends": "react-app"
- import eslint into vite.config.js

# Routing

- With routing we can match **different URLs** to **different UI Views**(react components) - routes
- enables user to navigate between different screens using url
- keeps the UI in sync with browser url
- allows to build SPA, single page application

# SPA

- application that executes entirely on the client side ie browsers
- different urls corresponds to different views - **Routes**
- page will never reloads
- additional data might be loaded from Web API

# Implement Routing

- install necessary packages
  npm i react-router-dom
- in pages folder [within src/] add different forms
- in app.jsx configure the pages as below
  import { BrowserRouter, Route, Routes } from "react-router-dom";
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<DefaultForm />} /> --default
  <Route path="/namedform" element={<NamedForm />} /> --specific page
  <Route path="\*" element={<NotFound />} /> --for no match
  </Routes>
  </BrowserRouter>

# Link & NavLink

- Link
  - used for navigate to another route
  - work like <a>
  - no styling or extra prop like 'active'
- NavLink
  - same as **Link**, but it allows to know the link is active,
    ie matches the current url
  - based on that, we can style the active link

# Nested Routes

We can add nested routes as shown below for getting details from the
given url
localhost:34/namedform/namedform-a

By specifying the 'index', we can directly load the nested route when calling the parent

These nested routes content can be shown within <Outlet /> component

- <Route path="/namedform" element={<NamedForm />} >
  <Route index element={<NamedForm-Default>}>
  <Route path="namedform-a" element={<NamedForm-A>}>
  <Route path="namedform-b" element={<NamedForm-B>}>
  </Route>

# useParams

- used to retrieve data from the url
- syntax used to pass data should have /:variableName
  <Route path="/namedform/:id" element={<NamedForm />} >
- retrive data using useParams() hook
  const {id}= useParams();

  # navigate

  - it works only in a component rendered within a <BrowserRouter> or <Router>
  - Syntax & usages

  - import {useNavigate} from 'react-router-dom';
  - const navigate= useNavigate();
  - 1. Navigation by Path
    - <button onClick={() => navigate("form")}>back</button>
  - 2. Navigation by history steps [forward/backward]
    - navigate (levels)
    - eg; <Button
      type="back"
      onClick={(e) => {
      e.preventDefault();
      navigate(-1);
      }} >

- 3. By replacing history
  - <Route index element={<Navigate to="cities" replace />} />

# CONTEXT API

- is a way to **share state/data globally** across components without prop drilling
  ie passing props down to many levels
  eg: authentication, settings, theme, language apply
  -Steps
  1. Create Context
     import {createContext} from "react"
     const MyContext = createContext();
  2. Provide Context (wrap parent)
     <MyContext.Provider value={/_data_/}>
     <App>
     </MyContext.Provider>
  3. Consume Context
     using useContext
     import {useContext} from "react";
     const value = useContext(MyContext);

# CONTEXT API + useReducer

- context API -> make state accessible globally
- useReducer -> manage complex state updates in a predictable way
- By combining these we can implement a **Centralized global state management**
- steps

  1. Create Context
     import {createContext, useReducer} from "react";
     const AuthContext = createContext();
  2. Define Reducer
     const initialState={isAuthenticated:false, user:null};
     function AuthReducer(state, action){
     switch (action.type) {
     case "Login":
     return {...state, isAuthenticated: true, user: action.payload};
     case "Logout":
     return {...state, isAuthenticated: false, user: null};
     default:
     return state;
     }
     }
  3. Provide Context
     export function AuthProvider({children}){
     const [state, dispatch]= useReducer(authReducer, initialState);
     return (
     <AuthContext.Provider value={{state, dispatch}}>
     {children}
     </AuthContext.Provider>
     );
     }
  4. Consume Context
     import { useContext } from "react";
     import { AuthContext } from "./AuthContext";

     function Profile() {
     const { state, dispatch } = useContext(AuthContext);

     return (

        <div>
        {state.isAuthenticated ? (
        <>
        <p>Welcome, {state.user.name}</p>
        <button onClick={() => dispatch({ type: "LOGOUT" })}>
        Logout
        </button>
        </>
        ) : (
        <button
        onClick={() =>
        dispatch({
        type: "LOGIN",
        payload: { name: "Jack", email: "jack@example.com" },
        })
        } >
        Login
        </button>
        )}
        </div>
        );
        }

# Apply CSS Styles

- global styles are added in src folder and then import to Main.jsx
- localized styles are added along with component like component.module.css
- then import in selected component and use like props
- to apply an external css style we should add that in :global()
  eg: to add an active class which is applied a component style :global(.active)

  ### Edit vs code user settings

  - command pallette - ctrl + shift + p
    -type, Open User Settings (JSON) → opens your global settings.
    -type, Open Workspace Settings (JSON) → opens settings specific to the current project.
