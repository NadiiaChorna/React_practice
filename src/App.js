import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar'; 
import { Alert } from './components/Alert';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container pt-4">
        <Alert />
        <Switch>
          <Route exact  path='/' component={Home} />
          <Route path='/about' component={About} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
