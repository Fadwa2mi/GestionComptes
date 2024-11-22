import React, { useState } from 'react';
import './Transactions.css';

function Transactions({ account, onAddTransaction, navigateBack }) {
    const [transactions, setTransactions] = useState([]); // Liste des transactions pour ce compte
    const [transaction, setTransaction] = useState({
        type: 'DEPOT', // Type de transaction par défaut
        montant: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const montant = parseFloat(transaction.montant);

        if (montant <= 0) {
            alert('Le montant doit être supérieur à zéro.');
            return;
        }

        // Ajouter la transaction
        const newTransaction = { ...transaction, montant, date: new Date().toLocaleString() };
        setTransactions((prev) => [...prev, newTransaction]);

        // Mettre à jour le solde du compte
        onAddTransaction(account.id, transaction.type === 'DEPOT' ? montant : -montant);

        // Réinitialiser le formulaire
        setTransaction({ type: 'DEPOT', montant: 0 });
    };

    return (
        <div className="transactions-container">
            <h1>Gestion des Transactions</h1>
            <p>
                <strong>Compte ID :</strong> {account.id} | <strong>Solde Actuel :</strong> {account.solde} €
            </p>

            {/* Formulaire pour ajouter une transaction */}
            <form onSubmit={handleSubmit} className="transaction-form">
                <div className="form-group">
                    <label>Type de Transaction :</label>
                    <select name="type" value={transaction.type} onChange={handleChange}>
                        <option value="DEPOT">Dépôt</option>
                        <option value="RETRAIT">Retrait</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Montant :</label>
                    <input
                        type="number"
                        name="montant"
                        value={transaction.montant}
                        onChange={handleChange}
                        placeholder="Montant"
                        required
                    />
                </div>
                <button type="submit" className="confirm-button">Valider</button>
            </form>

            {/* Liste des transactions */}
            <h2>Historique des Transactions</h2>
            {transactions.length === 0 ? (
                <p>Aucune transaction effectuée pour ce compte.</p>
            ) : (
                <ul className="transaction-list">
                    {transactions.map((t, index) => (
                        <li key={index} className="transaction-item">
                            <span>
                                <strong>{t.type === 'DEPOT' ? 'Dépôt' : 'Retrait'}</strong> de {t.montant} € le {t.date}
                            </span>
                        </li>
                    ))}
                </ul>
            )}

            <button onClick={navigateBack} className="back-button">Retour</button>
        </div>
    );
}

export default Transactions;
