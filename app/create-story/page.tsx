'use client';

import React, { useState } from 'react';
import StorySubjectInput from './_components/StorySubjectInput';
import StoryType from './_components/StoryType';
import AgeGroup from './_components/AgeGroup';
import ImageStyle from './_components/ImageStyle';
import { Button } from '@heroui/button';
import { chatSession } from '@/config/GeminiAi';

// Load the prompt template from environment variables
const AI_CREATE_STORY_PROMPT = process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT;

export interface FieldData {
  fieldName: string;
  fieldValue: string;
}

export interface FormDataType {
  storySubject?: string;
  storyType?: string;
  ageGroup?: string;
  imageStyle?: string;
}

const CreateStory = () => {
  const [formData, setFormData] = useState<FormDataType>({});
  const [loading, setLoading] = useState(false);

  const onHandleUserSelection = (data: FieldData) => {
    setFormData((prev) => ({
      ...prev,
      [data.fieldName]: data.fieldValue,
    }));
  };

  const generateStory = async () => {
    setLoading(true);

    // Check if all required fields are filled
    if (
      !formData.storySubject ||
      !formData.ageGroup ||
      !formData.storyType ||
      !formData.imageStyle
    ) {
      console.error('Please fill out all fields before generating the story.');
      return;
    }

    // Replace placeholders in the prompt with user inputs
    const FINAL_PROMPT = AI_CREATE_STORY_PROMPT?.replace(
      '{storySubject}',
      formData.storySubject
    )
      .replace('{ageGroup}', formData.ageGroup)
      .replace('{storyType}', formData.storyType)
      .replace('{imageStyle}', formData.imageStyle);

    try {
      // Send the prompt to the AI (Gemini AI in this case)
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log('AI Response:', result?.response.text());
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error('Error generating story:', e);
    }
  };

  return (
    <div className='p-10 md:px-20 lg:px-40'>
      <h2 className='font-extrabold text-[70px] text-primary text-center'>
        CREATE YOUR STORY
      </h2>
      <p className='text-2xl text-primary text-center'>
        Unlock your creativity with AI: Craft stories like never before! Let our
        AI bring your imagination to life, one story at a time.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-14'>
        {/* Story Subject */}
        <StorySubjectInput userSelection={onHandleUserSelection} />
        {/* Story Type */}
        <StoryType userSelection={onHandleUserSelection} />
        {/* Age Group */}
        <AgeGroup userSelection={onHandleUserSelection} />
        {/* Image Style */}
        <ImageStyle userSelection={onHandleUserSelection} />
      </div>
      <div className='flex justify-end my-10'>
        <Button
          disabled={loading}
          color='primary'
          className='p-10 text-2xl'
          onPress={generateStory}
        >
          Generate Story
        </Button>
      </div>
    </div>
  );
};

export default CreateStory;
