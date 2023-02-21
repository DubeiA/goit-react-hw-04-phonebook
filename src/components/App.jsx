import {useState, useEffect} from 'react'
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from './Filter/Filter'
import { ContactList } from "./ContactList/ContactList";
import { nanoid } from 'nanoid'
// import PropTypes from 'prop-types'


export function App() {
  
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? '';
  });
  const [filterName, setFilter] = useState('');

  useEffect(() => { 
  window.localStorage.setItem('contacts' , JSON.stringify(contacts))
},[contacts] )

  const alertName = () => { 
    
    return contacts.map(contact => contact.name)
    
  }

 const deleteContacts = contactsID => { 
    setContacts(prevContacts => (prevContacts.filter(contact => contact.id !== contactsID)))
 }
  
const filterOnChange = event => { 
    setFilter(event.currentTarget.value)
}
  
const formSubmitHandler = data => {
    if (alertName().includes(data.name)) {
     
      alert(`${data.name} is already in your contact`)
      return
    }
    
    const addContacts = {
      id: nanoid(),
      name: data.name,
      number: data.number
    }

    setContacts(prevState => 
     [addContacts, ...prevState]
    )
   
  }
  const normalizedFilter = filterName.toLowerCase();
  

  const visibleName = contacts.filter(contact => 
    contact.name.toLowerCase().includes(normalizedFilter))

  
  return (
      <div
       style={{
        
        marginLeft: '40px',
         width:'400px',
        fontSize: 24,
        color: '#010101'
        }}>
        

        <h2>Phonebook</h2>

       <ContactForm onSubmit={formSubmitHandler}></ContactForm>

        <h3>Contacts</h3>

        <Filter value={filterName} onChange={filterOnChange} />

        <ContactList contacts={visibleName} onDeleteContact={deleteContacts} />
        
      </div>
    )
}

