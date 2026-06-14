# Composants Landing Page - Heracles

## Vue d'ensemble

Cette documentation décrit les composants de landing page ajoutés au projet Heracles. Ces composants transforment la page d'accueil en une landing page professionnelle et complète.

## Structure des fichiers

```
heracles.client/src/
├── components/Landing/
│   ├── HeroSection.tsx          # Section héro avec titre et CTAs
│   ├── ValueProposition.tsx     # Proposition de valeur avec cartes
│   ├── FeaturesList.tsx         # Liste des fonctionnalités
│   ├── VisualDemo.tsx           # Démonstrations visuelles
│   ├── Testimonials.tsx         # Témoignages clients
│   ├── FAQ.tsx                  # Questions fréquentes
│   ├── CallToAction.tsx         # CTA final
│   └── index.ts                 # Exports centralisés
├── data/
│   ├── featuresData.ts          # Données des fonctionnalités
│   ├── testimonialsData.ts      # Données des témoignages
│   └── faqData.ts               # Données des FAQ
├── styles/
│   └── landing.css              # Styles des composants Landing
└── pages/Home/
	└── Home.tsx                 # Page d'accueil mise à jour
```

## Composants

### 1. HeroSection
**Fichier:** `HeroSection.tsx`

Section principale visible immédiatement (above the fold).

**Props:**
- `title` (string): Titre principal
- `subtitle` (string): Sous-titre/description
- `ctaText` (string): Texte du bouton CTA principal
- `ctaLink` (string): Lien du bouton CTA
- `backgroundImage` (string, optionnel): URL de l'image de fond

**Exemple:**
```tsx
<HeroSection
  title="Gérez votre activité avec Heracles"
  subtitle="La plateforme tout-en-un"
  ctaText="Découvrir"
  ctaLink="/products"
/>
```

### 2. ValueProposition
**Fichier:** `ValueProposition.tsx`

Affiche les valeurs uniques du produit sous forme de cartes.

**Props:**
- `mainTitle` (string): Titre de la section
- `mainDescription` (string): Description
- `values` (ValueCard[]): Tableau de cartes de valeur

**Interface ValueCard:**
```typescript
{
  icon: string;
  title: string;
  description: string;
}
```

### 3. FeaturesList
**Fichier:** `FeaturesList.tsx`

Liste les fonctionnalités principales avec possibilité de mise en avant.

**Props:**
- `title` (string): Titre de la section
- `subtitle` (string): Sous-titre
- `features` (Feature[]): Tableau de fonctionnalités

**Interface Feature:**
```typescript
{
  title: string;
  description: string;
  icon: string;
  highlight?: boolean; // Met en avant la fonctionnalité
}
```

### 4. VisualDemo
**Fichier:** `VisualDemo.tsx`

Carrousel de démonstrations visuelles (images ou vidéos).

**Props:**
- `title` (string): Titre
- `subtitle` (string): Sous-titre
- `demos` (DemoItem[]): Tableau de démos

**Interface DemoItem:**
```typescript
{
  title: string;
  description: string;
  image?: string;
  videoUrl?: string;
}
```

### 5. Testimonials
**Fichier:** `Testimonials.tsx`

Affiche les témoignages clients avec avatars et notes.

**Props:**
- `title` (string): Titre
- `subtitle` (string): Sous-titre
- `testimonials` (Testimonial[]): Tableau de témoignages

**Interface Testimonial:**
```typescript
{
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating?: number; // 1-5
}
```

### 6. FAQ
**Fichier:** `FAQ.tsx`

Section FAQ avec système d'accordion.

**Props:**
- `title` (string): Titre
- `subtitle` (string): Sous-titre
- `faqs` (FAQItem[]): Tableau de questions/réponses

**Interface FAQItem:**
```typescript
{
  question: string;
  answer: string;
}
```

### 7. CallToAction
**Fichier:** `CallToAction.tsx`

CTA final pour la conversion.

**Props:**
- `title` (string): Titre
- `description` (string): Description
- `primaryButtonText` (string): Texte bouton principal
- `primaryButtonLink` (string): Lien bouton principal
- `secondaryButtonText` (string): Texte bouton secondaire
- `secondaryButtonLink` (string): Lien bouton secondaire
- `backgroundColor` (string): Couleur de fond (gradient CSS)

## Fichiers de données

### featuresData.ts
Contient 12 fonctionnalités prédéfinies. Modifiez ce fichier pour personnaliser les fonctionnalités affichées.

### testimonialsData.ts
Contient 6 témoignages clients. Remplacez par vos vrais témoignages.

### faqData.ts
Contient 8 questions/réponses. Personnalisez selon vos besoins.

## Personnalisation

### Modifier les couleurs
Les gradients principaux utilisent:
- Primaire: `#667eea` (bleu violet)
- Secondaire: `#764ba2` (violet)

Pour changer, modifiez dans `landing.css` et les composants.

### Modifier les images
Remplacez les URLs de placeholder dans `VisualDemo.tsx` et `Testimonials.tsx` par vos vraies images.

### Ajouter/Retirer des sections
Dans `Home.tsx`, commentez ou ajoutez des composants selon vos besoins:

```tsx
<HeroSection />
<ValueProposition />
<FeaturesList features={featuresData} />
{/* <VisualDemo /> - Décommentez pour afficher */}
<Testimonials testimonials={testimonialsData} />
<FAQ faqs={faqData} />
<CallToAction />
```

## Responsive Design

Tous les composants sont entièrement responsive avec des breakpoints Bootstrap:
- Mobile: < 768px
- Tablet: 768px - 992px
- Desktop: > 992px

## Animations

Le fichier `landing.css` inclut:
- Effets hover sur les cartes
- Transitions fluides
- Animation de pulse sur le CTA final
- Smooth scrolling

## Performance

- Images lazy-loaded
- Composants optimisés React
- CSS minimal et ciblé
- Pas de dépendances externes supplémentaires

## Support navigateurs

- Chrome (dernière version)
- Firefox (dernière version)
- Safari (dernière version)
- Edge (dernière version)

## Maintenance

Pour mettre à jour le contenu:
1. Modifiez les fichiers dans `src/data/`
2. Les changements seront automatiquement reflétés
3. Aucune modification des composants nécessaire

## Licence

Ces composants font partie du projet Heracles et suivent la même licence.
