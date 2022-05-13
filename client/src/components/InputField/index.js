import style from './style.module.css';

function InputField({ inputValue, onChange }) {
  return (
    <div className={style.InputField}>
      <input
        className={style.InputField__input}
        value={inputValue}
        type='number'
        required
        onChange={onChange}
      />
      <span className={style.InputField__errorMessage}></span>
    </div>
  );
}

export default InputField;
