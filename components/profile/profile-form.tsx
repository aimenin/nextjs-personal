import { FC, FormEventHandler, useState } from 'react';
import classes from './profile-form.module.css';

export type PasswordInput = {
  oldPassword: string;
  newPassword: string;
};

export interface ProfileFormProps {
  onChangePassword: (passwords: PasswordInput) => void;
}

const ProfileForm: FC<ProfileFormProps> = ({ onChangePassword }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    onChangePassword({
      oldPassword,
      newPassword,
    });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.currentTarget.value)}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input
          type="password"
          id="old-password"
          value={oldPassword}
          onChange={(event) => setOldPassword(event.currentTarget.value)}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
