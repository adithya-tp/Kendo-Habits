import './App.css';
import '@progress/kendo-theme-material/dist/all.css';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

function App() {

  return (
    <div className="app">
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/register" component={Register} />
      </Router>
    </div>
  );
}

export default App;
