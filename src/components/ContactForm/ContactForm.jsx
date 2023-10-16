import { useState } from 'react';
import { Form } from './ContactForm.styled';

import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/thunk';
import { nanoid } from 'nanoid';
import { selectContactsArray } from 'redux/contactSlice';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(selectContactsArray);

  const addContactToStore = contact => dispatch(addContact(contact));

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const existingContact = contacts.find(
      user => user.name.toLocaleLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
      alert(`${name} is already in contacts`);
    } else {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      addContactToStore(newContact);
      reset();
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={handleInputChange}
          value={name}
          required
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="number"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={handleInputChange}
          value={number}
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </Form>
  );
};
