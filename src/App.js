import React, { useState } from 'react';
import Home from './components/Home';
import AccountList from './components/AccountList';
import AddAccount from './components/AddAccount';
import Transactions from './components/Transactions';

function App() {
  const [accounts, setAccounts] = useState([
    { id: '1', solde: 5000, dateCreation: '2024-01-01', type: 'COURANT' },
    { id: '2', solde: 12000, dateCreation: '2023-12-15', type: 'EPARGNE' },
    { id: '3', solde: 3000, dateCreation: '2024-01-10', type: 'COURANT' },
  ]);

  const [filteredAccounts, setFilteredAccounts] = useState(accounts); // Liste des comptes affichés
  const [page, setPage] = useState('home');
  const [selectedAccount, setSelectedAccount] = useState(null);

  
  const addTransaction = (id, montant) => {
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === id ? { ...account, solde: account.solde + montant } : account
      )
    );
   
    setFilteredAccounts((prev) =>
      prev.map((account) =>
        account.id === id ? { ...account, solde: account.solde + montant } : account
      )
    );
  };

  
  const filterAccounts = (id) => {
    if (id.trim() === '') {
      setFilteredAccounts(accounts);
    } else {
      setFilteredAccounts(accounts.filter((account) => account.id.includes(id)));
    }
  };


  const deleteAccount = (id) => {
    setAccounts((prev) => prev.filter((account) => account.id !== id));
    setFilteredAccounts((prev) => prev.filter((account) => account.id !== id)); 
  };

  return (
    <div>
      {/* Page d'accueil */}
      {page === 'home' && <Home navigateToAccounts={() => setPage('accounts')} />}

      {/* Liste des comptes */}
      {page === 'accounts' && (
        <AccountList
          accounts={filteredAccounts} 
          filterAccounts={filterAccounts} 
          navigateToAddAccount={() => setPage('addAccount')}
          onDeleteAccount={deleteAccount}
          onViewTransactions={(account) => {
            setSelectedAccount(account);
            setPage('transactions');
          }}
        />
      )}

      {/* Page pour ajouter un compte */}
      {page === 'addAccount' && (
        <AddAccount
          addAccount={(newAccount) => {
            setAccounts((prev) => [...prev, newAccount]);
            setFilteredAccounts((prev) => [...prev, newAccount]); // Mettre à jour les comptes affichés
          }}
          navigateBack={() => setPage('accounts')}
        />
      )}

      {/* Gestion des transactions */}
      {page === 'transactions' && selectedAccount && (
        <Transactions
          account={selectedAccount}
          onAddTransaction={addTransaction}
          navigateBack={() => setPage('accounts')}
        />
      )}
    </div>
  );
}

export default App;
