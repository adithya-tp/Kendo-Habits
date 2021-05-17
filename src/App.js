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
import VizPage from './components/VizPage/VizPage';
import { useEffect, useState } from 'react';
import { db } from './firebase';

function App() {
  const location = useLocation();
  const [allLabels, setAllLabels] = useState([]);
  const homeVariants = {
    exit: {
      y: "-100vh",
      transition: {ease: 'easeInOut'}
    }
  }

  useEffect(() => {
    db.collection('allLabels')
      .onSnapshot(snapshot => {
          setAllLabels(
              [...snapshot.docs.map(
                  doc => doc.data().labels
              )]
          );
      })
  }, []);

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
              <Route exact path="/login" component={SignIn} />
              <Route exact path="/register" component={Register} />
              <SideBar>
                <Route exact path="/user" component={DailyHabits} />
                <Route exact path="/habit-streak" component={() => <Streaks allLabels={allLabels} />} />
                <Route exact path="/visualizations" component={VizPage} />
                <Route exact path="/garden" component={GardenPage} />
              </SideBar>
            </Switch>
          </AnimatePresence>
      </div>
    </AuthProvider>
  );
}

export default App;
