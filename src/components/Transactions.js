import React, { useState } from 'react';
import './Transactions.css';

function Transactions({ account, onAddTransaction, navigateBack }) {
    const [transaction, setTransaction] = useState({
        type: 'DEPOT',
        montant: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const montant = transaction.type === 'DEPOT' ? parseFloat(transaction.montant) : -parseFloat(transaction.montant);
        onAddTransaction(account.id, montant);
    };

    return (
        <div className="transactions-container">
            <h1>Transactions pour le Compte {account.id}</h1>
            <form onSubmit={handleSubmit}>
                <select name="type" value={transaction.type} onChange={handleChange}>
                    <option value="DEPOT">Dépôt</option>
                    <option value="RETRAIT">Retrait</option>
                </select>
                <input
                    type="number"
                    name="montant"
                    placeholder="Montant"
                    value={transaction.montant}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Valider</button>
            </form>
            <button onClick={navigateBack}>Retour</button>
        </div>
    );
}

export default Transactions;
