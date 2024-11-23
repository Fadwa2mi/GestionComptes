import { gql } from '@apollo/client';

// Requête pour récupérer tous les comptes
export const GET_ACCOUNTS = gql`
  query GetAccounts {
    accounts {
      id
      solde
      dateCreation
      type
    }
  }
`;

// Mutation pour créer un compte
export const ADD_ACCOUNT = gql`
  mutation AddAccount($id: String!, $solde: Float!, $dateCreation: String!, $type: String!) {
    addAccount(id: $id, solde: $solde, dateCreation: $dateCreation, type: $type) {
      id
      solde
      dateCreation
      type
    }
  }
`;

// Mutation pour supprimer un compte
export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount($id: String!) {
    deleteAccount(id: $id) {
      id
    }
  }
`;

// Mutation pour ajouter une transaction
export const ADD_TRANSACTION = gql`
  mutation AddTransaction($id: String!, $montant: Float!) {
    addTransaction(id: $id, montant: $montant) {
      id
      solde
    }
  }
`;
