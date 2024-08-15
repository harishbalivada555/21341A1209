import React from 'react';

const Productcard = ({ selectedp }) => {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform transition-all duration-500 hover:scale-105">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{selectedp.productName}</h2>
          <p className="text-gray-700 text-sm mb-2">Price: ₹{selectedp.price}</p>
          <p className="text-gray-700 text-sm mb-2">Discount: {selectedp.discount}%</p>
          <p className="text-gray-700 text-sm mb-4">Availability: {selectedp.availability.replace("-", " ")}</p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500">Rating: </span>
            <span className="ml-2 text-sm font-medium text-gray-700">{selectedp.rating}</span>
          </div>
          <button className="w-full bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productcard;
