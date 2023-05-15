import { Button, Checkbox, Table } from "flowbite-react";
import React, {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { HiTrash } from "react-icons/hi";

const objectValues = <T extends object>(obj: T) => {
  return Object.keys(obj)
    .filter((val) => val !== "id")
    .map((objKey) => obj[objKey as keyof T]);
};

// const objectKeys = <T extends object>(obj: T) => {
//   return Object.keys(obj).map((objKey) => objKey as keyof T);
// };

type MinTableItem = {
  id: number;
};

type CustomRenderers<T extends MinTableItem> = Partial<
  Record<keyof T, (it: T) => React.ReactNode>
>;

type TableHeaders<T> = Record<keyof T, string>;

type Props<T extends MinTableItem> = {
  checkedIds: string[];
  setShowModal: Dispatch<SetStateAction<boolean>>;
  headers: Omit<TableHeaders<T>, "id">;
  handleCheckbox: (e: ChangeEvent<HTMLInputElement>) => void;
  customRenderers?: CustomRenderers<T>;
  data: T[];
  editable: boolean;
};

const DataTable = <T extends MinTableItem>({
  checkedIds,
  setShowModal,
  headers,
  data,
  handleCheckbox,
  editable,
}: Props<T>) => {
  // const renderRow = (item: T) => {
  //   return (
  //     <Table.Row>
  //       {objectKeys(item).map((itemProp) => {
  //         const customRenderer = customRenderers?.[itemProp]

  //         if (customRenderer) {
  //           return <Table.Cell>{customRenderer(item)}</Table.Cell>
  //         }

  //         return <Table.Cell>{item[itemProp] ? item[itemProp] : ""}</Table.Cell>
  //       })}
  //     </Table.Row>
  //   )
  // }

  return (
    <div className="relative overflow-x-auto">
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
          {objectValues(headers).map((val, i) => {
            return <Table.HeadCell key={i}>{val}</Table.HeadCell>;
          })}
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((item) => (
            <Table.Row
              key={item.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="!p-4">
                <Checkbox value={item.id} onChange={handleCheckbox} />
              </Table.Cell>
              {objectValues(item).map((entry, i) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                // TODO: Figure out this error
                return <Table.Cell key={i}>{entry}</Table.Cell>;
              })}
              {editable ? (
                <Table.Cell>
                  <a
                    href="/tables"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              ) : null}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default DataTable;
