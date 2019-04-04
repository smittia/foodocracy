import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import New from '../new'
import Vote from '../vote'
import Location from '../location'
import Favourite from '../favourite'

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
      <Route exact path="/location" component={Location} />
      <Route exact path="/favourite" component={Favourite} />

    </main>
  </div>
)

export default App
