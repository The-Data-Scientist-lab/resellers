import React from 'react';

interface ModelGalleryProps {
  images: string[];
  name: string;
}

const ModelGallery = ({ images, name }: ModelGalleryProps) => {
  const [selectedImage, setSelectedImage] = React.useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="w-full overflow-hidden rounded-lg">
        <img 
          src={selectedImage} 
          alt={`${name} featured`}
          className="w-full h-auto object-contain"
        />
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`aspect-square rounded-md overflow-hidden cursor-pointer border-2 
              ${selectedImage === image ? 'border-model-primary' : 'border-transparent'}`}
            onClick={() => setSelectedImage(image)}
          >
            <img 
              src={image}
              alt={`${name} thumbnail ${index + 1}`}
              className="w-full h-full object-contain hover:scale-105 transition-transform"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelGallery;
