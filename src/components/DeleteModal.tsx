import { Button, Modal, Spinner } from "flowbite-react";
import React, { type Dispatch, type SetStateAction } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

type Props = {
  handleDelete: () => void;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  message?: string;
  isLoading?: boolean;
};

const DeleteModal = ({
  handleDelete,
  showModal,
  setShowModal,
  message,
  isLoading,
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
              {isLoading ? (
                <>
                  <Spinner />
                  <span className="pl-3">Deleting...</span>
                </>
              ) : (
                "Yes, I'm Sure"
              )}
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
