# 🚀 Team Task Manager

A simple full-stack web application to manage projects and tasks with role-based access.

---

## 📌 Features

- 🔐 User Authentication (Signup / Login)
- 👨‍💼 Role-based access (Admin / Member)
- 📁 Project creation (Admin only)
- ✅ Task creation & assignment
- 📊 Dashboard with task status
- ⏰ Overdue task tracking

---

## 👥 Roles

### Admin
- Create projects
- Create & assign tasks
- Delete projects and tasks
- View all tasks

### Member
- View assigned tasks
- Update task status

---

## 🛠 Tech Stack

- **Frontend:** EJS, HTML, CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** express-session + bcrypt  

---

## 📂 Project Structure
```
team-task-manager/
│
├── app.js                  
├── package.json          
├── .env                   
├── .gitignore             
│
├── models/               
│   ├── User.js
│   ├── Project.js
│   └── Task.js
│
├── routes/              
│   ├── authRoutes.js
│   ├── dashboardRoutes.js
│   ├── projectRoutes.js
│   └── taskRoutes.js
│
├── middleware/          
│   ├── auth.js          
│   └── role.js          
│
├── views/              
│   ├── dashboard.ejs
│   ├── projects.ejs
│   ├── newProject.ejs
│   ├── tasks.ejs
│   ├── newTask.ejs
│   │
│   └── auth/
│       ├── login.ejs
│       └── signup.ejs
│
└── public/               
    └── css/
        └── style.css
```



---
## 📌 Author

**Jatin Agrawal**  
 

---

## ⭐ Note

This is a simple assignment project focused on core functionality and clean implementation.



