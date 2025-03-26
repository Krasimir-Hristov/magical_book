'use client';

import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import { BookOpen } from 'lucide-react';

// Компонент за плаващи книги като декоративен елемент
export function FloatingBooks() {
  return (
    <div className='absolute inset-0 overflow-hidden z-0 opacity-70'>
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className='absolute'
          initial={{
            x: Math.random() * 100 - 50 + '%',
            y: Math.random() * 100 + '%',
            rotate: Math.random() * 20 - 10,
            opacity: 0.1,
          }}
          animate={{
            y: [
              Math.random() * 100 + '%',
              Math.random() * 70 + '%',
              Math.random() * 100 + '%',
            ],
            rotate: [
              Math.random() * 20 - 10,
              Math.random() * 20 - 10,
              Math.random() * 20 - 10,
            ],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            left: i % 2 === 0 ? '10%' : '80%',
          }}
        >
          <div
            className='bg-white rounded-md p-1 shadow-xl'
            style={{ width: `${80 + Math.random() * 40}px` }}
          >
            <BookOpen className='w-full h-full text-indigo-600' />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Предварително определени позиции за звездите, вместо да ги генерираме на случаен принцип при всяко рендериране
const starPositions = [
  {
    top: '16.526343271848877%',
    left: '17.289293037799514%',
    width: '4.799192766033006px',
    height: '2.541814680750335px',
  },
  {
    top: '91.46208828952042%',
    left: '16.68683433336431%',
    width: '5.891798603349345px',
    height: '3.3781645513911567px',
  },
  {
    top: '18.112621305335573%',
    left: '72.93141681053454%',
    width: '2.3421280403798495px',
    height: '5.10147352737764px',
  },
  {
    top: '92.55969024858682%',
    left: '4.018857128266107%',
    width: '2.559741864742013px',
    height: '5.8108324306066px',
  },
  {
    top: '91.42473269566234%',
    left: '57.71776872680894%',
    width: '4.093134396186638px',
    height: '5.207826546342852px',
  },
  {
    top: '44.7434184077927%',
    left: '13.333291997173502%',
    width: '4.027454766276867px',
    height: '3.1752490565767335px',
  },
  {
    top: '26.701762772792637%',
    left: '28.343674964137698%',
    width: '4.548270076068287px',
    height: '2.9698781176383164px',
  },
  {
    top: '42.46931042132724%',
    left: '6.932019485678564%',
    width: '4.168175681996373px',
    height: '3.6581444468088318px',
  },
  {
    top: '87.87607341715132%',
    left: '5.21951469460229%',
    width: '5.512918020548089px',
    height: '2.0906972442936205px',
  },
  {
    top: '61.602750573125434%',
    left: '71.10582750795875%',
    width: '2.160565916352068px',
    height: '3.624741486701213px',
  },
  {
    top: '73.92201879140185%',
    left: '13.375670044663956%',
    width: '3.0642747191974973px',
    height: '3.3562918620718234px',
  },
  {
    top: '43.049213799785655%',
    left: '89.44868995227107%',
    width: '3.3064054722621155px',
    height: '4.389858242990596px',
  },
  {
    top: '27.54556739151941%',
    left: '9.752177225970815%',
    width: '2.0902840415107287px',
    height: '5.191014679217981px',
  },
  {
    top: '65.02177357161409%',
    left: '19.145804203745207%',
    width: '4.645362493073499px',
    height: '3.852480856248725px',
  },
  {
    top: '89.21803874543097%',
    left: '70.80320517845966%',
    width: '5.527716012455368px',
    height: '5.724877228755041px',
  },
  {
    top: '93.27193002331828%',
    left: '42.360612552028456%',
    width: '3.522556252355936px',
    height: '5.115163226365886px',
  },
  {
    top: '51.64377421434405%',
    left: '71.31790118667757%',
    width: '4.614604275572263px',
    height: '2.7555318504883513px',
  },
  {
    top: '97.84161295287186%',
    left: '54.68161436224197%',
    width: '3.532233751535186px',
    height: '2.2231506847626727px',
  },
  {
    top: '10.34314767145974%',
    left: '22.12480855143926%',
    width: '2.9264979838800826px',
    height: '5.065441980668614px',
  },
  {
    top: '42.17236029779434%',
    left: '12.000842735145746%',
    width: '5.147996776200256px',
    height: '2.232797550316386px',
  },
];

export function MagicalDecorations() {
  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      {/* Светещи звезди */}
      {starPositions.map((position, i) => (
        <motion.div
          key={i}
          className='absolute bg-white rounded-full'
          style={position}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

export default MagicalDecorations;
