// src/components/FavoritesModal.tsx
import React from "react";
import { Contact } from "../app/page";

type FavoritesModalProps = {
    isOpen: boolean;
    onClose: () => void;
    favoriteContacts: Contact[];
};

const FavoritesModal = ({ isOpen, onClose, favoriteContacts }: FavoritesModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-80">
                <div className="flex items-center mb-4">
                    <h2 className="text-xl font-semibold">Contatti preferiti</h2>
                    <img
                        src="/heart.png"
                        alt="Cuore"
                        className="w-5 h-5 ml-2"
                    />
                </div>


                {favoriteContacts.length > 0 ? (
                    <ul>
                        {favoriteContacts.map((contact) => (
                            <li key={contact.id} className="border-b py-2">
                                <p><strong>{contact.name}</strong></p>
                                <p>{contact.phone}</p>
                                <p>{contact.email}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Non hai ancora aggiunto nessun contatto tra i preferiti</p>
                )}
                <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
                    Chiudi
                </button>
            </div>
        </div>
    );
};

export default FavoritesModal;
