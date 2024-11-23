import React from 'react';
import './AccountList.css';

function AccountList({ accounts, navigateToAddAccount, onDeleteAccount, onViewTransactions }) {
    return (
        <div className="account-list-container">
            <h1>Liste des Comptes</h1>
            <button className="add-button" onClick={navigateToAddAccount}>
                Ajouter un compte
            </button>
            <ul className="account-list">
                {accounts.map((account) => (
                    <li key={account.id} className="account-item">
                        <span>
                            <strong>ID :</strong> {account.id} | <strong>Solde :</strong> {account.solde} € |{' '}
                            <strong>Type :</strong> {account.type}
                        </span>
                        <div>
                            <button onClick={() => onDeleteAccount(account.id)}>Supprimer</button>
                            <button onClick={() => onViewTransactions(account)}>Transactions</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AccountList;
