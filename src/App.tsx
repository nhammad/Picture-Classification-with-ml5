import React from 'react';
import {Route , Switch, BrowserRouter} from 'react-router-dom';
import PanelHomePage from './pages/panelHomepage/PanelHomepage';
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <div>
      <BrowserRouter>
    <Switch>
    <Route exact path='/' component= {PanelHomePage}></Route>
    <Route exact path='/contact' component= {ContactPage}></Route>
    </Switch>
    </BrowserRouter>
  </div>
  );
}

export default App;
