import css from '../ContactList/ContactList.module.css';
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={css.list}>
    {contacts.map(contact => {
      return (
        <li className={css.item} key={contact.id}>
          {contact.name} : {contact.number}
          <button
            className={css.item__button}
            onClick={() => onDeleteContact(contact.id)}
          >
            Видалити
          </button>
        </li>
      );
    })}
  </ul>
);

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
};
