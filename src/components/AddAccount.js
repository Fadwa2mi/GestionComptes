import React, { useState } from 'react';

function AddAccount({ addAccount, navigateBack }) {
    const [newAccount, setNewAccount] = useState({
        id: '',
        solde: 0,
        dateCreation: '',
        type: 'COURANT',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addAccount(newAccount);
        navigateBack();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="id" placeholder="ID" onChange={(e) => setNewAccount({ ...newAccount, id: e.target.value })} />
            <input name="solde" type="number" placeholder="Solde" onChange={(e) => setNewAccount({ ...newAccount, solde: parseFloat(e.target.value) })} />
            <input name="dateCreation" type="date" onChange={(e) => setNewAccount({ ...newAccount, dateCreation: e.target.value })} />
            <select name="type" onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value })}>
                <option value="COURANT">Courant</option>
                <option value="EPARGNE">Épargne</option>
            </select>
            <button type="submit">Ajouter</button>
        </form>
    );
}

export default AddAccount;
