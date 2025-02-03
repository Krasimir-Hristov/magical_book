import Image from 'next/image';
import React, { useState } from 'react';
import { OptionField } from './StoryType';

interface ImageStylleProps {
  userSelection: (data: { fieldName: string; fieldValue: string }) => void;
}
const ImageStyle: React.FC<ImageStylleProps> = ({ userSelection }) => {
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

  const onUserSelect = (item: OptionField) => {
    setSelectedOption(item.label);
    userSelection({ fieldName: 'imageStyle', fieldValue: item.label });
  };
  return (
    <div>
      <label className='font-bold text-4xl text-primary'>4. Image Style</label>

      <div className='grid grid-cols-3 gap-5 mt-3 '>
        {OptionList.map((item, index) => (
          <div
            key={index}
            className={`relative grayscale hover:grayscale-0 cursor-pointer p-1
               ${selectedOption === item.label ? 'grayscale-0 border-3 rounded-3xl border-primary' : 'grayscale'}
               `}
            onClick={() => onUserSelect(item)}
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
