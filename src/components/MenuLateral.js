import React, { useState } from 'react';
import './MenuLateral.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faUsers, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const MenuLateral = ({ menu, onSelect }) => {
  const [openMenu, setOpenMenu] = useState({});

  const toggleSubMenu = (key) => {
    setOpenMenu((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelect = (key) => {
    if (onSelect) {
      onSelect(key);
    }
  };

  return (
    <div id="menu-lateral">
      {menu.map((item) => (
        <div key={item.key} className={`menu-item ${openMenu[item.key] ? 'open' : ''}`}>
          <button onClick={() => item.subMenu ? toggleSubMenu(item.key) : handleSelect(item.key)}>
            <p>
              <FontAwesomeIcon className='icon-menu' icon={item.key === 'producto' ? faBox : faUsers} />
              {item.title}
            </p>
            <span>
              {item.subMenu && (
                <FontAwesomeIcon className="icon-menu-flecha" icon={openMenu[item.key] ? faChevronDown : faChevronRight} />
              )}
            </span>

          </button>
          {item.subMenu && (
            <div className="sub-menu">
              {item.subMenu.map((subItem) => (
                <button key={subItem.key} onClick={() => handleSelect(subItem.key)}>
                  {subItem.title}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuLateral;
