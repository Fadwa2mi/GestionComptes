import React from 'react';
import './Home.css'; 
function Home({ navigateToAccounts }) {
    return (
        <div className="home-container">
            <h1>Bienvenue dans votre Gestionnaire de Comptes</h1>
            <p>
                Gérez vos comptes bancaires efficacement avec des outils intuitifs et modernes.
            </p>
            <button className="start-button" onClick={navigateToAccounts}>
                <span>Accéder à vos comptes →</span>
            </button>
        </div>
    );
}

export default Home;
