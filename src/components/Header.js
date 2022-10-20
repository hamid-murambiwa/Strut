import React from 'react';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="mobile-header sec">
      <Menu className="menu-icon" menuButton={({ open }) => (<MenuButton className={open ? 'szh-menu-button h-active' : 'szh-menu-button h-inactive'}>&#9776;</MenuButton>)}>
        <MenuItem><Link to="/">Home</Link></MenuItem>
        <MenuItem><Link to="/shop">Shop</Link></MenuItem>
        <div className="btn-group dropend">
          <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Furniture Categories
          </button>
          <ul className="dropdown-menu">
            <Link to="/shop/categoryView/1">LIVING ROOM</Link>
            <Link to="/shop/categoryView/2">DINING & KITCHEN</Link>
            <Link to="/shop/categoryView/3">BEDROOM</Link>
            <Link to="/shop/categoryView/4">STORAGE & MEDIA</Link>
            <Link to="/shop/categoryView/5">OFFICE</Link>
          </ul>
        </div>
        <MenuItem><Link to="/about">About</Link></MenuItem>
        <MenuItem><Link to="/contact">Contact</Link></MenuItem>
      </Menu>
    </header>
  );
}

export default Header;
