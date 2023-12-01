import { useSelector } from 'react-redux';

const Notification = () => {
  const { messages } = useSelector((state) => state.notification);
  return <div>{messages}</div>;
};

export default Notification;
