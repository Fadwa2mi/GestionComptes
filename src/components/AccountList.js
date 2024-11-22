import React, { useState } from 'react';
import './AccountList.css';

function AccountList({
    accounts = [], // Par défaut, accounts est un tableau vide pour éviter les erreurs
    filterAccounts,
    navigateToAddAccount,
    onDeleteAccount,
    onViewTransactions,
}) {
    const [filter, setFilter] = useState('');

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);
        filterAccounts(value); // Appeler la fonction de filtrage passée par les props
    };

    return (
        <div className="account-list-container">
            <h1>Liste des Comptes</h1>

            {/* Barre de recherche et bouton d'ajout */}
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Rechercher un compte par ID"
                    value={filter}
                    onChange={handleFilterChange}
                    className="filter-input"
                />
                <button className="add-button" onClick={navigateToAddAccount}>
                    Ajouter un compte
                </button>
            </div>

            {/* Liste des comptes */}
            {accounts.length === 0 ? (
                <p className="no-accounts-message">Aucun compte disponible.</p>
            ) : (
                <ul className="account-list">
                    {accounts.map((account) => (
                        <li key={account.id} className="account-item">
                            <span>
                                <strong>ID :</strong> {account.id} | <strong>Solde :</strong> {account.solde} € |{' '}
                                <strong>Type :</strong> {account.type}
                            </span>
                            <div className="account-actions">
                                <button
                                    className="delete-button"
                                    onClick={() => {
                                        if (
                                            window.confirm(
                                                `Êtes-vous sûr de vouloir supprimer le compte ${account.id} ?`
                                            )
                                        ) {
                                            onDeleteAccount(account.id); // Appeler la fonction de suppression
                                        }
                                    }}
                                >
                                    Supprimer
                                </button>
                                <button
                                    className="transaction-button"
                                    onClick={() => onViewTransactions(account)}
                                >
                                    Transactions
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AccountList;
