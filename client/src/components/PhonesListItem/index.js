import style from './style.module.css';

function PhonesListItem({ phone }) {
  return (
    <tr className={style.PhonesListItem}>
      <td className={style.PhonesListItem__wrapper}>{phone}</td>
    </tr>
  );
}

export default PhonesListItem;
