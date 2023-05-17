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
        // TODO: enable editting for transactions
        editable={false}
      />
    </>
  );
};

export default TransactionTable;
