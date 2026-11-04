# Lady H Society — version statique de test v2

Cette version est destinée exclusivement à `https://agathe1996.github.io/ladyhsociety-test/`.

## Corrections
- Commentaires Handlebars `{{!-- ... --}}` correctement exclus du HTML publié.
- Sections anciennes conservées dans `_original-source/views/` sans apparaître sur le site.
- Liens d'images absolus et relatifs corrigés, notamment `graphe.png`.
- Chemins des polices locales corrigés dans le CSS.
- Traductions FR/EN générées depuis les fichiers JSON d'origine.

## Conservation du code
Le dossier `_original-source/` contient le dépôt source original, y compris les fichiers
Node.js, les templates Handlebars avec leurs commentaires, les traductions, les images,
les CSS et les scripts. **Ne pas supprimer ce dossier si vous souhaitez conserver l'historique
des sections masquées et pouvoir rééditer le site ultérieurement.**

## Installation
Remplacer les fichiers du dépôt `ladyhsociety-test` par le contenu de cette archive.
Conserver `Settings > Pages > Deploy from a branch > main > /(root)`.
Ne pas ajouter de fichier CNAME ni changer les DNS pendant les tests.

## Limites
Le rendu n'a pas été validé visuellement sur toutes les pages.
Les intégrations externes et le comportement des scripts doivent encore être testés.
Pour la mise en production sur `ladyhsociety.com`, il faudra reconstruire les chemins
sans le préfixe `/ladyhsociety-test/`.
