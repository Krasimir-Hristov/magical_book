import Image from 'next/image';
import React, { useState } from 'react';

const ImageStyle = () => {
  const OptionList = [
    {
      label: '3D Cartoon',
      imageUrl: '/3d.png',
      isFree: true,
    },
    {
      label: 'Paper Cut',
      imageUrl: '/papercut.png',
      isFree: true,
    },
    {
      label: 'Water Color',
      imageUrl: '/watercolor.png',
      isFree: true,
    },
    {
      label: 'Pixel Style',
      imageUrl: '/pixelstyle.png',
      isFree: true,
    },
  ];

  const [selectedOption, setSelectedOption] = useState<string>();

  return (
    <div>
      <label className='font-bold text-4xl text-primary'>2. Story Type</label>

      <div className='grid grid-cols-3 gap-5 mt-3 '>
        {OptionList.map((item, index) => (
          <div
            key={index}
            className={`relative grayscale hover:grayscale-0 cursor-pointer p-1
               ${selectedOption === item.label ? 'grayscale-0 border-3 rounded-3xl border-primary' : 'grayscale'}
               `}
            onClick={() => setSelectedOption(item.label)}
          >
            <h2 className='absolute bottom-5 text-white text-center font-extrabold w-full text-2xl'>
              {item.label}
            </h2>

            <Image
              src={item.imageUrl}
              alt={item.label}
              width={300}
              height={400}
              className='object-cover h-[120px] rounded-3xl'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageStyle;
