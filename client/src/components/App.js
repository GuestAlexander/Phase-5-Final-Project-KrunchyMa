import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppContext from '../context/AppContext';
import useAppData from '../hooks/useAppData';
import Navbar from './Navbar';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import UserProfile from './UserProfile';
import ArticleList from './ArticleList';
import ArticleView from './ArticleView';
import ArticleEdit from './ArticleEdit';
import CategoryList from './CategoryList';
// some-module.js






function App() {
  const appData = useAppData();

  return (
    <div className="App">
      <AppContext.Provider value={appData}>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/articles" exact component={ArticleList} />
          <Route path="/articles/:id" exact component={ArticleView} />
          <Route path="/articles/:id/edit" component={ArticleEdit} />
          <Route path="/categories" component={CategoryList} />
        </Switch>
      </AppContext.Provider>
    </div>
  );
}

export default App;
