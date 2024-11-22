import React, { useState } from 'react';
import './AddAccount.css';

function AddAccount({ addAccount, navigateBack }) {
    const [newAccount, setNewAccount] = useState({
        id: '',
        solde: '',
        dateCreation: '',
        type: 'COURANT', 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAccount((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newAccount.id && newAccount.solde && newAccount.dateCreation) {
            addAccount(newAccount);
            alert('Compte ajouté avec succès !');
            navigateBack();
        } else {
            alert('Veuillez remplir tous les champs !');
        }
    };

    return (
        <div className="add-account-container">
            <h1>Ajouter un Nouveau Compte</h1>
            <form onSubmit={handleSubmit} className="add-account-form">
                <div className="form-group">
                    <label>ID :</label>
                    <input
                        type="text"
                        name="id"
                        placeholder="ID"
                        value={newAccount.id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Solde :</label>
                    <input
                        type="number"
                        name="solde"
                        placeholder="Solde"
                        value={newAccount.solde}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date de Création :</label>
                    <input
                        type="date"
                        name="dateCreation"
                        value={newAccount.dateCreation}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Type de Compte :</label>
                    <select name="type" value={newAccount.type} onChange={handleChange}>
                        <option value="COURANT">Courant</option>
                        <option value="EPARGNE">Épargne</option>
                    </select>
                </div>
                <button type="submit" className="add-button">Ajouter</button>
                <button type="button" className="cancel-button" onClick={navigateBack}>
                    Annuler
                </button>
            </form>
        </div>
    );
}

export default AddAccount;
