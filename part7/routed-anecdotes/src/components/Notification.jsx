import PropTypes from 'prop-types';

const Notification = ({ notification }) => {
  const notificationStyle = {
    border: '1px solid black',
    padding: '10px',
    margin: '10px',
    borderRadius: '5px',
    color: 'black',
  };

  return notification.length > 0 ? (
    <div style={notificationStyle}>{notification}</div>
  ) : (
    <div></div>
  );
};

Notification.propTypes = {
  notification: PropTypes.string,
};

export default Notification;
