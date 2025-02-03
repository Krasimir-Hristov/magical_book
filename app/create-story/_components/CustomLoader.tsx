'use client';

import { useEffect } from 'react';
import { Modal, ModalContent, ModalBody, useDisclosure } from '@heroui/modal';
import Image from 'next/image';

interface CustomLoaderProps {
  isLoading: boolean;
}

const CustomLoader: React.FC<CustomLoaderProps> = ({ isLoading }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (isLoading) {
      onOpen();
    }
  }, [isLoading, onOpen]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalBody className='p-10 flex flex-col items-center justify-center'>
          <Image
            src='/loader.gif'
            alt='Loading animation'
            width={200}
            height={200}
            className='w-[200px] h-[200px]'
          />
          <h2 className='font-bold text-2xl text-primary text-center mt-4'>
            Please wait... Story is generating...
          </h2>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomLoader;
