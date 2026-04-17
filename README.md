# 🎵 Dons Du Son (DDS) - v2.0

> Association culturelle engagée pour l'accompagnement des artistes et la diffusion de la musique.

DDS est une plateforme moderne permettant de gérer les activités de l'association, notamment la location de matériel technique (Sonorisation, Éclairage, DJ, Backline) et le suivi des projets artistiques.

## 🚀 Stack Technique

- **Frontend** : React 18 + TypeScript
- **Build Tool** : Vite 6
- **Styling** : Tailwind CSS 4 + Lucide React (Icons)
- **Routing** : React Router v7
- **Sécurité** : Système d'authentification TOTP (MFA) sans base de données, sessions sécurisées par signature cryptographique.
- **UI Components** : Radix UI / Shadcn UI

## 🔐 Sécurité & Authentification

Le projet utilise un système d'authentification **Stateless** (sans base de données) hautement sécurisé pour l'administration :
- **TOTP (Time-based One-Time Password)** : Compatible avec [TOTP.app](https://totp.app).
- **Session Signing** : Les sessions sont signées avec un grain de sel (Salt) unique pour empêcher toute modification manuelle du `sessionStorage`.
- **Auto-Kill** : Déconnexion automatique à la fermeture de l'onglet/navigateur.

## 🛠️ Installation & Développement

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd dds_v2
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   Créez un fichier `.env` à la racine :
   ```env
   VITE_AUTH_CONFIG_KEY=VOTRE_SECRET_BASE32  # Pour TOTP.app
   VITE_AUTH_ADMIN_ID=USER_NAME              # Nom d'utilisateur admin
   VITE_AUTH_SALT=VOTRE_GRAIN_DE_SEL         # Pour la signature des sessions
   ```

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

## 📂 Structure du Projet

```text
src/
├── app/
│   ├── components/    # Composants UI et Layouts
│   ├── context/       # Gestion de l'état global (Auth, etc.)
│   ├── pages/         # Pages de l'application (Public & Admin)
│   └── routes.tsx     # Configuration du routage
├── lib/               # Logique métier (Auth engine, etc.)
├── assets/            # Images et icônes
└── styles/            # Configuration CSS & Thème
```

## 🌐 Déploiement (Vercel)

Le projet est configuré pour un déploiement fluide sur Vercel :
- Les routes sont gérées via `vercel.json` pour supporter le routage SPA.
- **Important** : N'oubliez pas de configurer les variables d'environnement dans le tableau de bord Vercel (Settings > Environment Variables).

---

© 2026 Dons Du Son. Tous droits réservés.
