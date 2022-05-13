import { useState, useRef } from 'react';
import { useAddPhoneMutation } from '../../redux';
import { v4 as uuid } from 'uuid';
import InputField from '../InputField';
import style from './style.module.css';

const CODES = {
  Ireland: '+353',
  Russia: '+7',
  Slovenia: '+386',
};

function Form() {
  const formEl = useRef();
  const [addPhone, { isError }] = useAddPhoneMutation();
  const [code, setCode] = useState(CODES['Russia']);
  const [phone, setPhone] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleAddPhone = (evt) => {
    evt.preventDefault();
    const newPhone = `${code} ${phone}`;
    const id = uuid();

    if (isValid) {
      addPhone({ id, phone: newPhone });
      setPhone('');
    }
  };

  const handleChangeField = (evt) => {
    setPhone(evt.target.value);
    validate(evt.target.value);
  };

  const handleChangeSelect = (evt) => {
    setCode(evt.target.value);
  };

  const validate = (value) => {
    const errorLabel = formEl.current.querySelector('span');

    if (value.length === 0) {
      errorLabel.textContent = 'Заполните обязательное поле';
      setIsValid(false);
    } else if (value.length < 3 || value.length > 10) {
      errorLabel.textContent = 'Введите корректное значение';
      setIsValid(false);
    } else {
      setIsValid(true);
      errorLabel.textContent = '';
    }
  };

  return (
    <form
      className={style.Form}
      onSubmit={handleAddPhone}
      ref={formEl}
      noValidate
    >
      <select
        className={style.Form__select}
        defaultValue={code}
        onChange={handleChangeSelect}
      >
        {Object.keys(CODES).map((country) => (
          <option value={CODES[country]} key={country}>
            {CODES[country]}
          </option>
        ))}
      </select>

      <InputField onChange={handleChangeField} inputValue={phone} />

      <button className={style.Form__btn} type='submit' disabled={!isValid}>
        Добавить
      </button>
    </form>
  );
}

export default Form;
