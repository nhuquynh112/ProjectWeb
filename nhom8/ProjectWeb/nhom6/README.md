# Student Management API

REST API quản lý sinh viên với Node.js, Express và MongoDB.

## Cấu trúc project

```
src/
├── app.js
├── models/
│   └── student.model.js
├── controllers/
│   └── student.controller.js
├── services/
│   └── student.service.js
├── routes/
│   └── student.routes.js
└── middlewares/
    ├── validateObjectId.middleware.js
    ├── errorHandler.middleware.js
    └── logger.middleware.js
```

## Cài đặt

```bash
npm install
cp .env.example .env
# Chỉnh sửa MONGODB_URI trong .env
npm run dev
```

## API Endpoints

### CRUD cơ bản

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/students` | Tạo sinh viên mới |
| GET | `/api/students?page=1&limit=10&major=IT` | Danh sách sinh viên |
| GET | `/api/students/:id` | Chi tiết sinh viên |
| PUT | `/api/students/:id` | Cập nhật sinh viên |
| DELETE | `/api/students/:id` | Xóa mềm sinh viên |

### Cập nhật điểm

| Method | Endpoint | Body |
|--------|----------|------|
| PATCH | `/api/students/:id/score` | `{ "score": 85 }` |

### API nâng cao

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/students/top?limit=5` | Top sinh viên theo điểm |
| GET | `/api/students/stats/avg` | Điểm trung bình |
| GET | `/api/students/search?q=keyword` | Tìm kiếm theo tên |

## Ví dụ request

### Tạo sinh viên
```json
POST /api/students
{
  "studentId": "SV001",
  "name": "Nguyen Van A",
  "email": "a@example.com",
  "score": 85,
  "major": "IT"
}
```

### Cập nhật điểm
```json
PATCH /api/students/:id/score
{
  "score": 90
}
```
