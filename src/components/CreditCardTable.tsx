import { type CreditCard } from "@prisma/client";
import { Button, Table } from "flowbite-react";
import { type Dispatch, type SetStateAction, useState } from "react";
import PayDropdown from "./PayDropdown";
import { HiTrash } from "react-icons/hi";

interface Props {
  data: CreditCard[];
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setDeleteId: Dispatch<SetStateAction<number>>;
}

const CreditCardTable = ({ data, setShowModal, setDeleteId }: Props) => {
  const [amount, setAmount] = useState(0);

  return (
    <div className="relative overflow-x-auto">
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell className="!p-4"></Table.HeadCell>
          <Table.HeadCell>Provider</Table.HeadCell>
          <Table.HeadCell>Nickname</Table.HeadCell>
          <Table.HeadCell>Due Date</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data?.length < 1 ? (
            <Table.Row>
              <Table.Cell colSpan={5} className="text-center">
                There is no data to display.
              </Table.Cell>
            </Table.Row>
          ) : null}
          {data?.map((cc) => (
            <Table.Row
              key={cc.id}
              className=" bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="!p-4">
                <Button
                  color="failure"
                  type="button"
                  size="sm"
                  className={`m-0`}
                  onClick={() => {
                    setDeleteId(cc.id);
                    setShowModal(true);
                  }}
                >
                  <HiTrash />
                </Button>
              </Table.Cell>
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
                <PayDropdown
                  amount={amount}
                  setAmount={setAmount}
                  id={cc.id}
                  disabled={cc.status === "PAID"}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default CreditCardTable;
