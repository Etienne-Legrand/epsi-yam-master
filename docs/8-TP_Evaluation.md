<img src="src/logo-epsi2.png" width="30%" height="10%"/>  

## **EPSI BORDEAUX - I1 EISI**

# Module Atelier - Architecture applicative (8/9)

| Code Module   | Durée | Titre Diplôme         | Bloc de Compétences      | Promotion      | Auteur  |
|--------------|-------------|-----------------------|-------------------------|------------------------|--------|
| ARCE842 - DEVE702   | 20h   | EISI / RNCP 35584 | Concevoir & Développer des solutions applicatives métiers      | 2023/2024      | Julien COURAUD   |

# 14. TP Evaluation Finale

Vous avez désormais un socle solide pour finir le moteur de jeu et améliorer le contenu de l'application.

IMPORTANT: Tout le projet rendu devra pouvoir s'exécuter en local ! Si vous souhaitez externaliser certaines parties, le code doit pouvoir être exécutable (serveur local) ou accessible en ligne "fetch http".

Vous serez évalué, dans le cadre du module de 20h, sur les fonctionnalités suivantes:

### Fonctionnalités obligatoires (14 pts)

- Finition du moteur du jeu (6 pts)

  - Vous implémenterez dans un premier temps la gestion des scores tel qu'expliqué dans les règles données au début du module.

  - Puis vous implémenterez la gestion des 12 pions (tokens) disponibles pour chacun des joueurs. (à chaque fois qu'un joueur pose un pion, on decrémente).
  - Lorsque qu'un utilisateur pose un pion sur la grille de jeu, un check est effectué sur les conditions de victoires potentielles (lignes verticales/horizontales/diagonales ou un des joueurs n'a plus de pions).
  - L'information est transmise à la partie Client qui affiche une page de "Résumé de la partie" avec le vainqueur, le perdant, les scores, et ce que vous voulez..
  - Vous déciderez ensuite du workflow utilisateur que vous souhaitez mettre en place donc à la fin d'une partie: retour au menu, relancer, etc..
  - (OPTIONNEL) Vous pouvez également implémenter la logique de jeu et d'interface de la combinaison "Défi" (bouton Défi au 2e lancer pour annoncer une figure) et "Yam Prédator" (enlever un pion à l'adversaire).


- Développement du mode "VS Bot" (8 pts)

  - Vous utiliserez le socle existant pour coder le mode Vs-Bot.

  - Ce mode de jeu sera au maximum factorisé avec le mode de jeu en ligne (besoin d'un nouveau createGameVsBot mais beaucoup de méthodes peuvent être réutilisées).

  - Des indications et conseils seront donnés plus tard si besoin dans un dernier support.


### Fonctionnalités au choix - au moins une à développer (6 pts)

- Amélioration significative de l'interface graphique ("effet whouaaaaaa" requis).

- Contexte utilisateur authentifié et possibilité de sauvegarder les parties (BDD locale Docker ou API Rest disponible en ligne).

### Repo Github Steps jusqu'au 7

https://github.com/juliencouraud/yam-master-project-steps
