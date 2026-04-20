# 🎵 Site Dons Du Son - Documentation Complète

Bienvenue! Ce document vous guide à travers tous les aspects du site.

## 📚 Documentation par Rôle

### 👥 Je suis un Utilisateur Normal
- Consultez simplement le site public: https://donsduson.vercel.app

### ✏️ Je dois Modifier le Contenu (Non-Développeur)

**Commencez par:**
1. `START_HERE.md` ← Lire EN PREMIER (5 min)
2. `GUIDE_SIMPLE.md` ← Comment modifier le contenu
3. `README_EDITEURS.md` ← Guide complet avec exemples

### 👨‍💻 Je suis Développeur / Technicien

**Consultez:**
1. `CONTENT_MANAGEMENT.md` ← Architecture technique
2. `DEPLOYMENT_CHECKLIST.md` ← Avant de transmettre
3. Code source: `src/` dossier

---

## 🚀 Démarrage Rapide (30 secondes)

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le développement
npm run dev

# 3. Ouvrir le navigateur
# http://localhost:5173
```

**C'est tout!** Le site démarre automatiquement.

---

## 📁 Structure du Projet

```
dds_v2/
├── 📖 Documentation
│   ├── README.md                    ← Le fichier original du projet
│   ├── README_MAIN.md              ← Vous êtes ici!
│   ├── START_HERE.md               ← Pour débuter rapidement
│   ├── GUIDE_SIMPLE.md             ← Guide non-tech
│   ├── README_EDITEURS.md          ← Guide complet transmission
│   ├── DEPLOYMENT_CHECKLIST.md     ← Checklist déploiement
│   └── CONTENT_MANAGEMENT.md       ← Détails techniques
│
├── 📦 Code Source
│   ├── public/
│   │   └── data.json               ← LES DONNÉES À MODIFIER!
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/              ← Pages du site
│   │   │   ├── components/         ← Composants réutilisables
│   │   │   └── context/            ← Gestion d'état
│   │   └── lib/
│   │       └── content-store.ts    ← Chargement des données
│   │
│   ├── package.json                ← Dépendances
│   ├── vite.config.ts              ← Configuration Vite
│   ├── tsconfig.json               ← Configuration TypeScript
│   ├── server.js                   ← API Server local
│   └── vite-api-plugin.js          ← Plugin Vite
```

---

## 🎯 Cas d'Usage Courants

### "Je veux modifier le titre de la page d'accueil"

```
1. Lire: START_HERE.md (sec 4)
2. Mode édition → Accueil
3. Survolez le titre → Crayon ✏️
4. Modifiez
5. Enregistrez (Dashboard)
6. git push
```

### "Je veux ajouter un nouvel événement"

```
1. Mode édition → Événements
2. Cherchez la section pour ajouter
3. Remplissez les informations
4. Enregistrez
5. git push
```

### "Je veux voir comment les données sont organisées"

```
1. Ouvrir: public/data.json
2. C'est un fichier JSON normal
3. Modifiez comme bon vous semble
4. Sauvegardez
5. Le site recharge automatiquement
```

### "Le site ne fonctionne pas"

```
1. Lire: DEPLOYMENT_CHECKLIST.md (section Problèmes)
2. Contacter le développeur
```

---

## 🔄 Workflow Résumé

```
┌─────────────────────────────────────┐
│  1. npm run dev                     │
│     (Site sur localhost:5173)       │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│  2. Mode Édition + Modifications    │
│     (Cliquez sur texte → Modifiez)  │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│  3. Enregistrer                     │
│     (Dashboard → Enregistrer)       │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│  4. Git Push                        │
│     (git add, commit, push)         │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│  5. Vercel Redéploie                │
│     (Automatique!)                  │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│  6. Production à Jour               │
│     (Tous les utilisateurs voient)  │
└─────────────────────────────────────┘
```

---

## 🛠️ Commandes Utiles

```bash
# Démarrer le développement
npm run dev

# Arrêter le serveur
Ctrl+C

# Construire pour production
npm run build

# Publier les modifications
git add public/data.json
git commit -m "Update: [description]"
git push origin main

# Voir l'historique
git log --oneline

# Annuler le dernier commit
git reset --soft HEAD~1
```

---

## 🔐 Sécurité & Bonnes Pratiques

### ✅ À FAIRE
- ✅ Enregistrer régulièrement vos modifications
- ✅ Tester avant de publier
- ✅ Écrire des messages de commit clairs
- ✅ Gardez les identifiants secrets
- ✅ Backupez régulièrement (Git le fait!)

### ❌ À NE PAS FAIRE
- ❌ Ne modifiez pas `src/` (code React)
- ❌ Ne supprimez pas de fichiers
- ❌ Ne fermez pas sans enregistrer
- ❌ Ne partagez pas vos identifiants
- ❌ Ne publiez pas directement sur Vercel

---

## 📞 Support

### Problèmes Courants

| Problème | Solution |
|----------|----------|
| Server ne démarre | Redémarrer l'ordinateur |
| Mode édition n'apparaît pas | Rafraîchir (Ctrl+R) |
| Modifications perdues | Relire START_HERE.md sec 4 |
| Git error | Voir README_EDITEURS.md |

### Contacter l'Équipe

- **Développeur:** [Email/Téléphone - À REMPLIR]
- **Support:** [Email/Téléphone - À REMPLIR]
- **Urgence:** [Contact - À REMPLIR]

---

## 📚 Ressources

- [Git Documentation](https://git-scm.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Node.js Documentation](https://nodejs.org/)

---

## 🎓 Formation

### Pour Utilisateurs Normaux
- Rien à savoir! Juste consulter le site.

### Pour Éditeurs de Contenu
- Lire `START_HERE.md` (5 min)
- Lire `GUIDE_SIMPLE.md` (10 min)
- Pratiquer quelques modifications
- Vous êtes prêt!

### Pour Développeurs
- Cloner le repo
- Lire `CONTENT_MANAGEMENT.md`
- Explorer le code
- Modifier comme bon vous semble

---

## 🚀 Déploiement sur Vercel

### Configuration Requise
- ✅ Compte Vercel créé
- ✅ GitHub connecté à Vercel
- ✅ Repository public ou privé avec accès

### Déploiement Automatique
```
Chaque git push sur main
        ↓
GitHub webhook déclenché
        ↓
Vercel builds le projet
        ↓
Site mis à jour automatiquement
```

**Pas de configuration supplémentaire requise!**

---

## ✨ Points Clés à Retenir

1. **Les données sont dans `public/data.json`**
2. **Modifiez via l'interface ou le fichier JSON**
3. **Enregistrez avec le bouton Dashboard**
4. **Publiez avec `git push`**
5. **Vercel redéploie automatiquement**

---

## 📊 État du Projet

- ✅ Code fonctionnel
- ✅ Admin Panel opérationnel
- ✅ Documentation complète
- ✅ Système de données robuste
- ✅ Prêt pour transmission

---

## 🎉 Prochaines Étapes

### Si vous êtes Éditeur:
1. Lire `START_HERE.md`
2. Lancer `npm run dev`
3. Commencer à modifier!

### Si vous êtes Développeur:
1. Cloner le repo
2. Lire `CONTENT_MANAGEMENT.md`
3. Explorer le code
4. Faire vos modifications

### Avant Transmission:
1. Vérifier `DEPLOYMENT_CHECKLIST.md`
2. Tester complètement
3. Documenter tout
4. Transmettre avec guides

---

**Merci d'utiliser ce site! Amusez-vous! 🎵**

---

*Dernière mise à jour: [DATE]*
*Développeur responsable: [NOM]*
*Supports disponibles: [CONTACTS]*
