import React from 'react';

const FindStore = () => {
  const stores = [
    { name: 'Store A', address: '123 Main St, City, Country' },
    { name: 'Store B', address: '456 Elm St, City, Country' },
    { name: 'Store C', address: '789 Oak St, City, Country' }
  ];

  return (
    <div>
      <h1>Find a Store</h1>
      <ul>
        {stores.map((store, index) => (
          <li key={index}>
            <strong>{store.name}</strong><br />
            {store.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FindStore;
