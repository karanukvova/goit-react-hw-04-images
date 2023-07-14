
import PropTypes from 'prop-types';
import css from  './searchbar.module.css';
import { useState } from 'react';
function Searchbar({onSubmit}) {
  const [name, setName] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    const data = name;
    await onSubmit(data);
    setName('')
  };
  const handleInputChange = event => {
    setName(event.target.value);
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          onChange={handleInputChange}
          value={name}
          type="text"
          autoComplete="off"
          required
          name="name"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;