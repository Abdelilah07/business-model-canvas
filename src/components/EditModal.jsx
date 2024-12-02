import React, { useState, useEffect } from 'react';

const EditModal = ({ item, onClose, onSave }) => {
  const [newValue, setNewValue] = useState(item.value);

  useEffect(() => {
    itemNameInput.focus();
  }, []);

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{item.value ? 'Edit Item' : 'Add Item'}</h3>
        <input
          id='itemNameInput'
          placeholder="Enter item name"
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="input input-bordered w-full mt-4"
        />
        <div className="modal-action">
          <button className="btn btn-primary" onClick={() => onSave(newValue)}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;