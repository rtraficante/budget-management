import { Button, Modal } from "flowbite-react";
import React, { type Dispatch, type SetStateAction } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

type Props = {
  handleDelete: () => void;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  message?: string;
};

const DeleteModal = ({
  handleDelete,
  showModal,
  setShowModal,
  message,
}: Props) => {
  return (
    <Modal
      show={showModal}
      size="md"
      popup={true}
      onClose={() => setShowModal(false)}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {message ? message : "Are you sure you want to delete?"}
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDelete}>
              Yes, I&apos;m sure
            </Button>
            <Button color="gray" onClick={() => setShowModal(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
