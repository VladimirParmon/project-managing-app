# Project Managing Application

<p align="center">A Roling Scope School task-project</p>
<p align="center">
  <a href="https://github.com/rolling-scopes-school"><img alt="GitHub followers" src="https://img.shields.io/badge/RSS-%F0%9F%8E%93-faea68?style=for-the-badge"></a>
  <a href="https://github.com/rolling-scopes-school/tasks"><img alt="GitHub forks" src="https://img.shields.io/github/forks/rolling-scopes-school/tasks?color=faea68&label=RSS%20Tasks&style=for-the-badge"></a>
</p>
<p align="center">
  <a href="https://pm-app-team-17.netlify.app">🚀 Deploy (Demo)</a> <br>
  <a href="https://github.com/rolling-scopes-school/tasks/blob/master/tasks/angular/project-management-app.md">📗 Technical specification</a>
</p>

<h3 align="center">Our team</h3>
<p align="center">
  <b>👨‍💻 Vladimir Parmon</b> (<a href="https://github.com/VladimirParmon">@VladimirParmon</a>)<br>
  👨‍💻 Illia Skaryna (<a href="https://github.com/Ilya758">@Ilya758</a>)<br>
  👨‍💻 Yan Poleshko (<a href="https://github.com/shadowinhaze">@shadowinhaze</a>)
</p>

## About

School project. A simple Web application is an analogue of popular services for managing working environment in teams (Trello, ClickUp, Y.Tracker). The application can be used by only registered users. The functionality of the application boils down to three simple actions: CRUD a board, CRUD columns, CRUD tasks. And don't forget to delete them all at the end of your working day!

In this school project, our team worked exclusively on the UI part and writing API methods. The backend was provided by RSS, ready-made and not modified.

## Stack Technology

### 🧱 Back-End

[Full documentation and repo](https://github.com/vitaly-sazonov/kanban-rest)

All information (users, boards, columns and tasks) is stored in a `PostgreSQL` Open Source Relational Database, the backend was written using `Node.js`, `Express.js`, `Nest.js` libraries. The BE is perfectly documented with `Swagger`. The backend is deployed on the free `Heroku` service.

### 🌴 Front-End

- This project was built with `Angular 13` framework.

- We use `NGRX` @13.\* — RxJS powered global state management for Angular applications, inspired by `Redux`. `NGRX` is as nowadays the go-to way to use Redux in Angular Applications. `WEB Storage API` (localStorage) is used for store authorized user data (name, token).

- All API-methods were made in-box Angular http-methods.

- The lack of a UI/UX-designer was compensated by using the `Angular Material` library with ready for use components.

- `SASS` preprocessor (.scss syntax) was used for component stylization and extension MAT components inline styles.

- `.eslint` and `.prettier` were used for maintenance code-quality and unified code-writing.

---

💡 You can run your own front-end version:

- Clone repo with FE and BE.
- Read BE documentation and wiki-page for deploying DB version.
- Open App folder, don't forget change address for your BE at /src/environments files.
- `npm i`
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

---

### 🛣️ Future plans

BE - heart of our Application is developing rapidly. New features and simplifications are released literally every week. We used old-version of BE for building out application. If we were to continue developing application, we would like to implement the following things:

- Unit testing (Karma)
- End tasks reordering implementation.
- Add UI animations.
- Auto reAuth (+refresh token), add google auth.
- Fix, fix and fix bugs :)

---

### 🔨 Our Current App status

**PROGRESS** - we are working on it!<br>
![](https://us-central1-progress-markdown.cloudfunctions.net/progress/68)
