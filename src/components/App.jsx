import { useState, useEffect } from 'react';
import { GlobalStyles } from './GlobalStyles';
import 'modern-normalize';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { MainForm, MainTitle, Title } from './App.styled';

const LS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem(LS_KEY);
    return savedContacts !== null ? JSON.parse(savedContacts) : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (values, { resetForm }) => {
    let newContact = values;

    const check = contacts.filter(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (check.length) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      newContact.id = nanoid();

      setContacts(prevState => [...prevState, newContact]);

      resetForm({
        name: '',
        number: '',
      });
    }
  };

  const handleFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const makeFiltredContacts = () => {
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const handleDelete = evtId => {
    setContacts(contacts.filter(({ id }) => id !== evtId));
  };

    return (
      <MainForm>
        <GlobalStyles />
        <MainTitle>Phonebook</MainTitle>
        <ContactForm onFormSubmit={handleSubmit} />
        <Title>Contacts</Title>
        <Filter onFilter={handleFilter} />
        <ContactList
          contacts={contacts}
          filteredContacts={makeFiltredContacts()}
          onDelete={handleDelete}
        />
      </MainForm>
    );
  }