import PropTypes from 'prop-types';
import { useContext } from 'react';
import NotificationContext from './NotificationContext';

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };
  const [notification, notificationDispatch] = useContext(NotificationContext);

  if (notification) {
    return <div style={style}>{notification}</div>;
  } else {
    return <div></div>;
  }
};

Notification.propTypes = {
  notification: PropTypes.string,
};

export default Notification;
