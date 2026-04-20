# 📝 Système de Gestion de Contenu

## Vue d'ensemble

Le système de gestion de contenu de Dons Du Son est basé sur des **fichiers JSON**, pas sur une base de données ou localStorage. Cela signifie:

✅ **Avantages:**
- Les modifications sont sauvegardées dans le **code du projet** (fichier `public/data.json`)
- Compatible avec Vercel (hosting statique)
- Pas de backend à gérer
- Contrôle de version avec Git
- Les modifications sont visibles pour **tous les utilisateurs** après déploiement

## Architecture

```
┌─────────────────────────────────────────┐
│  Admin Panel (navigateur)               │
│  npm run dev - localhost:5173           │
└─────────────────┬───────────────────────┘
                  │
                  │ Modifications
                  ↓
┌─────────────────────────────────────────┐
│  Vite Dev Server (port 5173)            │
│  Proxy: /api → localhost:3001           │
└─────────────────┬───────────────────────┘
                  │
                  │ POST /api/save-content
                  ↓
┌─────────────────────────────────────────┐
│  API Server (server.js - port 3001)     │
│  Lance automatiquement avec Vite         │
└─────────────────┬───────────────────────┘
                  │
                  │ Écrit
                  ↓
┌─────────────────────────────────────────┐
│  public/data.json                       │
│  (données du site)                      │
└─────────────────────────────────────────┘
                  │
                  │ git add, commit, push
                  ↓
┌─────────────────────────────────────────┐
│  GitHub Repository                      │
└─────────────────┬───────────────────────┘
                  │
                  │ Auto-déploie
                  ↓
┌─────────────────────────────────────────┐
│  Vercel (Production)                    │
│  Site en direct → data.json             │
└─────────────────────────────────────────┘
```

## 🚀 Démarrage local

### 1. Lancer le développement

```bash
npm run dev
```

Cela démarre automatiquement:
- ✅ Vite Dev Server sur `http://localhost:5173`
- ✅ API Server sur `http://localhost:3001`

### 2. Aller à l'admin

1. Ouvrez `http://localhost:5173`
2. Allez à **Admin Panel**
3. Activez **Edit Mode** (mode édition)
4. Modifiez le contenu que vous souhaitez

### 3. Sauvegarder

Cliquez sur le bouton **"Enregistrer tous les paramètres"** (ou "Enregistrer les modifications")

→ Cela écrit les changements dans **`public/data.json`**

## 📦 Workflow Git

### Première fois (après modifications)

```bash
# Vérifier les changements
git status

# Ajouter le fichier data.json
git add public/data.json

# Créer un commit
git commit -m "Update: Modify Notre Impact stats"

# Envoyer à GitHub
git push origin main
```

### Chaque fois après modifications

```bash
# 1. Faire les modifications dans l'admin
# 2. Cliquer sur "Enregistrer"
# 3. Puis dans le terminal:

git add public/data.json
git commit -m "Update: [description des changements]"
git push origin main

# ✅ Vercel redéploie automatiquement!
```

### Exemples de messages de commit

```bash
git commit -m "Update: Augmenter les années d'expérience de 4 à 5"
git commit -m "Update: Modifier titre du manifeste"
git commit -m "Add: Nouveau projet réalisé"
git commit -m "Fix: Corriger typo dans la section Contact"
```

## 📝 Structure de data.json

Le fichier `public/data.json` contient:

```json
{
  "home": {
    "hero": { ... },
    "manifesto": { ... },
    "stats": [ ... ],
    "services": [ ... ]
  },
  "association": { ... },
  "contact": { ... },
  "join": { ... },
  "support": { ... },
  "projects": [ ... ],
  "events": [ ... ],
  "rentalRequests": [ ... ],
  "settings": { ... }
}
```

## 🔄 Flux complet

### Scénario: Modifier les stats "Notre Impact"

**Localement (développement):**
1. `npm run dev` → Lance les serveurs
2. Aller à Admin → Home → Notre Impact
3. Modifier "Années d'expérience" de `4` à `5`
4. Cliquer "Enregistrer"
5. ✅ `public/data.json` est modifié localement

**Git:**
```bash
git status  # Voit public/data.json modifié
git add public/data.json
git commit -m "Update: Années d'expérience 5"
git push origin main
```

**Vercel:**
- GitHub déclenche webhook
- Vercel redéploie le site
- Tous les visiteurs voient le changement ✅

## ⚙️ Fichiers clés du système

| Fichier | Rôle |
|---------|------|
| `public/data.json` | 📦 **Données du site** (source unique de vérité) |
| `server.js` | 🖥️ **API Server** - Sauvegarde les changements |
| `vite-api-plugin.js` | ⚙️ **Plugin Vite** - Lance le serveur auto |
| `vite.config.ts` | 🔌 **Config Vite** - Proxy API |
| `src/lib/content-store.ts` | 📚 **Chargement data** - Lit `/data.json` |
| `src/app/context/EditorContext.tsx` | 🎛️ **Gestion état** - État React |

## 🔍 Dépannage

### Le serveur API ne démarre pas

```bash
# Vérifier si le port 3001 est libre
# Sur Windows, tuer le processus qui utilise le port 3001
netstat -ano | findstr :3001

# Ou simplement utiliser un autre port dans server.js
```

### Les modifications ne s'enregistrent pas

1. Vérifier dans la console du navigateur (F12) pour les erreurs
2. Vérifier que le API server est bien lancé (message dans terminal)
3. Vérifier les permissions sur le fichier `public/data.json`

### Annuler les modifications non sauvegardées

Dans Admin → Paramètres:
- Cliquez sur **"Réinitialiser tout le site"**
- Confirmer l'action
- Le site recharge avec les dernières données

### Annuler un commit après push

```bash
# Si vous venez de push et voulez annuler
git revert HEAD
git push origin main

# Ou si personne n'a pull:
git reset --soft HEAD~1
# (Revenez en arrière sans perte de data)
```

## 📱 Production sur Vercel

**Aucune configuration spéciale requise!**

1. `public/data.json` est inclus dans le build
2. Vercel sert le site statique
3. Les données sont chargées depuis `/data.json` en client-side

→ Chaque visite charge les données actuelles ✅

## 🎯 Points importants

⚠️ **À retenir:**
- Ne modifiez **jamais** `public/data.json` manuellement en Git
- Utilisez **toujours** l'Admin Panel pour les modifications
- Les changements en local restent **en local** jusqu'au commit + push
- Après push, le site se redéploie automatiquement sur Vercel

✅ **À faire:**
- Modifiez via Admin Panel
- Sauvegardez
- Committez et pushez
- C'est tout! 🚀

## 📚 Ressources

- [Admin Panel Guide](./README.md#admin-panel)
- [Vercel Deployment Docs](https://vercel.com/docs)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)