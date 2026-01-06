# Portfolio - Saindou Moudathirou Ben

Portfolio professionnel développé avec **FastAPI**, **Tailwind CSS** et **JavaScript Vanilla**.

## Architecture

- **Frontend** : HTML5, Tailwind CSS, JS (animations GSAP), Nginx pour le service.
- **Backend** : FastAPI, Pydantic, SlowAPI (Rate Limiting), SMTP Emailing.
- **DevOps** : Docker & Docker Compose.

## Installation & Démarrage

### Pré-requis
- Docker & Docker Compose
- (Optionnel) Python 3.9+ et Node.js pour le développement local sans Docker.

### Démarrage Rapide (Docker)

1. Cloner le repository
2. Configurer les variables d'environnement (Optionnel pour test, requis pour emails réels)
   ```bash
   cp .env.example .env
   # Modifier .env avec vos identifiants SMTP si nécessaire
   ```
3. Lancer les conteneurs
   ```bash
   docker-compose up --build
   ```
4. Accéder au site : `http://localhost:80`
5. API Docs : `http://localhost:8000/docs`

### Développement Local

#### Backend
1. Aller dans `backend/`
2. Installer les dépendances : `pip install -r requirements.txt`
3. Lancer le serveur : `uvicorn main:app --reload`

#### Frontend
1. Aller dans `frontend/`
2. Installer Tailwind (si modification CSS requise) : `npm install`
3. Lancer le build watch : `npx tailwindcss -i ./src/styles.css -o ./src/output.css --watch`
4. Ouvrir `index.html` avec Live Server ou équivalent.

## Structure du Projet

```
portfolio/
├── backend/            # Code API FastAPI
│   ├── main.py         # Application principale
│   ├── models.py       # Modèles Pydantic
│   ├── utils.py        # Fonctions utilitaires (Email)
│   └── requirements.txt
├── frontend/           # Code Frontend Static
│   ├── index.html      # Page unique
│   ├── src/            # JS, CSS, Assets
│   └── tailwind.config.js
├── docker-compose.yml
└── README.md
```

## Fonctionnalités Clés

- Formulaire de contact sécurisé avec validation (Frontend & Backend).
- Rate Limiting API (5 requêtes/minute par IP).
- Design Responsive & Dark Mode par défaut.
- Animations GSAP fluides.
