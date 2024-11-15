import { useState, useEffect } from "react";
import { Contact } from "../app/page"; // Assicurati che questo import sia corretto

type EditModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (contact: Contact) => void;
    contact: Contact | null; // Permetti che contact possa essere nullo
};

const EditModal = ({ isOpen, onClose, onSubmit, contact }: EditModalProps) => {
    const [editedContact, setEditedContact] = useState<Contact | null>(contact);

    useEffect(() => {
        setEditedContact(contact);
    }, [contact]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editedContact) {
            setEditedContact({
                ...editedContact,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editedContact) {
            onSubmit(editedContact);
        }
    };

    if (!isOpen || !editedContact) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-80">
                <h2 className="text-xl font-semibold mb-4">Modifica Contatto</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={editedContact.name}
                        onChange={handleChange}
                        className="mb-2 p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        value={editedContact.phone}
                        onChange={handleChange}
                        className="mb-2 p-2 border rounded"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={editedContact.email}
                        onChange={handleChange}
                        className="mb-2 p-2 border rounded"
                        required
                    />
                    <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                        Salva
                    </button>
                </form>
                <button onClick={onClose} className="mt-4 text-red-600">
                    Chiudi
                </button>
            </div>
        </div>
    );
};

export default EditModal;
