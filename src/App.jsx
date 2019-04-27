import React, { Component} from "react";
import "./App.css";
import "../node_modules/papercss/dist/paper.min.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/@fortawesome/fontawesome-free/js/all.min.js";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./components/pages/home"
import About from "./components/pages/about"
import Contact from "./components/pages/contact"
import Epk from "./components/pages/epk"
import Music from "./components/pages/music"
import Shows from "./components/pages/shows"
import Thankyou from "./components/pages/thankyou"

import Navbar from "./components/navbar"

class App extends Component{
    render(){
        return(
            <div className="App">
                <Router>
                    <Navbar/>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/music" component={Music} />
                    <Route path="/shows" component={Shows} />
                    <Route path="/epk" component={Epk} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/thankyou" component={Thankyou} />
                    <footer className="row flex-center">
                        <div className="sm-8 col">
                            <img className={"footer-logo"} src="logo.png" alt=""/>
                            <Link to={"/"}><h4 className={"footer-band-name"}>Well Mannered Wolf</h4></Link>
                            <p>Website by Russell (The Bassist)</p>
                        </div>
                    </footer>
                </Router>
            </div>
    );
    }
}

export default App;
