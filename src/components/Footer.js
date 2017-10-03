import React from 'react';
import Link from './Link';

const Footer = ({onClick, visibilityFilter}) =>
  <p>
    Show:
    {' '}
    <Link filter="SHOW_ALL" visibilityFilter={visibilityFilter} onClick={onClick}>All</Link>
    {', '}
    <Link filter="SHOW_ACTIVE" visibilityFilter={visibilityFilter} onClick={onClick}>Active</Link>
    {', '}
    <Link filter="SHOW_COMPLETED" visibilityFilter={visibilityFilter} onClick={onClick}>Completed</Link>
  </p>

export default Footer;