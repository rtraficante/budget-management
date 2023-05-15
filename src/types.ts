export type FormattedTransactionWithCategory = {
  date: string;
  category: string | undefined;
  id: number;
  amount: string;
  description: string | null;
};

export type FormattedSubscription = {
  id: number;
  company: string;
  plan: string;
  recurringCharge: string;
  chargeDate: string;
};
