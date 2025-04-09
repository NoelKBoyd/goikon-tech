'use client'; // Ensure this is at the very top of the file
import React from 'react';

const FormationPitch = ({ formation, lineup }) => {
  const getFormationLayout = () => {
    switch (formation) {
      case '4-4-2':
        return [
          [1], 
          [2, 3, 4, 5], 
          [6, 7, 8, 9], 
          [10, 11]
        ];
      case '4-3-3':
        return [
          [1], 
          [2, 3, 4, 5], 
          [6, 7, 8], 
          [9, 10, 11]
        ];
      case '3-4-3':
        return [
          [1], 
          [2, 3, 4], 
          [5, 6, 7, 8], 
          [9, 10, 11]
        ];
      default:
        return [
          [1], 
          [2, 3, 4, 5], 
          [6, 7, 8, 9], 
          [10, 11]
        ];
    }
  };

  const layout = getFormationLayout();

  return (
    <div className="bg-green-600 text-white p-4 rounded-lg w-full max-w-4xl mx-auto">
      {layout.map((row, i) => (
        <div key={i} className="flex justify-center my-4 gap-4">
          {row.map((pos) => (
            <div
              key={pos}
              className="bg-white text-black rounded-full w-16 h-16 flex items-center justify-center text-sm font-semibold"
            >
              {lineup[pos - 1] || `#${pos}`}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FormationPitch;
