import React from 'react';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="mobile-header sec">
      <Menu className="menu-icon" menuButton={<MenuButton>&#9776;</MenuButton>}>
        <MenuItem><Link to="/">Home</Link></MenuItem>
        <MenuItem><Link to="/shop">Shop</Link></MenuItem>
        <div className="btn-group dropend">
          <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Furniture Categories
          </button>
          <ul className="dropdown-menu">
            <Link to="livingRoom">LIVING ROOM</Link>
            <Link to="diningKitchen">DINING & KITCHEN</Link>
            <Link to="bedroom">BEDROOM</Link>
            <Link to="storageMedia">STORAGE & MEDIA</Link>
            <Link to="office">OFFICE</Link>
          </ul>
        </div>
        <MenuItem><Link to="/about">About</Link></MenuItem>
        <MenuItem><Link to="/contact">Contact</Link></MenuItem>
      </Menu>
    </header>
  );
}

export default Header;
