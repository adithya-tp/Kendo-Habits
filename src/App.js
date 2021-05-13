import '@progress/kendo-theme-material/dist/all.css';

import Home from './components/Home/Home';
import { Route, Switch, useLocation } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import { AnimatePresence } from "framer-motion";
import DailyHabits from './components/DailyHabits/DailyHabits';
import GardenPage from './components/GardenPage/GardenPage';
import Streaks from './components/Streaks/Streaks';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';
import SideBar from './components/SideBar/SideBar';

function App() {
  const location = useLocation();
  const homeVariants = {
    exit: {
      y: "-100vh",
      transition: {ease: 'easeInOut'}
    }
  }

  return (
    <AuthProvider>
      <div className="App">
          <AnimatePresence>
            <Switch location={location} key={location.key}>
              <Route
                variants={homeVariants}
                exit="exit"
                exact path="/" component={Home}
              />
              <Route path="/login" component={SignIn} />
              <Route path="/register" component={Register} />
              <SideBar>
                <Route path="/user" component={DailyHabits} />
                <Route path="/habit-streak" component={Streaks} />
                <Route path="/garden" component={GardenPage} />
              </SideBar>
            </Switch>
          </AnimatePresence>
      </div>
    </AuthProvider>
  );
}

export default App;
