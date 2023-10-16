import { useState } from 'react';
import { Form } from './ContactForm.styled';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/thunk';
import { selectContactsArray } from 'redux/contactSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(selectContactsArray);

  const addContactToStore = contact => dispatch(addContact(contact));

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'phone':
        setPhone(value);
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
      toast.error(`${name} is already in contacts`, {
        position: 'top-right',
        autoClose: 1500,
      });
    } else {
      const newContact = {
        name,
        phone,
      };
      addContactToStore(newContact);
      reset();
    }
  };

  const reset = () => {
    setName('');
    setPhone('');
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
          name="phone"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={handleInputChange}
          value={phone}
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </Form>
  );
};
