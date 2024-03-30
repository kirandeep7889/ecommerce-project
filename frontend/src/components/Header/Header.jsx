import { NavLink } from 'react-router-dom';
import "./Header.css"

const Header = () => {
  return (
    <div className="Header">
      <div className="Header-left">
        <img  alt="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyjd_UEBCnqCCbj9lqjiEDVOBCKMJcuZ0XyNmIxrUxtgbevkO5vxnRQO4kOsnMAgSZGeM&usqp=CAU" width={"100px"} height={"90px"}/>
      </div>
      <div className="Header-center">
        <h2>ONLINE-STORE</h2>
      </div>
      <div className="Header-right">
        <ul>
          <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/signup" activeClassName="active">Signup</NavLink></li>
          <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
          <li><NavLink to="/cart" activeClassName="active">Cart</NavLink></li>

        </ul>
      </div>
    </div>
  );
}

export default Header;