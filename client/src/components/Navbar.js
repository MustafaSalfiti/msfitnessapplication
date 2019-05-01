import React from "react";
import { UserContext } from "../context/UserContext";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const { user } = React.useContext(UserContext);

  function renderNanlinks() {
    if (user) {
      if (user.type === "admin") {
        return (
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>
            <li id="hoverli">
              <a href="#">Admin</a>
              <ul>
                <li>
                  <NavLink to="/members">Control Members</NavLink>
                </li>

                <li>
                  <NavLink to="/admin/products">Control Products</NavLink>
                </li>

                <li>
                  <NavLink to="/" onClick={user.logoutUser}>Logout</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        );
      } else {
        return (
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/contactus">Contact us</NavLink>
            </li>
            <li>
              <NavLink to={`/${user.username}`}>My Profile</NavLink>
            </li>

            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>

            <li>
              <NavLink to="/" onClick={user.logoutUser}>Logout</NavLink>
            </li>
          </ul>
        );
      }
    } else {
      return (
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/contactus">Contact us</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      );
    }
  }

  return (
    <nav>
      <div className="row">
        <div className="nav-logo">
          <a className="btn" href="#">
            MS Fitness
          </a>
        </div>
        <div className="nav-links">{renderNanlinks()}</div>
      </div>
    </nav>
  );
}
