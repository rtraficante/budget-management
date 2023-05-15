import { type Dispatch, type ChangeEvent, type SetStateAction } from "react";
import DataTable from "./DataTable";
import { type FormattedTransactionWithCategory } from "~/types";

type Props = {
  data: FormattedTransactionWithCategory[];
  setShowModal: Dispatch<SetStateAction<boolean>>;
  checkedIds: number[];
  handleCheckbox: (e: ChangeEvent<HTMLInputElement>) => void;
};

const TransactionTable = ({
  data,
  setShowModal,
  handleCheckbox,
  checkedIds,
}: Props) => {
  return (
    <>
      <DataTable
        data={data}
        headers={{
          date: "Date",
          amount: "Amount",
          description: "Description",
          category: "Category",
        }}
        checkedIds={checkedIds}
        setShowModal={setShowModal}
        handleCheckbox={handleCheckbox}
        editable={true}
      />
      {/* <div className="relative overflow-x-auto">
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell className="!p-4">
              <Button
                color="failure"
                type="button"
                size="sm"
                className={`${checkedIds.length < 1 ? "invisible" : ""} m-0`}
                onClick={() => setShowModal(true)}
              >
                <HiTrash />
              </Button>
            </Table.HeadCell>

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
                <Table.Cell className="!p-4">
                  <Checkbox value={t.id} onChange={handleCheckbox} />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {t.date}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {new Prisma.Decimal(t.amount).toNumber().toFixed(2)}
                </Table.Cell>
                <Table.Cell className="break-words">
                  {t.description ? t.description : "Empty description"}
                </Table.Cell>
                <Table.Cell>
                  {t.category ? t.category : "No category attached"}
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
      </div> */}
    </>
  );
};

export default TransactionTable;
