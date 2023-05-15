import { type Dispatch, type ChangeEvent, type SetStateAction } from "react";
import DataTable from "./DataTable";
import { type FormattedSubscription } from "~/types";

interface Props {
  data: FormattedSubscription[];
  checkedIds: number[];
  handleCheckbox: (e: ChangeEvent<HTMLInputElement>) => void;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const SubscriptionTable = ({
  data,
  checkedIds,
  handleCheckbox,
  setShowModal,
}: Props) => {
  return (
    <>
      <DataTable
        data={data}
        handleCheckbox={handleCheckbox}
        setShowModal={setShowModal}
        checkedIds={checkedIds}
        headers={{
          company: "Company",
          plan: "Billing Plan",
          recurringCharge: "Recurring Charge",
          chargeDate: "Next Charge Date",
        }}
      />
      {/* <Table hoverable={true} className="table-fixed">
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
              <Table.Cell>{sub.recurringCharge}</Table.Cell>
              <Table.Cell>{sub.chargeDate}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table> */}
    </>
  );
};

export default SubscriptionTable;
