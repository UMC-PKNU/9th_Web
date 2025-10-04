import './App.css'
import {About} from './pages/About'
import {Whois} from './pages/Whois'
import {Home} from './pages/Home'
import {Header} from './components/Header'
import {Routes} from './components/routes'
import {Route} from './components/Route'
import React from 'react';


const NotFound = () => <h1>NotFound</h1>


function App() { 
  return (
    <>
      <Header/>
      <Routes>
        <Route path= '/Home' component={Home}></Route>
        <Route path= '/About' component={About}></Route>
        <Route path= '/Whois' component={Whois}></Route>
      </Routes>
    </>
  );
}

export default App
