// Framework
import React from "react";
import { Link } from "react-router-dom";
const LoginButtons = BlazeToReact('loginButtons');


const Header = ({ children, goBack, cart, itemsAdded }) =>
  <header>
    <button onClick={goBack} className="back-button">
      {/* Image added here to show image inclusion, prefer inline-SVG. */}
      <img alt="Back" src={`/icon/header/back-white.svg`} />
    </button>
    <div className="bonsai-button signIn">
    <LoginButtons />
    </div>
    <h1>
      {children}
    </h1>

    <div className="right-content">
      {cart &&
        <Link to="/checkout" replace>
          <div className="counter">
            {itemsAdded}
          </div>
          <img src={`/images/cart.jpg`} alt="cart" style={{ width: "50px" }} />
        </Link>}
    </div>
  </header>;

export default Header;
