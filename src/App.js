import './App.css';
import '@progress/kendo-theme-material/dist/all.css';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import { AnimatePresence } from "framer-motion";

function App() {

  return (
    <div className="app">
      <Router>
        <AnimatePresence>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signIn" component={SignIn} />
            <Route path="/register" component={Register} />
          </Switch>
        </AnimatePresence>
      </Router>
    </div>
  );
}

export default App;
