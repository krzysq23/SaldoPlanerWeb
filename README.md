# SaldoPlanerWeb

**SaldoPlanerWeb** is a modern **React-based web application** designed for **personal budget management**.  
It provides an interactive dashboard that allows users to track expenses, plan budgets,
visualize financial data and manage financial events in a clear and user-friendly way.

The application is part of the **XSWare ecosystem** and communicates with **XSWareAPI**,
which handles authentication and business logic.


## 🏗️ Architecture Overview

![apps_architecture](https://xsware.pl/assets/img/other/apps_architecture_2.png)


## ✨ Key Features

- Personal budget and expense management
- Interactive financial dashboards
- Data visualization with charts and counters
- Calendar-based planning
- Kanban-style task and workflow management
- Rich text editing
- Map and geolocation features
- Fully responsive UI
- Built entirely on top of **open-source libraries**


## 🛠️ Technology Stack

### Core
- **React**
- **JavaScript / TypeScript**
- **HTML5 / CSS3**
- **Material UI**

### UI & Components
- **MUI (Material UI)** – React UI library for faster and easier web development
- **React Table** – Lightweight and extensible data tables
- **React Select** – Advanced select inputs (multiselect, async, creatable)
- **React Flatpickr** – Date picker component
- **React Tag Input** – Tag creation and management
- **React Circular Slider** – Circular slider component
- **React Tilt** – Parallax hover tilt effects
- **React Images Viewer** – Responsive image viewer
- **React Quill** – WYSIWYG rich text editor
- **SweetAlert2** – Customizable alert and popup dialogs

### Data Visualization
- **React ChartJS 2** – Charts and financial data visualization
- **React CountUp** – Animated numerical counters
- **ChromaJS** – Color manipulation and scales

### Calendars, Boards & UX
- **FullCalendar** – Drag & drop event calendar
- **React Kanban** – Kanban / Trello-style board
- **Dropzone** – Drag & drop file uploads with previews

### Forms & Utilities
- **Formik** – Form handling and validation
- **UUID** – Unique ID generation
- **React HTML Parser** – Convert HTML strings to React components


## ⚙️ Configuration

The application is configured using **environment variables**.

Example `.env` file:

```env
REACT_APP_API_BASE_URL=https://api.xsware.local
### Spring Profiles
- `dev` – development environment
- `production` – production environment
```


### 🚀 Running the Application

Install dependencies
```bash
npm install
```
or
```bash
yarn install
```

Run in development mode
```bash
npm start
```
or
```bash
yarn start
```

Build for production
```bash
npm run build
```
or
```bash
yarn build
```

## 🔐 Authentication & Security

- Authentication handled via JWT
- Tokens are issued by XSWareAPI
- Secured API communication over HTTPS
- Frontend stores authentication tokens according to best practices

### Project Structure (simplified)

```
src/
 ├── assets
 ├── components
 ├── layouts
 ├── pages
 ├── routes
 ├── services
 ├── types
 └── utils
```

### 🔄 Data Flow

- User interacts with SaldoPlanerWeb
- Application sends requests to XSWareAPI
- API validates authentication and business logic
- Data is fetched from XSWareDBService
- Processed data is returned and visualized in the UI

### 🧪 Testing

Testing strategy depends on the selected setup (e.g. Jest / React Testing Library).

Example:
```bash
npm test
```

### 🔗 Related Projects

- XSWareAPI – Backend API (Spring Boot, Java)
- XSWareDBService – Database service (Kotlin, Spring Boot)
