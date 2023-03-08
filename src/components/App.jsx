import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';

export function App() {
  const contactFirst = () => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  };
  const [contacts, setContacts] = useState(contactFirst());
  const [filterName, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const alertName = () => {
    return contacts.map(contact => contact.name);
  };

  const deleteContacts = contactsID => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactsID)
    );
  };

  const filterOnChange = event => {
    setFilter(event.currentTarget.value);
  };

  const formSubmitHandler = data => {
    if (alertName().includes(data.name)) {
      alert(`${data.name} is already in your contact`);
      return;
    }

    const addContacts = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    setContacts(prevState => [addContacts, ...prevState]);
  };
  const normalizedFilter = filterName.toLowerCase();
  console.log(contacts);
  const visibleName = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  console.log(visibleName);

  return (
    <div>
      <h2>Phonebook</h2>

      <ContactForm onSubmit={formSubmitHandler}></ContactForm>

      <h3>Contacts</h3>

      <Filter value={filterName} onChange={filterOnChange} />

      <ContactList contacts={visibleName} onDeleteContact={deleteContacts} />
    </div>
  );
}
