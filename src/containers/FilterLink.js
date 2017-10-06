import React from 'react';
import { NavLink } from 'react-router-dom';

const FilterLink = ({filter, children}) => {
  return <NavLink
    exact 
    to={filter === 'SHOW_ALL' ? '/' : `/${filter}`}
    activeStyle={{
      textDecoration: 'none',
      color: 'black'
    }}
    // activeClassName="active"
  >
    {children}
  </NavLink>
}

export default FilterLink;