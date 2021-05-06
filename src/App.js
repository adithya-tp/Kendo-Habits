import './App.css';
import '@progress/kendo-theme-material/dist/all.css';
import Home from './components/Home/Home';
import { Route, Switch, useLocation } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import { AnimatePresence } from "framer-motion";
import DailyHabits from './components/DailyHabits/DailyHabits';

function App() {
  const location = useLocation();
  const homeVariants = {
    exit: {
      y: "-100vh",
      transition: {ease: 'easeInOut'}
    }
  }

  return (
    <div className="App">
        <AnimatePresence>
          <Switch location={location} key={location.key}>
            <Route
              variants={homeVariants}
              exit="exit"
              exact path="/" component={Home} 
            />
            <Route path="/signIn" component={SignIn} />
            <Route path="/register" component={Register} />
            <Route path="/user" component={DailyHabits} />
          </Switch>
        </AnimatePresence>
    </div>
  );
}

export default App;
