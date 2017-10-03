import React from 'react';

const Link = ({visibilityFilter, filter, onClick}) => {
  if(visibilityFilter === filter) {
    return <span>{filter}</span>
  }
  
  return <a
    href="#"
    onClick={(e) => {
        e.preventDefault();
        onClick(filter);
      }
    }
  >
    {filter}
  </a>
}

export default Link;