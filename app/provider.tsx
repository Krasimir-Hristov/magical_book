'use client'

import { HeroUIProvider } from '@heroui/react'
import React from 'react'

const Provider = ({ children }:{children: React.ReactNode}) => {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  )
}

export default Provider