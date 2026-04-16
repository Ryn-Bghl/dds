# Charte Graphique - Dons Du Son

Ce document définit l'identité visuelle et les standards de design pour le projet Dons Du Son (v2).

## 1. Identité Visuelle

### Logo
- **Source** : `src/app/assets/dds_logo.png`
- **Usage** : Utilisé avec des coins arrondis (`rounded-lg`).
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
- **H1** : `text-5xl` à `text-7xl`, Medium, Line-height 1.5
- **H2** : `text-4xl`, Medium
- **H3** : `text-2xl` à `text-3xl`, Medium
- **Corps de texte** : `text-base` ou `text-lg` pour le confort de lecture.

## 4. Composants et Styles

### Gradients
L'application utilise massivement un gradient linéaire directionnel :
- **Principal** : `from-[#8C0343] via-[#771236] to-[#D96704]`
- **Usage** : Hero sections, bannières de pages, overlays d'images.

### Bordures et Arrondis
- **Radius Standard** : `0.625rem` (`rounded-xl`) pour les cartes et les gros composants.
- **Radius Petit** : `rounded-md` pour les boutons et inputs.

### Boutons
- **Primary** : Fond Bourgogne (`#8C0343`), Texte Blanc.
- **Secondary** : Fond Orange (`#F29F05`), Texte Noir.
- **Outline** : Bordure grise/blanche, texte blanc, effet hover discret.

## 5. Iconographie
- **Bibliothèque** : `lucide-react`
- **Style** : Traits fins, souvent colorés en Orange Vif (`#F29F05`) pour ressortir sur le fond sombre.

## 6. Layout
- **Conteneur** : `max-w-6xl` ou `container mx-auto` avec un padding horizontal de `px-4`.
- **Sections** : Espacement vertical généreux (`py-16` ou `py-20`) pour une lecture aérée.
