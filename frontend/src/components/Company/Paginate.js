import React from 'react';

const Paginate = ({ itemsPerPage, totalItems, paginate }) => {
  const pgNbrs= [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pgNbrs.push(i);
  }

//   onclick had href='!#', due to this the page numbers looked like links but the link was taking to localhost:3000/!#, hence removed
  return (
    <nav>
      <ul className='pagination'>
        {pgNbrs.map(nbr => (
          <li key={nbr} className='page-item'>
            <a onClick={() => paginate(nbr)} className='page-link text-primary'>
              {nbr}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginate;