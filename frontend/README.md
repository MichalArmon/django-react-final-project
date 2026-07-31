# Article Hub

A full-stack article management platform built with React, Django REST Framework, PostgreSQL, JWT authentication, and Machine Learning.

Article Hub allows users to browse articles, interact with content, manage profiles, and explore a machine learning model that predicts the expected number of views for an article.

## Live Demo

### Frontend

https://article-hub-qa2w.onrender.com

### Backend API

https://article-hub-api-50pl.onrender.com/api

> The backend is hosted on Render and may take a few seconds to wake up after a period of inactivity.

---

## Main Features

### Articles

- Browse published articles
- Search articles by title, content, author, or tags
- Pagination
- View individual article pages
- Article view counter
- Like and unlike articles
- Display comments and article statistics
- Filter articles by author
- Create, edit, and delete articles based on user permissions
- Assign multiple tags to an article

### Users

- User registration
- JWT login and logout
- Automatic access-token refresh
- User profile page
- Edit personal profile
- Role-based permissions
- Admin user management
- Responsive user navigation menu

### Comments

- Add comments to articles
- Display comment author and creation date
- Edit or delete comments according to permissions
- Load comments by article

### Machine Learning

The project includes a Linear Regression model that predicts the expected number of article views.

The model uses the following features:

- Word count
- Breaking-news status
- Author experience in years

The project includes:

- An interactive ML Playground
- A model explanation and insights page
- A Django REST prediction endpoint
- Visual model evaluation using MAE and R²
- Actual-versus-predicted results visualization

### User Experience

- Responsive desktop and mobile navigation
- Global loading indicator for API requests
- Snackbar notifications
- Custom 404 page
- Sticky footer
- Custom favicon
- Responsive Material UI design
- SPA routing support on Render

---

## Technologies

### Frontend

- React
- Vite
- React Router
- Material UI
- Axios
- Joi
- jwt-decode

### Backend

- Python
- Django
- Django REST Framework
- Simple JWT
- django-filter
- PostgreSQL
- Gunicorn

### Machine Learning

- Pandas
- NumPy
- Scikit-learn
- Joblib
- Matplotlib
- Plotly

### Deployment

- Render Static Site
- Render Web Service
- Render PostgreSQL

---

## Project Structure

```text
django-react-final-project/
│
├── backend/
│   └── articles_backend/
│       ├── api/
│       │   ├── ml_models/
│       │   │   ├── article_views_model.pkl
│       │   │   └── article_views_features.pkl
│       │   ├── migrations/
│       │   ├── models.py
│       │   ├── permissions.py
│       │   ├── serializers.py
│       │   ├── urls.py
│       │   └── views.py
│       │
│       ├── config/
│       ├── manage.py
│       └── requirements.txt
│
├── frontend/
│   ├── public/
│   │   └── favicon.png
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── initialData/
│   │   ├── layout/
│   │   ├── models/
│   │   ├── normalization/
│   │   ├── pages/
│   │   ├── providers/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── theme.js
│   │
│   ├── index.html
│   └── package.json
│
└── README.md
```
