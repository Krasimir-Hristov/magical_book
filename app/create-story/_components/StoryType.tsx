'use client';

import Image from 'next/image';
import React, { useState } from 'react';

export interface OptionField {
  label: string;
  imageUrl: string;
  isFree: boolean;
}

export interface StoryTypeProps {
  userSelection: (data: { fieldName: string; fieldValue: string }) => void;
}

const StoryType: React.FC<StoryTypeProps> = ({ userSelection }) => {
  const OptionList: OptionField[] = [
    { label: 'Story Book', imageUrl: '/story-book.png', isFree: true },
    { label: 'Bed Story', imageUrl: '/bed-story.png', isFree: true },
    { label: 'Educational', imageUrl: '/educational.png', isFree: true },
  ];

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const onUserSelect = (item: OptionField) => {
    setSelectedOption(item.label);
    userSelection({ fieldName: 'storyType', fieldValue: item?.label });
  };

  return (
    <div>
      <label className='font-bold text-4xl text-primary'>2. Story Type</label>
      <div className='grid grid-cols-3 gap-5 mt-3'>
        {OptionList.map((item, index) => (
          <div
            key={index}
            className={`relative grayscale hover:grayscale-0 cursor-pointer p-1
              ${selectedOption === item.label ? 'grayscale-0 border-3 rounded-3xl border-primary' : 'grayscale'}`}
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
              className='object-cover h-[260px] rounded-3xl'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryType;
