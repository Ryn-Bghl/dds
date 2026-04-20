# 📖 GUIDE DE TRANSMISSION DU SITE - DONS DU SON

## 👋 Bienvenue!

Ce document explique **tout ce que vous devez savoir** pour modifier et maintenir le site **sans avoir besoin de coder**.

**Vous avez 3 choses à faire:**
1. ✅ Modifier le contenu via l'interface
2. ✅ Enregistrer les modifications
3. ✅ Quelques commandes Git simples (expliquées ici)

---

## 🎯 Vue d'ensemble

### Comment ça marche?

```
Vous en local                    Serveur Production (Vercel)
┌──────────────────┐            ┌─────────────────────┐
│ 1. npm run dev   │            │ Site en direct      │
│ 2. Modifiez      │            │ Tout le monde voit  │
│ 3. Enregistrez   │            └─────────────────────┘
│ 4. git push      │────────────────────────┐
└──────────────────┘                        │
                                            ↓
                                   Vercel redéploie
                                   (Automatique!)
```

**En clair:** 
- Vous modifiez localement
- Vous poussez sur GitHub
- Vercel met à jour automatiquement

---

## 🚀 DÉMARRAGE - Première fois

### Étape 1: Installer le projet

```bash
# 1. Clonez le projet (une seule fois)
git clone https://github.com/DonsDuSon/website.git
cd website/dds_v2

# 2. Installez les dépendances (une seule fois)
npm install

# 3. Lancez le développement
npm run dev
```

**Vous verrez:**
```
  ✓ Vite Dev Server running on http://localhost:5173
  🎵 Development API server running on http://localhost:3001
```

Gardez ce terminal ouvert! ✅

### Étape 2: Accéder au site

1. Ouvrez votre navigateur
2. Allez à: **http://localhost:5173**
3. Le site s'affiche! 🎉

### Étape 3: Se connecter à l'admin

1. Cliquez sur **"Admin"** (en bas du site ou dans le menu)
2. Entrez vos identifiants
3. Vous êtes dans le tableau de bord! ✅

---

## ✏️ MODIFIER LE CONTENU

### Méthode 1: Mode Édition Graphique (Recommandé)

**Étape 1: Activer le mode édition**
```
1. Dashboard → Bouton "Activer le Mode Édition" (orange)
2. Le mode s'active (vous verrez une confirmation)
```

**Étape 2: Modifier n'importe où**
```
1. Allez sur la page à modifier (Accueil, Association, etc.)
2. Survolez le texte que vous voulez modifier
3. Un petit crayon ✏️ apparaît
4. Cliquez dessus
5. Modifiez le texte dans la boîte
6. Cliquez la coche verte ✓
```

**Étape 3: Enregistrer**
```
1. Quand vous avez fini toutes les modifications
2. Dashboard → Bouton "Enregistrer les modifications" (vert)
3. Attendez le message: "Modifications enregistrées!" ✅
```

### Méthode 2: Éditer le fichier JSON directement

**Si vous êtes à l'aise avec les fichiers:**

```bash
1. Ouvrez le fichier: public/data.json
2. Modifiez les valeurs
3. Sauvegardez le fichier (Ctrl+S)
4. Le site recharge automatiquement!
```

**Exemple:**
```json
// Avant:
"title": "Donnons du son à vos projets artistiques"

// Après:
"title": "Notre nouvelle association musicale"
```

---

## 📤 PUBLIER VOS MODIFICATIONS

### Après avoir modifié et enregistré:

**Étape 1: Préparer les changements**
```bash
git add public/data.json
```

**Étape 2: Créer un commit**
```bash
git commit -m "Update: [décrire ce que vous avez changé]"
```

**Exemples de messages:**
```bash
git commit -m "Update: Augmenter années d'expérience à 5"
git commit -m "Update: Modifier titre de la page d'accueil"
git commit -m "Add: Nouvel événement en juin"
git commit -m "Fix: Corriger typo dans la section Contact"
```

**Étape 3: Pousser sur GitHub**
```bash
git push origin main
```

**C'est tout!** ✅

Vercel verra la modification et redéploiera automatiquement le site.

---

## ⏱️ WORKFLOW QUOTIDIEN

### Matin: Commencer une session

```bash
# Terminal 1: Lancer le serveur de dev
npm run dev

# Laissez tourner! Allez à http://localhost:5173
```

### Pendant la journée: Modifier

```
1. Modifier via l'interface ou JSON
2. Enregistrer les modifications
3. Tester sur http://localhost:5173
```

### À la fin: Publier

```bash
git add public/data.json
git commit -m "Update: [description]"
git push origin main
```

### Avant de partir

```bash
# Arrêtez le serveur (Ctrl+C dans le terminal)
```

---

## 📋 EXEMPLES CONCRETS

### Exemple 1: Modifier "Notre Impact"

```
1. npm run dev (si pas lancé)
2. http://localhost:5173
3. Accueil → "Mode Édition" → Activation
4. Page d'accueil → Section "Notre Impact"
5. Survolez "4" (années d'expérience) → Crayon ✏️
6. Cliquez → Modifiez "4" en "10"
7. Cliquez ✓
8. Dashboard → "Enregistrer les modifications"
9. Terminal:
   git add public/data.json
   git commit -m "Update: Augmenter expérience à 10 ans"
   git push origin main
10. ✅ Fait! Le site en production est à jour
```

### Exemple 2: Modifier une description

```
1. Mode Édition activé
2. Allez à "Association"
3. Survolez la description → Crayon ✏️
4. Cliquez → Modifiez le texte
5. Cliquez ✓ pour confirmer
6. Enregistrez (Dashboard)
7. git add public/data.json
8. git commit -m "Update: Améliorer description de l'association"
9. git push origin main
10. ✅ Publié!
```

### Exemple 3: Ajouter un nouvel événement

**Via l'interface:**
- Allez à "Événements"
- Recherchez la section pour ajouter un événement
- Remplissez les informations
- Enregistrez et publiez

**Via JSON (advanced):**
- Ouvrez `public/data.json`
- Trouvez la section `"events"`
- Ajoutez un nouvel événement (copier-coller un existant)
- Modifiez les informations
- Enregistrez et publiez

---

## 🔄 METTRE À JOUR LE CODE (Pour devs uniquement)

Si le développeur améliore le site:

```bash
# Récupérer les nouvelles version
git pull origin main

# Réinstaller les dépendances si besoin
npm install

# Redémarrer
npm run dev
```

---

## ⚠️ PROBLÈMES ET SOLUTIONS

### "Le serveur ne démarre pas"

```bash
# Solution 1: Vérifier Node.js est installé
node --version

# Solution 2: Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install

# Solution 3: Vérifier les ports
# Quelque chose utilise le port 5173 ou 3001
# Redémarrer l'ordinateur généralement résout ça
```

### "Je ne vois pas le mode édition"

```
1. Vérifiez que vous êtes connecté (Admin)
2. Rafraîchissez la page (Ctrl+R ou Cmd+R)
3. Essayez avec un autre navigateur (Chrome, Firefox)
4. Contactez le développeur si ça continue
```

### "Mes modifications ne s'enregistrent pas"

```
1. Vérifiez que vous avez cliqué ✓ (coche verte)
2. Vérifiez que vous avez cliqué "Enregistrer les modifications"
3. Attendez le message vert "Modifications enregistrées!"
4. Rafraîchissez la page
5. Vérifiez que c'est toujours là
```

### "J'ai fermé sans enregistrer"

```
❌ Les modifications non-enregistrées sont perdues
✅ Refaites-les
💡 Conseil: Enregistrez régulièrement!
```

### "Le site en production n'est pas à jour"

```bash
# Vérifier que vous avez bien poussé
git log --oneline -5    # Voir les derniers commits

# Vérifier le status
git status              # Voir s'il y a des changements non-poussés

# Si des changements attendent:
git add public/data.json
git commit -m "Update: [description]"
git push origin main

# Attendre 1-2 minutes que Vercel redéploie
# Aller sur https://donsduson.vercel.app
```

### "J'ai fait une erreur et veux annuler"

```bash
# Annuler le dernier commit (garder les modifications)
git reset --soft HEAD~1

# Annuler et perdre les modifications (attention!)
git reset --hard HEAD~1

# Publier l'annulation
git push origin main
```

---

## 🎓 COMMANDES GIT ESSENTIELLES

```bash
# Voir les modifications
git status

# Préparer les changements
git add public/data.json

# Créer un commit
git commit -m "Update: description"

# Pousser sur GitHub
git push origin main

# Voir l'historique
git log --oneline

# Vérifier le dernier commit
git log -1
```

---

## 📁 STRUCTURE DU PROJET

```
dds_v2/
├── public/
│   └── data.json          ← LES DONNÉES À MODIFIER!
├── src/
│   ├── app/
│   │   ├── pages/         (Accueil, Association, etc.)
│   │   ├── components/    (Composants réutilisables)
│   │   └── context/       (Gestion de l'état)
│   └── lib/
│       └── content.ts     (Charge les données)
├── package.json           (Dépendances)
├── vite.config.ts         (Configuration)
└── server.js              (Serveur API local)
```

**La seule chose que vous modifiez:** `public/data.json` ✅

---

## 🔒 SÉCURITÉ

### Bonnes pratiques:

✅ **À faire:**
- ✅ Enregistrer régulièrement
- ✅ Tester vos modifications avant de publier
- ✅ Écrire des messages de commit clairs
- ✅ Ne pas modifier d'autres fichiers
- ✅ Garder vos identifiants secrets

❌ **À ne pas faire:**
- ❌ Modifier les fichiers de code
- ❌ Supprimer des fichiers du projet
- ❌ Utiliser des caractères bizarres dans JSON
- ❌ Partager vos identifiants
- ❌ Publier sans tester

---

## 📞 BESOIN D'AIDE?

### Problèmes courants

1. **Site ne démarre pas** → Redémarrer l'ordinateur
2. **Modifications ne s'affichent pas** → Rafraîchir le navigateur
3. **Git error** → Contactez le développeur
4. **Accès refusé** → Vérifier les identifiants

### Contacter le développeur

Si quelque chose ne fonctionne pas:
- ✉️ Email: [email du dev]
- 💬 Message: [Discord/Slack/autre]
- 📱 Téléphone: [numéro]

---

## 📚 RESSOURCES

- **Guide simple:** `GUIDE_SIMPLE.md` (dans le dossier)
- **Guide complet:** `CONTENT_MANAGEMENT.md` (pour les curieux)
- **Git guide:** https://git-scm.com/book/en/v2/Getting-Started-Git-Basics
- **Markdown guide:** https://www.markdownguide.org/

---

## ✨ VOUS ÊTES PRÊT!

Vous savez maintenant tout ce qu'il faut pour:
- ✅ Modifier le contenu
- ✅ Enregistrer
- ✅ Publier
- ✅ Gérer les problèmes

**Amusez-vous et n'hésitez pas à explorer!** 🎵

---

## 🎬 CHECKLIST FINALE

Avant de commencer:

- [ ] Node.js installé? (`node --version`)
- [ ] Git installé? (`git --version`)
- [ ] Projet cloné? (`cd dds_v2`)
- [ ] Dépendances installées? (`npm install` fait?)
- [ ] Serveur lancé? (`npm run dev`)
- [ ] Site accessible? (http://localhost:5173)
- [ ] Connecté à l'admin? (Login OK?)

**Si tout est ✅ → Vous êtes prêt!**

---

**Merci d'avoir continué le projet! 🙏**