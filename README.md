# FloginFE_BE - Template (React + Spring Boot 3.2+)

This template implements the assignment structure:
- Frontend: React 18 (Vite)
- Backend: Spring Boot 3.2 (Java 17), Spring Data JPA (H2 in-memory for demo)
- Tests: sample unit tests for frontend (Jest) and backend (JUnit + Mockito)
- CI: sample GitHub Actions workflow (see .github/workflows/ci.yml)

Run backend:
- cd backend
- ./mvnw spring-boot:run (or mvn spring-boot:run)

Run frontend:
- cd frontend
- npm install
- npm run dev

Docker
# Build 
docker compose up --build


# Khởi động tất cả service (db, backend, frontend)
docker-compose up -d

# Dừng container
docker-compose down

