// components/DeleteModal.tsx

import React from "react";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    isOpen,
    onClose,
    onDelete,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Conferma Eliminazione</h2>
                <p>Sei sicuro di voler eliminare questo contatto?</p>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
                    >
                        Annulla
                    </button>
                    <button
                        onClick={onDelete}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Elimina
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
