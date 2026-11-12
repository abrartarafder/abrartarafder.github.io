# Portfolio cover assets

Generated with the built-in image generation tool, using `assets/img/7.png` as the edit reference. Original Canva images remain unchanged.

## Final prompt template

Use case: precise-object-edit. Edit target: the supplied existing portfolio cover image. Create a matching photographic background for another card in the same portfolio series. Preserve the misty conifer forest landscape, layered tall evergreen silhouettes, diffuse fog, subtle grain, and quiet professional mood. Remove ALL text completely, leaving uninterrupted forest and fog where text was. Recolor the landscape with {palette} tones; maintain strong enough dark values for white HTML text overlay. Landscape composition, 3:2 aspect ratio, full bleed. No letters, numbers, typography, symbols, borders, logos, or watermarks. This is a background asset, labels will be real HTML.

## Variants

- freshroute.png: deep forest green and sage
- cruise-critic.png: deep ocean blue and muted teal
- atlas-ai.png: slate purple and muted lavender
- ttc-network.png: warm copper orange and charcoal

Titles are editable in index.html rather than embedded in the images. All ten cards reuse these four backgrounds.

## Project review

Reviewed the README and source tree for each repository, then selected implementation files:

- FreshRoute: RecipeController.js, Recipes.jsx, OrderController.js
- Cruise Critic: assistant.py, query.py
- Atlas: research.py, tools.py
- TTC: graphBuilder.py, algoComparison.py, type1_abrar.py

Descriptions summarize repository features, without claiming individual ownership of team features, deployment, or performance results.

## Optimized website copies

The page serves 960px-wide JPEG copies at quality 84. The four served covers total 189,083 bytes versus 8,829,524 bytes for the original generated PNGs (about 98% smaller). The original PNGs are retained. Titles stay in HTML, and named CSS filters preserve the distinct palette for each card.
