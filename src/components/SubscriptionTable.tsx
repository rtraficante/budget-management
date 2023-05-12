import { Prisma, type Subscription } from "@prisma/client";
import { Table } from "flowbite-react";

interface Props {
  data: Subscription[];
}

const SubscriptionTable = ({ data }: Props) => {
  return (
    <Table hoverable={true} className="table-fixed">
      <Table.Head>
        <Table.HeadCell>Company</Table.HeadCell>
        <Table.HeadCell>Billing Plan</Table.HeadCell>
        <Table.HeadCell>Recurring Charge</Table.HeadCell>
        <Table.HeadCell>Next Charge Date</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {data?.map((sub) => (
          <Table.Row
            key={sub.id}
            className=" bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {sub.company}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {sub.plan}
            </Table.Cell>
            <Table.Cell>
              {new Prisma.Decimal(sub.recurringCharge).toNumber().toFixed(2)}
            </Table.Cell>
            <Table.Cell>{sub.chargeDate.toLocaleDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default SubscriptionTable;
