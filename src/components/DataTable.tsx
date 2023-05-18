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

type MinTableItem = {
  id: number;
};

type TableHeaders<T> = Record<keyof T, string>;

type Props<T extends MinTableItem> = {
  checkedIds?: number[];
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  headers: Omit<TableHeaders<T>, "id">;
  handleCheckbox: (e: ChangeEvent<HTMLInputElement>) => void;
  data: T[];
  editable?: boolean;
};

const DataTable = <T extends MinTableItem>({
  checkedIds = [],
  setShowModal,
  headers,
  data,
  handleCheckbox,
  editable = false,
}: Props<T>) => {
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
              onClick={() => (setShowModal ? setShowModal(true) : null)}
            >
              <HiTrash />
            </Button>
          </Table.HeadCell>
          {objectValues(headers).map((val, i) => {
            return <Table.HeadCell key={i}>{val}</Table.HeadCell>;
          })}
          {editable ? (
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          ) : null}
        </Table.Head>
        <Table.Body className="divide-y">
          {data.length < 1 ? (
            <Table.Row>
              <Table.Cell
                colSpan={objectValues(headers).length + 1}
                className="text-center"
              >
                There is no data to display.
              </Table.Cell>
            </Table.Row>
          ) : null}
          {data.map((item) => (
            <Table.Row
              key={item.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="!p-4">
                <Checkbox value={item.id} onChange={handleCheckbox} />
              </Table.Cell>
              {objectValues(item).map((entry, i) => (
                <Table.Cell key={i} className="text-gray-900">
                  {/* TODO: Figure out this error */}
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  {entry}
                </Table.Cell>
              ))}
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
