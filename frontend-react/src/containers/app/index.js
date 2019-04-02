import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import OldHome from '../home_old'
import About from '../about'
import New from '../new'

const App = () => (
  <div>
    <header>
      Foodocracy
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/new" component={New} />
      <Route exact path="/old" component={OldHome} />

    </main>
  </div>
)

export default App
