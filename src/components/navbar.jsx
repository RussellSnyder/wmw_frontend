import React, { Component} from "react";
import { Link } from "react-router-dom";
import Shows from "./pages/shows";

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.buttonRef = React.createRef();
        this.state = {
            checked: false
        }
    }

    setMenuState(bool) {
        this.setState({ checked: bool})
    }

    render() {
        let {checked} = this.state;

        return <nav className="fixed split-nav">
            <div className="nav-brand">
                <h3><Link to="/">Well Mannered Wolf</Link></h3>
            </div>
            <div className="collapsible">
                <input id="collapsible1" type="checkbox" name="collapsible1"
                       onClick={() => this.setMenuState(!checked)}
                       checked={checked && "checked"}/>
                <button>
                    <label htmlFor="collapsible1">
                        <div className="bar1"/>
                        <div className="bar2"/>
                        <div className="bar3"/>
                    </label>
                </button>
                <div className="collapsible-body">
                    <ul className="inline">
                        <li onClick={() => this.setMenuState(false)}><Link to="/about">About</Link></li>
                        <li onClick={() => this.setMenuState(false)}><Link to="/music">Music</Link></li>
                        <li onClick={() => this.setMenuState(false)}><Link to="/shows">Shows</Link></li>
                        <li onClick={() => this.setMenuState(false)}><Link to="/epk">EPK</Link></li>
                        <li onClick={() => this.setMenuState(false)}><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    }
}

export default Navbar;
