import React from 'react';

const PropertyItem = ({ property, isActive }) => {
  const { name, galleryImages } = property;

  // Conditional styles based on whether the slide is active or not
  const itemStyle = {
    width: '270px',
    height: isActive ? '416px' : '380px',
    border: isActive ? '4px solid #046307' : '',
    transition: 'height 0.3s ease, border-color 0.3s ease',
    backgroundImage: `url(${galleryImages?.[0]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '20px',
    position: 'relative', // To position the overlay absolutely
    overflow: 'hidden',  // Ensure the overlay doesn't exceed the item's boundaries
  };

  return (
    <div style={itemStyle} className="relative flex items-end p-4">
      {/* Gradient shadow overlay */}
      <div className="absolute bottom-0 left-0 w-full h-2/4 bg-gradient-to-t from-black to-transparent"></div>
      
      <div className="text-white w-full p-2 rounded-b-lg z-10">
        <h3 className="text-lg font-[Anton] font-light"
        style={{
          letterSpacing:'1px',
          textTransform:'uppercase'
        }}
        >{name}</h3>
      </div>
    </div>
  );
};

export default PropertyItem;
