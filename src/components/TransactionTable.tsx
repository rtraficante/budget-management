import { Prisma, type Category, type Transaction } from "@prisma/client";
import { Table } from "flowbite-react";

interface Props {
  data: (Transaction & { category: Category | null })[];
}

const TransactionTable = ({ data }: Props) => {
  return (
    <Table hoverable={true} className="table-fixed">
      <Table.Head>
        <Table.HeadCell>Date</Table.HeadCell>
        <Table.HeadCell>Amount</Table.HeadCell>
        <Table.HeadCell>Description</Table.HeadCell>
        <Table.HeadCell>Category</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {data.map((t) => (
          <Table.Row
            key={t.id}
            className=" bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {t.date.toLocaleDateString()}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {new Prisma.Decimal(t.amount).toNumber().toFixed(2)}
            </Table.Cell>
            <Table.Cell className="break-words">
              {t.description ? t.description : "Empty description"}
            </Table.Cell>
            <Table.Cell>
              {t.category ? t.category.name : "No category attached"}
            </Table.Cell>
            <Table.Cell>
              <a
                href="/tables"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TransactionTable;
