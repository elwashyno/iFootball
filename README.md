
# iFootball ⚽

**iFootball** est une application dédiée à la gestion et à l'analyse des données liées au football sur la plateforme Discord (peut être réadapter en web). Ce projet vise à fournir une interface simple et efficace pour gérer les classements, organiser les matchs et accéder à des informations enrichies grâce à une API (https://www.football-data.org/).

---

## 🚀 Fonctionnalités

- **Gestion des matchs** : Ajoutez, mettez à jour et affichez les résultats des matchs.
- **Classements dynamiques** : Suivi des classements en temps réel basé sur les résultats des matchs.
- **API intégrée** : Récupération de données externes pour enrichir les fonctionnalités (exemple : statistiques des joueurs, équipes, etc.).
- **Commandes personnalisées** : Ajout de commandes via des fichiers scripts pour répondre aux besoins spécifiques.

---

## 🛠️ Installation

### Prérequis
- **Node.js** (v14 ou supérieur)
- **npm** 

### Étapes
1. **Clonez le projet** :
   ```bash
   git clone https://github.com/elwashyno/iFootball.git
   cd iFootball
   ```

2. **Installez les dépendances** :
   ```bash
   npm install
   ```
    ```bash
   npm install discord.js
   ```
     ```bash
   npm install dayjs
   ```
      ```bash
   npm install dotenv
   ```

3. **Configurez votre fichier `.env`** :
   - Créez un fichier `.env` à la racine du projet.
   - Ajoutez-y vos configurations nécessaires (voir [Configuration](#-configuration)).

4. **Démarrez l'application** :
   ```bash
   npm run start
   ``` (si il existe un script dans le json)
   ou
   ```bash
   node index.js
   ```

---

## ⚙️ Configuration

Créez un fichier `.env` à la racine du projet et ajoutez les variables suivantes :

```
API_KEY=VOTRE_CLE_API
DATABASE_URL=URL_DE_VOTRE_BASE_DE_DONNEES
ID_DISCORD = VOTRE_ID_DISCORD
```

Adaptez ces variables en fonction de vos besoins et de votre environnement.

---

## 📂 Structure du projet

Voici un aperçu de l'organisation du projet :

```
iFootball/
├── commands/
│   ├── classement.js         # Script pour gérer les classements
│   ├── match.js              # Gestion des données des matchs
│   ├── registerCommands.js   # Ajout et enregistrement de commandes personnalisées
├── utils/
│   ├── fetchAPI.js           # Module pour les appels API
├── .gitignore                # Liste des fichiers ignorés par Git
├── index.js                  # Point d'entrée principal de l'application
├── package.json              # Dépendances et scripts Node.js
├── package-lock.json         # Fichier de verrouillage des dépendances
└── README.md                 # Documentation du projet
```

---

## 👨‍💻 Contribution

Les contributions sont les bienvenues !

---


## 📞 Support

Pour toute question ou aide supplémentaire, contactez-moi via GitHub : [@elwashyno](https://github.com/elwashyno) ou par mail dhahriimad38@gmail.com.
