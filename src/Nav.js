import React, {useState, useEffect} from 'react'
import './Nav.css';

function Nav() {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        })
        return () => {
            window.removeEventListener("scroll");
        }
    }, [])
    // show only when if) the nav bar in black color when you scroll down 

    return (
        <div>
            <div className={`nav ${show && "nav__black"}`}>
                <img
                    className="nav__logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
                    alt="Netflix Logo"
                />
                <img
                    className="nav__avatar"
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                    alt="Netflix avatar Logo"
                    />
            </div>
        </div>
    )
}

export default Nav
