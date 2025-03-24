// Фиктивна имплементация на Stripe интеграция за покупка на токени

interface PaymentOptions {
  amount: number;
  currency: string;
  description: string;
  userId: string;
}

interface PaymentResult {
  success: boolean;
  sessionId?: string;
  url?: string;
  error?: string;
}

export async function createCheckoutSession(
  options: PaymentOptions
): Promise<PaymentResult> {
  try {
    // Симулиране на забавяне за по-реалистично усещане
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Използвам options за да създам по-реалистичен отговор
    const { amount, currency, description, userId } = options;
    const sessionId = `cs_${userId}_${Math.random()
      .toString(36)
      .substring(2, 15)}`;

    // В реалната имплементация тук ще има API заявка към Stripe
    // но за целите на демото просто връщаме успешен резултат
    return {
      success: true,
      sessionId,
      url: `/payment-success?session_id=${sessionId}&amount=${amount}&currency=${currency}`,
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      success: false,
      error:
        'Възникна грешка при създаването на сесия за плащане. Моля, опитайте отново.',
    };
  }
}

export async function processPaymentSuccess(
  sessionId: string
): Promise<{ success: boolean; tokens?: number }> {
  try {
    // Симулиране на забавяне
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Извличаме информация от sessionId
    // В реалния случай ще имаме реална проверка чрез Stripe API
    const isValidSession = sessionId.startsWith('cs_');

    if (!isValidSession) {
      throw new Error(`Невалидна сесия: ${sessionId}`);
    }

    // В реалната имплементация тук ще има API заявка за проверка на сесията
    // но за целите на демото просто връщаме успешен резултат с примерен брой токени
    const tokenAmounts = [10, 25, 60];
    return {
      success: true,
      tokens: tokenAmounts[Math.floor(Math.random() * tokenAmounts.length)],
    };
  } catch (error) {
    console.error('Error processing payment success:', error);
    return {
      success: false,
    };
  }
}

// Примерни пакети с токени
export const tokenPackages = [
  {
    id: 'basic',
    name: 'Базов',
    tokens: 10,
    price: 9.99,
  },
  {
    id: 'standard',
    name: 'Стандартен',
    tokens: 25,
    price: 19.99,
  },
  {
    id: 'premium',
    name: 'Премиум',
    tokens: 60,
    price: 39.99,
  },
];
