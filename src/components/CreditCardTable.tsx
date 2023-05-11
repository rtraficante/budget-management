import { type CreditCard } from "@prisma/client";
import { Table } from "flowbite-react";
import { useState } from "react";
import PayDropdown from "./PayDropdown";

interface Props {
  data: CreditCard[];
}

const CreditCardTable = ({ data }: Props) => {
  const [amount, setAmount] = useState(0);

  return (
    <Table hoverable={true} className="table-fixed">
      <Table.Head>
        <Table.HeadCell>Provider</Table.HeadCell>
        <Table.HeadCell>Nickname</Table.HeadCell>
        <Table.HeadCell>Due Date</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {data?.map((cc) => (
          <Table.Row
            key={cc.id}
            className=" bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {cc.provider}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {cc.nickname}
            </Table.Cell>
            <Table.Cell className="break-words">
              {cc.dueDate.toLocaleDateString()}
            </Table.Cell>
            <Table.Cell
              className={`${
                cc.status === "UNPAID"
                  ? "text-yellow-400"
                  : cc.status === "LATE"
                  ? "text-red-700"
                  : "text-green-600"
              }`}
            >
              {cc.status}
            </Table.Cell>
            <Table.Cell>
              <PayDropdown amount={amount} setAmount={setAmount} id={cc.id} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default CreditCardTable;
