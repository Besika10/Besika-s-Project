import logo from './logo.svg';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Header';
import Home from './screens/Home';
import ProductPageList from './screens/ProductPageList';
import ExactProduct from './screens/ExactProduct';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header />

        </header>
        <footer className='container'>
          <Switch>

            <Route path="/ExactProduct/show/:id?">
              <ExactProduct />
            </Route>
            <Route path="/ProductPageList/:page?">
              <ProductPageList />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </footer>
      </div>
    </Router>
  );
}



export default App;
