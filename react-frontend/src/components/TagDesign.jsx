import React from 'react';

export default function TagsDesign({ text }) {
    return (
        <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1">
            <span className="text-black">{text}</span>
        </div>
    );
}