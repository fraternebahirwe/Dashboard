# Dashboard
# 📊 FX Budget Dashboard — Journal de Trading Intelligent

Un tableau de bord moderne, sombre et interactif conçu pour les traders indépendants (Forex, Crypto, Actions). Cette application permet de suivre ses performances en temps réel, de gérer son risque et de visualiser l'évolution de son capital à travers une interface optimisée inspirée de plateformes professionnelles comme TradingView.

🚀 **Démo en ligne :** [fratboy-techcon.vercel.app](https://fratboy-techcon.vercel.app)

---

## 📸 Aperçu de l'Interface

*Insère ici une superbe capture d'écran ou un GIF animé de ton application en action !*

---

## 🔥 Fonctionnalités Majeures

- **📈 Suivi de Performance Dynamique :** Intégration d'un graphique linéaire en temps réel (`Chart.js`) qui retrace la courbe cumulative des gains et des pertes.
- **🧠 Calculateur de Risque Automatique :** Analyse instantanée de la balance globale et calcul du **Win Rate** (Taux de réussite en %) basé sur l'historique des sessions.
- **💾 Persistance des Données (Zéro Perte) :** Sauvegarde locale automatique via l'API `LocalStorage`. Vos données restent disponibles même après fermeture ou rafraîchissement du navigateur.
- **❌ Gestion de l'Historique :** Ajout rapide de sessions avec normalisation des paires de devises en majuscules, feedback visuel coloré (Vert/Rouge) et possibilité de supprimer un trade à la volée avec recalcul instantané du tableau de bord.
- **🌙 Guide UX Interactif :** Une fenêtre d'information modale intégrée sous forme d'icône nocturne pour guider l'utilisateur pas à pas sur la saisie des données.

---

## 🛠️ Architecture & Technologies

L'objectif de ce projet était de construire une application performante, légère et rapide sans surcharger l'environnement avec des frameworks lourds.

- **HTML5 :** Structure sémantique optimisée pour l'accessibilité et la manipulation du DOM.
- **CSS3 (Variables & Grid) :** Design d'interface *Dark Mode* ultra-moderne utilisant les variables CSS pour une maintenance simplifiée, `CSS Grid` pour la mise en page asymétrique et `Flexbox` pour les composants dynamiques.
- **JavaScript Modern (ES6+) :** - Gestion asynchrone et sécurisée des scripts via `DOMContentLoaded`.
  - Manipulation avancée des structures de données (Tableaux d'objets complexes).
  - Utilisation des méthodes itératives natives : `.reduce()` pour le calcul global, `.filter()` pour l'isolement des statistiques et de la suppression, et `.forEach()` pour le rendu dynamique.
- **Chart.js :** Exploitation d'un moteur de rendu graphique vectoriel basé sur l'API `<canvas>`.

---

## 📂 Structure du Projet

```text
├── index.html          # Structure de l'application et intégration des CDN
├── style.css           # Thème graphique sombre et mise en page responsive
├── dashboard.js        # Moteur logique de l'application (Calculs, Graphique, Stockage)
└── README.md           # Documentation du projet
