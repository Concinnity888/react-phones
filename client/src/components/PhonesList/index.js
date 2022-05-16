import PhonesListItem from '../PhonesListItem';
import { useGetPhonesQuery } from '../../redux';
import style from './style.module.css';

function PhonesList() {
  const { data = [], isLoading } = useGetPhonesQuery();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!isLoading && !data.length) {
    return null;
  }

  return (
    <table className={style.PhonesList}>
      <tbody className={style.PhonesList__wrapper}>
        {data.map((item) => (
          <PhonesListItem phone={item.phone} key={item.id} />
        ))}
      </tbody>
    </table>
  );
}

export default PhonesList;
