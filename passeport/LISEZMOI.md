# Passeport de groupe — Les Voyageurs Sans Frontières

Document de 12 pages fixes (1440 × 810 px, 16:9), mis en page selon `../DESIGN.md`
avec les textes de `../membres.md`.

- `passeport-les-voyageurs-sans-frontieres.pdf` : le document exporté, prêt à envoyer.
- `passeport.html` + `styles.css` : la source (une `<section>` par page).
- `fonts/` : Fraunces et Work Sans, fichiers locaux (licence SIL OFL, voir `OFL-*.txt`).
- `exporter-pdf.cjs` : régénère le PDF.

## Pages

| N° | Page | Fond |
|----|------|------|
| 01 | Couverture | marine profond |
| 02 | L'équipe | crème |
| 03 | Ethan | crème |
| 04 | Milann | marine |
| 05 | Vasyl | crème |
| 06 | Maxime | marine |
| 07 | Lucas | crème |
| 08 | Ylann | marine |
| 09 | Elio | crème |
| 10 | Valeurs et points forts | marine |
| 11 | Notre organisation et notre apport | crème |
| 12 | Contact | marine profond |

Une page par membre, pour garder chaque texte de présentation en entier et en 22 px
(16,5 pt dans le PDF). L'ordre des membres alterne crème et marine de façon que les
pages les plus chargées (texte + citation) soient crème : sur crème seulement, le tampon
marine peut mordre sur le coin du portrait sans que l'or touche une surface claire.

## Ajouter les photos et le logo

Déposer les fichiers sous ces noms exacts, puis régénérer le PDF. Tant qu'un fichier
manque, la page affiche un emplacement crème foncé avec le prénom.

| Fichier | Contenu attendu |
|---------|-----------------|
| `images/logo.png` | logo du groupe (fond transparent de préférence) |
| `photos/groupe.jpg` | photo de groupe (paysage, ≈ 3:2) |
| `photos/ethan.jpg`, `milann.jpg`, `vasyl.jpg`, `maxime.jpg`, `lucas.jpg`, `ylann.jpg`, `elio.jpg` | portraits 4:5, fond neutre, cadrés à hauteur d'épaules |
| `photos/ethan-passion-1.jpg` | musique |
| `photos/ethan-passion-2.jpg` | voitures |
| `photos/milann-passion-1.jpg` | basket |
| `photos/vasyl-passion-1.jpg` | tennis |
| `photos/maxime-passion-1.jpg` | musculation |
| `photos/lucas-passion-1.jpg` | judo |
| `photos/ylann-passion-1.jpg` | football |
| `photos/ylann-passion-2.jpg` | course à pied |
| `photos/elio-passion-1.jpg` | motocross |

Les photos sont recadrées automatiquement (`object-fit: cover`) et reçoivent une teinte
chaude légère. Pas d'image générée par IA ni de photo de banque d'images.

## Ce qui reste à fournir (écrit entre crochets dans le document)

- **Elio** : deux passages sur son rôle, retirés parce qu'il n'est plus orateur
  (début de la 1re phrase et dernier paragraphe) → `[texte sur le rôle à réécrire par Elio]`.
- **Page 11, « Visibilité »** : aucune phrase source → `[texte à rédiger par le groupe]`.
- Le logo, la photo de groupe, les 7 portraits et les photos de passions.

## Choix éditoriaux à valider

- Les textes de présentation et les citations « Pourquoi ce projet » sont repris mot pour
  mot. Seule la typographie a été ajustée : apostrophe typographique (’) et espaces
  insécables avant « : » et à l'intérieur des guillemets.
- Ethan, Milann et Maxime ont déjà leur « pourquoi » dans leur texte : pas de citation
  ajoutée. Vasyl, Lucas, Elio et Ylann ont leur citation à part.
- Page 10 : chaque valeur est illustrée par une phrase tirée des textes du groupe ou des
  membres (attribution indiquée). Points forts : repris de la présentation du groupe.
- Page 11 : « Énergie » et « Compétences » reprennent la présentation du groupe.
- Couverture : coordonnées de Nantes (47°13′ N · 1°33′ O) sous le point de départ.

## Régénérer le PDF

Avec Node.js et Playwright :

```bash
npm i -D playwright && npx playwright install chromium   # une seule fois
node passeport/exporter-pdf.cjs
```

Sans Node : ouvrir `passeport.html` dans Chrome → Imprimer → « Enregistrer au format PDF »,
marges « Aucune », « Graphiques d'arrière-plan » coché.

La règle `@page` déclare 809,5 px de haut au lieu de 810 : Chromium arrondit la taille des
pages PDF vers le haut, et la valeur exacte laisserait un filet blanc en bas de chaque page.
