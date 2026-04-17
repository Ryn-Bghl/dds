# Charte Graphique - Dons Du Son

Ce document définit l'identité visuelle et les standards de design pour le projet Dons Du Son (v2).

## 1. Identité Visuelle

### Logo
- **Source** : `src/app/assets/dds_logo.png`
- **Usage** : Utilisé avec des coins arrondis (`border-radius: 8px`).
- **Dimensions standard** : 48x48px (Header/Footer).

## 2. Palette de Couleurs

L'identité repose sur un contraste fort entre un fond sombre profond et des couleurs chaudes (Bourgogne et Orange).

### Couleurs Principales (Brand Colors)
| Couleur | Hex | Variable CSS | Usage |
| :--- | :--- | :--- | :--- |
| **Bourgogne Vif** | `#8C0343` | `--primary` | Boutons, liens actifs, accents principaux |
| **Bourgogne Sombre** | `#771236` | `--accent` | Gradients, états hover |
| **Orange Vif** | `#F29F05` | `--orange-bright` | Icônes, highlights, texte d'emphase |
| **Orange Sombre** | `#D96704` | `--orange-dark` | Gradients, boutons secondaires |

### Système Neutre (Dark Theme)
| Couleur | Hex | Variable CSS | Usage |
| :--- | :--- | :--- | :--- |
| **Noir Profond** | `#0D0D0D` | `--background` | Fond principal de l'application |
| **Gris Anthracite** | `#1A1A1A` | `--card` | Fond des cartes, popovers, inputs |
| **Blanc Cassé** | `#F5F5F5` | `--foreground` | Texte principal |
| **Gris Muet** | `#A1A1A1` | `--muted-foreground` | Texte secondaire, descriptions |
| **Bordure** | `rgba(255,255,255,0.1)`| `--border` | Séparateurs et contours discrets |

## 3. Typographie

- **Base** : 16px
- **Poids** : Normal (400), Medium (500), Bold (700)

### Hiérarchie
- **H1** : 48px à 72px, Font-weight 500, Line-height 1.5
- **H2** : 36px, Font-weight 500
- **H3** : 24px à 30px, Font-weight 500
- **Corps de texte** : 16px ou 18px pour le confort de lecture.

## 4. Composants et Styles

### Gradients
L'application utilise massivement un gradient linéaire directionnel :
- **CSS** : `linear-gradient(to right, #8C0343, #771236, #D96704)`
- **Usage** : Hero sections, bannières de pages, overlays d'images.

### Bordures et Arrondis
- **Radius Standard** : 10px (`border-radius`) pour les cartes et les gros composants.
- **Radius Petit** : 6px (`border-radius`) pour les boutons et inputs.

### Boutons
- **Primary** : Background `#8C0343`, Couleur texte `#FFFFFF`.
- **Secondary** : Background `#F29F05`, Couleur texte `#000000`.
- **Outline** : Border 1px solid (gris/blanc), couleur texte `#FFFFFF`, effet hover avec background discret.

## 5. Iconographie
- **Bibliothèque** : `lucide-react`
- **Style** : Traits fins, souvent colorés en Orange Vif (`#F29F05`) pour ressortir sur le fond sombre.

## 6. Layout
- **Conteneur** : Largeur maximale de 1152px (`max-width: 1152px`) centrée horizontalement.
- **Padding horizontal** : 16px de chaque côté.
- **Sections** : Espacement vertical (margin/padding top & bottom) de 64px à 80px pour une lecture aérée.
