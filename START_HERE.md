# 🚀 START HERE - Guide Rapide

## 5 Minutes pour Commencer!

### 1️⃣ Lancer le site (Une seule fois)
```bash
npm install
npm run dev
```
→ Allez à http://localhost:5173

### 2️⃣ Se Connecter
- Cliquez sur "Admin" en bas du site
- Entrez vos identifiants
- Vous êtes dedans! ✅

### 3️⃣ Activer Mode Édition
- Dashboard → "Activer le Mode Édition" (bouton orange)
- ✓ Mode activé!

### 4️⃣ Modifier
```
1. Allez sur la page à modifier
2. Survolez un texte → Crayon ✏️ apparaît
3. Cliquez → Modifiez
4. Cliquez ✓ (coche verte)
```

### 5️⃣ Enregistrer
- Dashboard → "Enregistrer les modifications" (bouton vert)
- Attendez le message ✅

### 6️⃣ Publier (Terminal)
```bash
git add public/data.json
git commit -m "Update: [votre description]"
git push origin main
```

**C'est tout! ✨**

---

## 📖 Documentation Complète

- **Guide Simple** → `GUIDE_SIMPLE.md`
- **Guide Complet** → `README_EDITEURS.md`
- **Détails Techniques** → `CONTENT_MANAGEMENT.md`

---

## ⚡ Commandes Utiles

```bash
# Lancer le serveur
npm run dev

# Arrêter le serveur
Ctrl+C

# Publier vos changements
git push origin main

# Voir les modifications
git status

# Annuler le dernier commit
git reset --soft HEAD~1
```

---

## ❌ Problèmes?

| Problème | Solution |
|----------|----------|
| Server ne démarre pas | Redémarrer l'ordinateur |
| Mode édition n'apparaît pas | Rafraîchir la page (Ctrl+R) |
| Modifications ne s'enregistrent pas | Cliquer sur ✓ puis "Enregistrer" |
| Site en production pas à jour | Attendre 2 minutes après git push |

---

## 📝 Structure

```
Vous modifiez → public/data.json
           ↓
        git push
           ↓
    Vercel redéploie
           ↓
    Tous les utilisateurs voient
```

---

## 🎯 Points Importants

✅ **À faire:**
- Enregistrer vos modifications
- Tester avant de publier
- Écrire des messages Git clairs

❌ **À ne pas faire:**
- Modifier d'autres fichiers que `public/data.json`
- Fermer sans enregistrer
- Partager vos identifiants

---

## 🆘 Besoin d'Aide?

Consultez les guides ci-dessus ou contactez le développeur.

**Bon courage! 🎵**