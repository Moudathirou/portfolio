---
version: 1
slug: "frontend-index-html"
primary_target: "frontend/index.html"
related_targets: []
---

# Surface brief — frontend/index.html

Scope: page unique du portfolio freelance. Mode : Persuade.
Audience : santé/medtech/CRO/pharma, PME et startups, ESN et plateformes, recherche et hôpitaux. Action : envoyer le formulaire « Parler de votre projet ».
Preuves : démonstrations reconstituées (documents fictifs, signalés), métriques du CV avec leur provenance, schémas d'architecture génériques. Aucun code, capture, témoignage ou logo client.
Contraintes : HTML/CSS/JS statique + GSAP core (cdnjs, SRI), CSP sans 'unsafe-inline', pas d'attribut style dans le HTML.
Mentions légales complétées (EI micro-entreprise, SIRET 994 924 181 00013).

## Direction contract
THESIS: Le site est un cahier de laboratoire tenu proprement : entrées datées, preuves collées, vérification tamponnée. Il refuse le portfolio IA sombre aux cartes identiques et dégradés violets.
OWN-WORLD: papier quadrillé froid #F2F4F0, double filet de marge rouge #B23A2E, encre #1C2A3A, encre stylo bleue #2D5DA8 pour annotations et actions, lavis bleu pour surligner ; Archivo (largeurs variables) imprimé, Caveat pour notes manuscrites et signature ; impressions collées au ruban.
STORY: Le visiteur voit une IA citer sa source puis être vérifiée, comprend « ingénieur IA de bout en bout, spécialisé santé », parcourt offres, protocole, résultats, historique, puis écrit.
FIRST VIEWPORT: en-tête de cahier imprimé ; à gauche le nom en grand, le titre, une phrase, le statut et le bouton « Parler de votre projet » ; à droite l'impression collée de la démo à trois onglets terminée par le tampon « Vérifié ».
FORM: Cahier de laboratoire, rang 1 de ma liste (IMPECCABLE'S PICK, choisi par l'utilisateur), seed b57efde9.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Décisions de build
- Datation dans la marge rouge limitée au Parcours (seule section réellement chronologique) ; les résultats gardent leur date dans la ligne de contexte, pour ne pas inventer de dates d'entrée.
- Section « Matériel et méthodes » ajoutée hors STORY pour le public ESN / plateformes (lecture par mots-clés).
- « conservées au plus 3 ans » (mention RGPD) : à confirmer par l'utilisateur.
