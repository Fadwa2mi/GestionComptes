import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ACCOUNTS, ADD_ACCOUNT, DELETE_ACCOUNT, ADD_TRANSACTION } from './queries';
import Home from './components/Home';
import AccountList from './components/AccountList';
import AddAccount from './components/AddAccount';
import Transactions from './components/Transactions';

function App() {
  const { data, loading, error } = useQuery(GET_ACCOUNTS);
  const [addAccountMutation] = useMutation(ADD_ACCOUNT);
  const [deleteAccountMutation] = useMutation(DELETE_ACCOUNT);
  const [addTransactionMutation] = useMutation(ADD_TRANSACTION);

  const [page, setPage] = useState('home');
  const [selectedAccount, setSelectedAccount] = useState(null);

  if (loading) return <p>Chargement des comptes...</p>;
  if (error) return <p>Erreur lors du chargement des comptes : {error.message}</p>;

  const accounts = data?.accounts || [];

  // Ajouter un compte
  const addAccount = (newAccount) => {
    addAccountMutation({
      variables: newAccount,
      refetchQueries: [{ query: GET_ACCOUNTS }],
    });
  };

  // Supprimer un compte
  const deleteAccount = (id) => {
    deleteAccountMutation({
      variables: { id },
      refetchQueries: [{ query: GET_ACCOUNTS }],
    });
  };

  // Ajouter une transaction
  const addTransaction = (id, montant) => {
    addTransactionMutation({
      variables: { id, montant },
      refetchQueries: [{ query: GET_ACCOUNTS }],
    });
  };

  return (
    <div>
      {page === 'home' && <Home navigateToAccounts={() => setPage('accounts')} />}
      {page === 'accounts' && (
        <AccountList
          accounts={accounts}
          navigateToAddAccount={() => setPage('addAccount')}
          onDeleteAccount={deleteAccount}
          onViewTransactions={(account) => {
            setSelectedAccount(account);
            setPage('transactions');
          }}
        />
      )}
      {page === 'addAccount' && (
        <AddAccount
          addAccount={addAccount}
          navigateBack={() => setPage('accounts')}
        />
      )}
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
