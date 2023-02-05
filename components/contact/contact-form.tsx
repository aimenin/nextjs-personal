import { FC, FormEventHandler, useState } from 'react';
import classes from './contact-form.module.css';

const ContactForm: FC = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');

  const sendMessageHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    fetch('/api/contact', {
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
  };

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
    </section>
  );
};

export default ContactForm;
