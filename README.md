# Expo React Native jeu Yam Master

Jeu de dés Yam master multijoueur en temps réel. Application mobile React Native avec backend Node.js, communication WebSocket et IA intégrée.

https://github.com/user-attachments/assets/300c8481-284f-4004-9d15-e980647681b3

## Prérequis

1. Node.js 18+
2. (Optionnel) App Expo SDK 51

## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Déplacez-vous dans le répertoire du projet
3. Exécutez la commande `npm run install:all` pour installer les dépendances du frontend et backend.

## Utilisation

1. Pour une utilisation mobile : ouvrez le fichier `.env` du dossier `frontend` et modifiez la variable `SOCKET_URL_MOBILE` pour pointer vers votre adresse IP.
2. Exécutez la commande `npm run dev:backend` pour démarrer le serveur backend WebSocket.
3. Exécutez la commande `npm run dev:frontend` pour démarrer l'application React Native.

## Fonctionnalités

- Deux modes de jeu : multijoueur et versus IA
- Communication temps réel via WebSocket
- Intelligence artificielle avec réseau de neurones (Brain.js)
- Niveaux de difficulté IA (facile, moyen, difficile en cours)
- Interface web et mobile
- Gestion des dés et mécaniques de jeu Yam master
- Design inspiré de la palette OIL 6 de GrafxKid (https://lospec.com/palette-list/oil-6)
- Animations réalisées avec React Reanimated

## Architecture technique

- **Frontend** : React Native avec Expo
- **Backend** : Node.js avec WebSocket
- **IA** : Brain.js pour le réseau de neurones
- **Animations** : React Reanimated
- **Design** : Maquetté sur Figma
