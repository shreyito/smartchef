// SmartChef - Dashboard Prototype

This prototype implements:
- Ingredient input (free text and quick-pick), dietary preferences, filters (difficulty, time), serving size adjustment.
- Recipe generation from a dummy JSON API (/api/recipes) using a predefined database of 20 recipes with steps and nutrition.
- Matching logic scores overlap with available ingredients, filters by diet/difficulty/time, and suggests substitutions for missing items.
- Image ingredient recognition via a stub endpoint (/api/recognize) for demo purposes.
- Ratings and favorites persisted via localStorage.
- Authenticated dashboard at /dashboard with NextAuth (Google). Redirect after login to /dashboard.

Notes:
- All data is local/dummy for now. Replace /api/recipes and /api/recognize with real services as needed.
- UI uses shadcn components, semantic HTML, responsive layout, and loading/error states.
