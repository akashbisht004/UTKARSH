# 📊 Nirog AI — Your AI-Powered Personal Health Companion

**Nirog AI** is an intelligent, health tracking and advisory application built using **Spring Boot** (backend) and **React + Vite** (frontend). It empowers users to book appointments, retrieves contextual knowledge from trusted medical documents (like PDFs), and interact with AI assistant to resolve common health issues.

---

## 🚀 Tech Stack

| Layer         | Technology                                    |
| ------------- | --------------------------------------------- |
| **Frontend**  | React 19, Vite 6, TailwindCSS, MUI            |
| **Backend**   | Spring Boot                                   |
| **AI**        | Gemini API                                    |
| **Embedding** | FAISS / ChromaDB, PDF ingestion               |
| **UI/UX**     | Tailwind CSS, MUI, Framer Motion              |

---

## ✨ Features of Nirog AI

Here’s what our app can do:

- 🩺 **Book appointments with doctors**  
  Seamlessly schedule consultations with verified medical professionals.

- 📈 **Upload and analyze medical reports using AI**  
  Get smart insights from your health records, powered by AI-driven analysis.

- 📍 **Locate nearby hospitals**  
  Instantly find the nearest hospitals based on your location.

- 👨‍⚕️ **Get virtual consultations**  
  Connect with doctors online through secure virtual consultations.

- 💡 **Receive personalized wellness suggestions**  
  Stay healthier with AI-generated tips tailored just for you.

- 📩 **Email integration for booking and cancellation**  
  Receive real-time email notifications for appointment bookings and cancellations.

- ✨ **Separate portals for user, doctors, and admin**  
  Customized dashboards for patients, doctors, and administrators for seamless experience.

---

## 🧪 Screenshots
<img src="./1.png"/>
<img src="./2.png"/>
<img src="./3.png"/>
<img src="./4.png"/>
<img src="./5.png"/>
<img src="./6.png"/>
<img src="./7.png"/>
---

## 🛠️ How to Run Locally

### 🔧 Backend (Spring Boot)

1. Clone the backend repo
2. Install Java 21 and Maven
3. Start MongoDB
4. Run:

   ```bash
   ./mvnw spring-boot:run
   ```

### 💻 Frontend (React + Vite)

```bash
git clone https://github.com/yourusername/nirog-ai.git
cd nirog-ai/utkarsh-fe
npm install
npm run dev
```

---

## 📂 Folder Structure

```bash
utkarsh-fe/
├── src/
│   ├── components/      # Reusable UI
│   ├── pages/           # Calendar, Logs, HealthQuery
│   ├── hooks/           # Custom React hooks
│   ├── assets/          # Icons, Logos
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## ⚙️ Integrations

| Service          | Role                                     |   |
| ---------------- | ---------------------------------------- | - |
| `LangChain`      | Contextual search and retrieval from PDF |   |
| `OpenAI` / `LLM` | Response generation                      |   |
| `Spring Boot`    | Core backend APIs                        |   |
| `MongoDB`        | User and interaction storage             |   |

---

## 📌 Future Enhancements

* 🔔 Health Alerts / Early Diagnosis
* 🧪 Doctor Mode / Export Logs
* 🧠 Symptom-to-Disease Analysis
* 📊 Dashboard with Weekly Health Reports
* 📱 Android App (React Native planned)

---

## 🤝 Contributing

PRs and contributions welcome! Just fork the repo and make sure your code follows our conventions (`eslint`, `tailwind`, etc).

---

## 🧑‍💼 Developed By

> Built with ❤️ by **Anuj Anthwal and Team**
> Nirog AI – Making preventive care smarter, accessible, and AI-powered.
