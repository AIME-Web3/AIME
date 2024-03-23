import React, { useState } from 'react';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Open Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Modal Title</h2>
            <p className="mb-4">Modal content goes here.</p>
            <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;