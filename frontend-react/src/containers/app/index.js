import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import New from '../new'
import Vote from '../vote'

const App = () => (
  <div>
    <header>
      Foodocracy
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/new" component={New} />
      <Route exact path="/vote" component={Vote} />

    </main>
  </div>
)

export default App
