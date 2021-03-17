import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Pages/Home'
import Stock from './Pages/Stock'
import Compare from './Pages/Compare'
import Categories from './Pages/Categories'
import Popular from './Pages/Popular'

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/stock">Stock</Link>
            </li>
            <li>
              <Link to="/compare">Compare</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/popular">Popular Investors</Link>
            </li>
            
          </ul>
        </nav>
        <Switch>
        
          <Route path="/stock">
            <Stock />
          </Route>
          <Route path="/compare">
            <Compare />
          </Route>
          <Route path="/categories">
            <Categories />
          </Route>
          <Route path="/popular">
            <Popular />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
