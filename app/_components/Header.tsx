import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@heroui/navbar';
import Image from 'next/image';
import path from 'path';
import Link from 'next/link';
import { Button } from '@heroui/button';

const Header = () => {
  const MenuList = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Create Story',
      path: '/create-story',
    },
    {
      name: 'Explore Story',
      path: '/explore',
    },
    {
      name: 'Contact Us',
      path: '/contact-us',
    },
  ];
  return (
    <Navbar maxWidth='full'>
      <NavbarContent>
        <NavbarBrand>
          <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
          <h2 className='font-bold text-2xl text-primary ml-3'>Magical Book</h2>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify='center'>
        {MenuList.map((item, index) => (
          <NavbarItem
            key={index}
            className='text-xl text-primary font-medium hover:underline mx-2'
          >
            <Link href={item.path}>{item.name}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify='end'>
        <Button color='primary'>Get Started</Button>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
