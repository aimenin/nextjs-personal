import { FC } from 'react';
import ReactDOM from 'react-dom';
import { ContactNotification } from '@/types/notification';

import classes from './notification.module.css';

const Notification: FC<ContactNotification> = ({ title, message, status }) => {
  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById('notifications') as HTMLElement
  );
};

export default Notification;
