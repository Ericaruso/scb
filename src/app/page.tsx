// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";
import FavoritesModal from "../components/FavoritesModal";
import './globals.css';


// Esporta il tipo Contact per poterlo utilizzare in altri file
export type Contact = {
  id: number;
  name: string;
  phone: string;
  email: string;
  favorite: boolean;
};

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState({ name: "", phone: "", email: "" });
  const [contactCounter, setContactCounter] = useState<number>(1);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState<boolean>(false);

  // Stati per ordinamento
  const [sortCriteria, setSortCriteria] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Ordinamento iniziale crescente

  // Stato per la ricerca
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      const contactsData = JSON.parse(savedContacts);
      setContacts(contactsData);
      if (contactsData.length > 0) {
        setContactCounter(contactsData[contactsData.length - 1].id + 1);
      }
    }
  }, []);

  const handleAddContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newId = contactCounter;
    const updatedContacts = [...contacts, { id: newId, ...newContact, favorite: false }];
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    setContactCounter(contactCounter + 1);
    setNewContact({ name: "", phone: "", email: "" });
  };

  const handleEditClick = (contact: Contact) => {
    setSelectedContact(contact);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = (editedContact: Contact) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === editedContact.id ? editedContact : contact
    );
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    const updatedContacts = contacts.filter((contact) => contact.id !== selectedContact?.id);
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    setIsDeleteModalOpen(false);
  };

  const toggleFavorite = (contactId: number) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === contactId ? { ...contact, favorite: !contact.favorite } : contact
    );
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  const favoriteContacts = contacts.filter((contact) => contact.favorite);

  const handleSort = () => {
    const sortedContacts = [...contacts].sort((a, b) => {
      const fieldA = a[sortCriteria as keyof Contact]?.toString().toLowerCase();
      const fieldB = b[sortCriteria as keyof Contact]?.toString().toLowerCase();

      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setContacts(sortedContacts);
  };

  const cycleSortCriteria = () => {
    const criteria = ["name", "phone", "email"];
    const nextIndex = (criteria.indexOf(sortCriteria) + 1) % criteria.length;
    setSortCriteria(criteria[nextIndex]);
    handleSort();
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    handleSort();
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-2">Simple Contacts Book</h1>

      {/* Contatti preferiti */}
      <button
        onClick={() => setIsFavoritesModalOpen(true)}
        className="text-blue-600 mb-6 flex items-center"
      >
        Contatti preferiti
        <img
          src="/heart.png"
          alt="Preferito"
          className="w-4 h-4 ml-2"
        />
      </button>


      {/* Aggiungi Contatto Form */}
      <form onSubmit={handleAddContact} className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Aggiungi Contatto</h2>
        <input
          type="text"
          placeholder="Nome e Cognome"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Telefono"
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Aggiungi Contatto
        </button>
      </form>

      {/* Barra di ricerca */}
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Cerca Contatto</h2>
      <input
        type="text"
        placeholder="Cerca contatti..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-lg mb-4 p-2 border rounded"
      />
      </div>

      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Lista Contatti</h2>
              {/* Ordinamento */}
      <div className="mb-4">
        <button onClick={cycleSortCriteria} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">
          Ordina per: {sortCriteria === "name" ? "Nome" : sortCriteria === "phone" ? "Telefono" : "Email"}
        </button>
        <button onClick={toggleSortOrder} className="px-4 py-2 bg-blue-500 text-white rounded">
          {sortOrder === "asc" ? "Crescente" : "Decrescente"}
        </button>
      </div>

        {filteredContacts.length === 0 ? (
          <p className="text-gray-500 mb-4">Nessun contatto disponibile. Aggiungi un nuovo contatto!</p>
        ) : (
          <ul>
            {filteredContacts.map((contact) => (
              <li key={contact.id} className="border-b py-2">
                <p>
                  <strong>{contact.name}</strong>
                  {contact.favorite && (
                    <img
                      src="/heart.png"
                      alt="Preferito"
                      className="inline w-4 h-4 ml-2"
                    />
                  )}
                </p>

                <p>{contact.phone}</p>
                <p>{contact.email}</p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditClick(contact)}
                    className="text-blue-600 flex items-center"
                  >
                    <img src="/pencil.png" alt="Modifica" className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteClick(contact)}
                    className="text-red-600 flex items-center"
                  >
                    <img src="/delete.png" alt="Elimina" className="w-4 h-4" />
                  </button>

                  <button onClick={() => toggleFavorite(contact.id)} className="text-yellow-600 ml-2">
                  {contact.favorite ? "Rimuovi dai Preferiti" : "Aggiungi ai Preferiti"}
                </button>
                </div>

              </li>
            ))}
          </ul>
        )}
      </div>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSaveEdit}
        contact={selectedContact!}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
      />

      <FavoritesModal
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
        favoriteContacts={favoriteContacts}
      />
    </div>
  );
}
