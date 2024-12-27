import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

export default function HoverText({text, width}) {
  const [showText, setShowText] = useState(false);

  return (
    <div
      className="relative rounded-full bg-gray-300 w-8 h-8 flex items-center justify-center cursor-pointer transition duration-500 hover:bg-gray-400 mx-2"
      onMouseEnter={() => setShowText(true)}
      onMouseLeave={() => setShowText(false)}
    >
      <FontAwesomeIcon icon={faQuestion} bounce className="text-gray-700" />
      {showText && (
        <div className="absolute top-0 left-full ml-2 mt-1 bg-gray-800 text-white px-2 py-1 rounded-lg" style={{width: width}}>
          <p className="text-sm font-medium">{text}</p>
        </div>
      )}
    </div>
  );
}