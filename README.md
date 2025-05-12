# Django Notes Making Application  

**Live Demo**: [https://notes-making-app-frontend.vercel.app](https://notes-making-app-frontend.vercel.app)

## Core Features  
- **CRUD Operations**: Intuitive interface for creating, reading, updating, and deleting notes  
- **Rich Text Support**: Markdown formatting with live preview functionality  
- **User Authentication**: Secure JWT-based login/registration system with password hashing  
- **Advanced Search**: Full-text search across note titles and content using Django Q objects  
- **Responsive Design**: Mobile-optimized layout using Tailwind CSS grid system  
- **REST API**: Documented endpoints for third-party integrations  

## Technology Architecture  
**Frontend**:  
- Django Templates  
- TypeScript  
- Tailwind CSS 3.3  
- HTMX for dynamic interactions  

**Backend**:  
- Django 4.2  
- Django REST Framework  
- PostgreSQL (Production)  
- SQLite (Development)  

**DevOps**:  
- Vercel Platform  
- GitHub Actions CI/CD  

## Local Development Setup  

### Prerequisites  
- Python 3.10+  
- Node.js 18.x+  
- PostgreSQL 14+  

### Installation Guide  
1. Clone repository:  
   ```bash
   git clone https://github.com/manojCodes77/02-notes-making-app-using-django.git
   cd 02-notes-making-app-using-django
   ```

2. Configure environment:  
   ```bash
   cp .env.example .env
   # Update PostgreSQL credentials in .env
   ```

3. Install dependencies:  
   ```bash
   pip install -r requirements.txt
   ```

4. Database setup:  
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Start development server:  
   ```bash
   python manage.py runserver
   ```

## Deployment  
1. **Vercel Configuration**:  
   - Install Vercel CLI:  
     ```bash
     npm install -g vercel
     ```
   - Link project:  
     ```bash
     vercel link
     ```
   - Deploy production:  
     ```bash
     vercel --prod
     ```

## API Documentation  
| Endpoint         | Method | Description              |  
|------------------|--------|--------------------------|  
| `/api/notes/`    | GET    | List all notes           |  
| `/api/notes/`    | POST   | Create new note          |  
| `/api/notes/:id` | GET    | Retrieve specific note   |  
| `/api/notes/:id` | PUT    | Update existing note     |  
| `/api/notes/:id` | DELETE | Remove note              |  

---

**Key References**:  
- [Django Documentation](https://docs.djangoproject.com)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Django REST Framework](https://www.django-rest-framework.org)
