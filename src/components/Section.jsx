import React from 'react';
import { Pencil, Plus, Trash } from 'lucide-react';

const Section = ({ title, Icon, items, onAdd, onDelete, onEdit }) => {
    return (
        <div className="card bg-base-100 shadow-lg hover:-translate-y-2 hover:ring-2 ring-primary transition-all">
            <div className="card-body">
                <div className='flex justify-between shadow-md bg-base-200 p-4 rounded-xl items-center mb-4'>
                    <h2 className="card-title">
                        <Icon className='w-6 h-6 mr-2' />
                        {title}</h2>
                    <div className='tooltip' data-tip="Add Item">
                        <button className="btn btn-primary" onClick={onAdd}>
                            <Plus className='w-4 h-4' />
                        </button>
                    </div>
                </div>
                <ul className="space-y-4">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="group flex items-center justify-between p-4 w-full rounded-lg shadow"
                        >
                            <span>{item}</span>
                            <div className="flex gap-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="tooltip" data-tip="Edit">
                                    <button
                                        className="btn btn-sm btn-outline btn-circle btn-warning"
                                        onClick={() => onEdit(index)}
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="tooltip" data-tip="Delete">
                                    <button
                                        className="btn btn-sm btn-outline btn-circle btn-error"
                                        onClick={() => onDelete(index)}
                                    >
                                        <Trash className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Section;