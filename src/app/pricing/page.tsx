'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  CreditCard,
  Sparkles,
  Star,
  BadgeCheck,
  BadgePlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MagicalDecorations } from '@/components/ui/decorations';

export default function PricingPage() {
  const pricingPlans = [
    {
      name: 'Стартов пакет',
      price: '9.99',
      pricePerToken: '3.33',
      description: 'Идеален за първи стъпки в света на вълшебните книги',
      tokens: 3,
      features: [
        'Генериране на 3 уникални книги',
        'PDF изтегляне',
        'Споделяне на книги',
        '24/7 поддръжка',
      ],
      popular: false,
      icon: <CreditCard className='h-10 w-10 text-white' />,
      bgGradient: 'from-blue-500 to-indigo-600',
    },
    {
      name: 'Популярен избор',
      price: '24.99',
      pricePerToken: '2.50',
      description: 'Най-добрата стойност за семейства с деца',
      tokens: 10,
      features: [
        'Генериране на 10 уникални книги',
        'PDF изтегляне',
        'Споделяне на книги',
        '24/7 поддръжка',
      ],
      popular: true,
      icon: <Star className='h-10 w-10 text-white' />,
      bgGradient: 'from-purple-500 to-fuchsia-600',
    },
    {
      name: 'Премиум пакет',
      price: '39.99',
      pricePerToken: '2.00',
      description: 'За ентусиасти и творци, които обичат да създават',
      tokens: 20,
      features: [
        'Генериране на 20 уникални книги',
        'PDF изтегляне',
        'Споделяне на книги',
        '24/7 поддръжка',
      ],
      popular: false,
      icon: <BadgeCheck className='h-10 w-10 text-white' />,
      bgGradient: 'from-teal-500 to-green-600',
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-b from-indigo-50/80 to-white relative pb-20'>
      {/* Декоративни елементи */}
      <div className='absolute inset-0 overflow-hidden opacity-10 pointer-events-none'>
        <MagicalDecorations />
      </div>

      {/* Хедър */}
      <div className='relative bg-gradient-to-r from-indigo-600 to-violet-700 text-white py-20'>
        <div className='absolute inset-0 opacity-20'>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>

        <div className='container mx-auto px-4 relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col items-center text-center max-w-3xl mx-auto'
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, 0] }}
              transition={{ duration: 0.6 }}
              className='mb-6'
            >
              <CreditCard className='h-20 w-20' />
            </motion.div>

            <motion.h1
              className='text-4xl md:text-5xl font-bold mb-6'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Ценоразпис
            </motion.h1>

            <motion.p
              className='text-xl text-indigo-100 mb-8 max-w-2xl mx-auto'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Изберете подходящия план и започнете да създавате вълшебни детски
              книги още днес
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                className='bg-white text-indigo-700 hover:bg-indigo-50'
              >
                <Link href='/'>
                  <ArrowLeft className='mr-2 h-4 w-4' />
                  Назад към Началната страница
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Декоративни вълни */}
        <div className='absolute bottom-0 left-0 right-0 h-16 overflow-hidden'>
          <svg
            viewBox='0 0 1200 120'
            preserveAspectRatio='none'
            className='absolute bottom-0 w-full h-12 text-indigo-50/80 rotate-180'
            fill='currentColor'
          >
            <path d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' />
          </svg>
        </div>
      </div>

      {/* Съдържание - Ценови планове */}
      <div className='container mx-auto px-4 py-16 relative z-10'>
        <div className='text-center mb-16'>
          <motion.h2
            className='text-3xl font-bold mb-4 text-indigo-900'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Изберете вашия план
          </motion.h2>
          <motion.p
            className='text-lg text-muted-foreground max-w-2xl mx-auto'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Всеки нов потребител получава 3 безплатни кредита. След като ги
            използвате, можете да закупите допълнителни токени от нашите
            планове.
          </motion.p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className={`bg-white rounded-2xl shadow-xl overflow-hidden relative ${
                plan.popular ? 'ring-2 ring-indigo-500' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              {plan.popular && (
                <div className='absolute top-0 inset-x-0 text-xs text-center transform bg-indigo-500 text-white py-1 uppercase font-bold'>
                  Най-популярен
                </div>
              )}

              <div
                className={`bg-gradient-to-r ${plan.bgGradient} p-6 text-white`}
              >
                <div className='flex justify-between items-center'>
                  <h3 className='text-xl font-bold'>{plan.name}</h3>
                  <div className='p-2 bg-white/20 rounded-full'>
                    {plan.icon}
                  </div>
                </div>
                <div className='mt-4 flex items-end gap-2'>
                  <span className='text-4xl font-bold'>{plan.price} лв.</span>
                  <span className='text-sm text-white/70'>
                    ({plan.pricePerToken} лв./токен)
                  </span>
                </div>
                <p className='mt-2 text-sm text-white/80'>{plan.description}</p>
              </div>

              <div className='p-6'>
                <div className='flex items-center justify-center space-x-2 mb-8'>
                  <BadgePlus className='h-5 w-5 text-indigo-500' />
                  <span className='text-xl font-bold text-indigo-900'>
                    {plan.tokens} токена
                  </span>
                </div>

                <ul className='space-y-3 mb-8'>
                  {plan.features.map((feature, i) => (
                    <li key={i} className='flex items-center'>
                      <Check className='h-5 w-5 text-green-500 mr-2 flex-shrink-0' />
                      <span className='text-gray-700'>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-700 hover:from-indigo-700 hover:to-violet-800 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-indigo-900'
                  }`}
                >
                  <Sparkles className='mr-2 h-4 w-4' />
                  Купи {plan.tokens} токена
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Бонус информация */}
      <div className='container mx-auto px-4 py-16 relative z-10'>
        <div className='max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden'>
          <div className='p-8'>
            <motion.div
              className='flex items-center space-x-4 mb-6'
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className='p-2 bg-indigo-100 rounded-full'>
                <Sparkles className='h-8 w-8 text-indigo-600' />
              </div>
              <h3 className='text-2xl font-bold text-indigo-900'>
                Започнете с безплатни кредити
              </h3>
            </motion.div>

            <motion.p
              className='text-lg text-muted-foreground mb-6'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Всеки нов регистриран потребител получава 3 безплатни кредита за
              генериране на книги. След това можете да закупите допълнителни
              токени, като цената на всеки токен намалява, колкото по-голям
              пакет изберете.
            </motion.p>

            <motion.div
              className='bg-indigo-50 p-4 rounded-lg'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className='text-indigo-900 font-medium'>
                Създайте акаунт сега и започнете вашето пътешествие в света на
                вълшебните детски книги, създадени специално за вас с помощта на
                изкуствен интелект.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA секция */}
      <motion.div
        className='bg-gradient-to-r from-indigo-600 to-violet-700 text-white py-20 mt-16 relative'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className='container mx-auto px-4 max-w-3xl text-center relative z-10'>
          <motion.h2
            className='text-3xl md:text-4xl font-bold mb-6'
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Готови ли сте да започнете?
          </motion.h2>

          <motion.p
            className='text-xl text-indigo-100 mb-8'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Регистрирайте се сега, получете вашите 3 безплатни кредита и се
            възползвайте от по-ниски цени при закупуване на по-големи пакети
            токени.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='flex flex-col sm:flex-row gap-4 justify-center'
          >
            <Button
              asChild
              size='lg'
              className='bg-white text-indigo-700 hover:bg-indigo-50 shadow-xl'
            >
              <Link href='/create'>
                <Sparkles className='mr-2 h-4 w-4' />
                Създай Своята Книга
              </Link>
            </Button>

            <Button
              asChild
              size='lg'
              variant='outline'
              className='border-white text-black hover:bg-white/10'
            >
              <Link href='/how-it-works'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Научи Повече
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className='absolute inset-0 opacity-20'>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>
      </motion.div>

      {/* FAQ секция за ценообразуване */}
      <div className='container mx-auto px-4 py-20 relative z-10'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className='text-3xl font-bold mb-4 text-indigo-900'>
            Въпроси за ценообразуването
          </h2>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            Отговори на често задавани въпроси относно нашите планове и токени
          </p>
        </motion.div>

        <div className='max-w-3xl mx-auto space-y-6'>
          {[
            {
              question: 'Какво представляват токените?',
              answer:
                'Токените са виртуална валута в нашата платформа. Един токен ви позволява да генерирате една уникална детска книга с изкуствен интелект. Всички токени имат една и съща функционалност, независимо от кой пакет са закупени - разликата е само в цената за токен, която е по-изгодна при по-големите пакети.',
            },
            {
              question: 'Имат ли токените срок на валидност?',
              answer:
                'Не, закупените токени нямат срок на валидност. След като ги закупите, те остават във вашия акаунт, докато не ги използвате.',
            },
            {
              question: 'Мога ли да получа отстъпка при по-голяма поръчка?',
              answer:
                'Да, нашите пакети с повече токени предлагат по-добра цена на токен. Колкото повече токени закупите наведнъж, толкова по-ниска е цената за всеки отделен токен.',
            },
            {
              question: 'Как се извършва плащането?',
              answer:
                'Поддържаме различни методи за плащане, включително кредитни/дебитни карти и PayPal. Всички плащания са защитени и криптирани за вашата сигурност.',
            },

            {
              question: 'Има ли разлика между токените от различните пакети?',
              answer:
                'Не, всички токени имат абсолютно еднаква функционалност, независимо от кой пакет ги закупувате. Единствената разлика е в цената - колкото повече токени купувате наведнъж, толкова по-ниска е цената за всеки отделен токен.',
            },
            {
              question: 'Има ли месечен абонамент?',
              answer:
                'В момента не предлагаме месечни абонаменти. Нашият модел е базиран на единични покупки на токени, които можете да използвате по всяко време, без да се притеснявате за периодични такси.',
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              className='bg-white rounded-xl shadow-md overflow-hidden'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className='p-6'>
                <h3 className='text-xl font-semibold mb-3 text-indigo-900'>
                  {faq.question}
                </h3>
                <p className='text-muted-foreground'>{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
