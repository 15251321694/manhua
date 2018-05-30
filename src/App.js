import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
// import { Icon } from 'antd';
import Home from "./components/Home";
import Category from "./components/Category";
import Search from "./components/Search";
import Pay from "./components/Pay";
import Update from "./components/Update";
import Booking from "./components/Booking";
import Book from "./components/Book";
import Recommend from "./components/Recommend";
// import List from "./components/List";
import Searchindex from './components/Searchindex';
import Searchtext from './components/Searchtext';
import Searchimg from './components/Searchimg'
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* <div>
            <Link to='/home'>发现漫画</Link>
          </div> */}
          <Route path='/' exact component={Home}></Route>
          <Route path='/category' component={Category}></Route>
          <Route path='/search' component={Search}></Route>
          <Route path='/pay' component={Pay}></Route>
          <Route path='/update' component={Update}></Route>
          <Route path='/Booking' component={Booking}></Route>
          <Route path='/Book/:id' component={Book}></Route>
          <Route path='/Recommend' component={Recommend}></Route>
          {/* <Route path='/List' component={List}></Route> */}
          <Route path='/searchindex' component={Searchindex}></Route>
          <Route path='/searchtext' component={Searchtext}></Route>
          <Route path='/searchimg' component={Searchimg}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
