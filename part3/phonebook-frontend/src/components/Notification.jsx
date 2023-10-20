import React from 'react';

const Notification = ({ notificationMessage }) => {
  if (notificationMessage.message === null) {
    return <></>;
  } else {
    return (
      <div className={notificationMessage.alertClass}>
        {notificationMessage.message}
      </div>
    );
  }
};

export default Notification;
