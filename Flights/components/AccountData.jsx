import React, { useState, useEffect } from 'react';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';

export default function AccountData() {
  const oldUsername = "Jeff"
  const oldPassword = "*********"
  const email = "Jeff@icloud.com"
  const [newPassword, setNewPassword] = useState('');
  const [newUsername, setNewUsername] = useState('')



  return (
    <div className='m-7'>
      <div>
        <h2>Ihre Accountdaten:</h2>
        <p>Ihr Benutzername: {oldUsername}</p>
        <p>Ihre E-Mail: {email}</p>
        <p>Ihr Passwort: {oldPassword}</p>
      </div>
      <div>

      <div className="flex flex-column gap-2">
                    <label htmlFor="username">E-Mail</label>
                    <InputText id="username" aria-describedby="username-help" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                    <small id="username-help">
                        Geben Sie Ihre E-Mail ein.
                    </small>
                </div>

        <div className='flex flex-column gap-2'>
          <label htmlFor="password">Passwort ändern</label>
          <Password id="password" toggleMask value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
            promptLabel="Wähle ein Passwort" feedback={false} />
          <small id="password-help">
            Geben Sie Ihr neues Passwort ein.
          </small>


        </div>
      </div>
    </div>
  );
}
