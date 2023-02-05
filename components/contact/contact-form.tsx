import { ContactNotification, RequestStatus } from '@/types/notification';
import { FC, FormEventHandler, useEffect, useState } from 'react';
import Notification from '../ui/notification';
import classes from './contact-form.module.css';

const sendContentData = async (
  enteredEmail: string,
  enteredName: string,
  enteredMessage: string
): Promise<{ message: string }> => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify({
      email: enteredEmail,
      name: enteredName,
      message: enteredMessage,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: { message: string } = await response.json();

  if (!response.ok) {
    throw new Error('something went wrong');
  }

  return data;
};

const ContactForm: FC = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState<RequestStatus | null>(
    null
  );

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const sendMessageHandler: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    setRequestStatus('pending');

    try {
      const data = await sendContentData(
        enteredEmail,
        enteredName,
        enteredMessage
      );
      setRequestStatus('success');
    } catch (error) {
      setRequestStatus('error');
    }
  };

  let notification: ContactNotification | null = null;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message',
      message: 'Your message is in its way',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message has been sent successfully',
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: 'Something went wrong',
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.currentTarget.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.currentTarget.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your message</label>
          <textarea
            name="message"
            id="message"
            rows={5}
            value={enteredMessage}
            required
            onChange={(event) => setEnteredMessage(event.currentTarget.value)}
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button>Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          message={notification.message}
          title={notification.title}
          status={notification.status}
        />
      )}
    </section>
  );
};

export default ContactForm;
