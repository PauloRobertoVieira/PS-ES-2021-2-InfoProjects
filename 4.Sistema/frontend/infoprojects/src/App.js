import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './components/pages/Home'
import Projects from './components/pages/Projects'
import Contact from './components/pages/Contact'
import Company from './components/pages/Company'
import NewProject from './components/pages/NewProject'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import Container from './components/layout/Container'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Container customClass="min-height">
          <Route exact path='/'>
            <Home />
          </Route>

          <Route path='/projects'>
            <Projects />
          </Route>

          <Route path='/contact'>
            <Contact />
          </Route>

          <Route path='/company'>
            <Company />
          </Route>

          <Route path='/newproject'>
            <NewProject />
          </Route>

        </Container>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
