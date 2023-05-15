import { type Decimal } from "@prisma/client/runtime";

export type FormattedTransactionWithCategory = {
  date: string;
  category: string | undefined;
  id: number;
  amount: Decimal;
  description: string | null;
};
