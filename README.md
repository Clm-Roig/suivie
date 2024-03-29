# SuiVie

<div align="center">
  <img src="https://user-images.githubusercontent.com/20704943/167381575-94f28897-0e11-40c9-a8db-5d00e90166ae.png" width=300 style="margin:auto"/>
  <p><i>
    Logo by <a href="https://laurakaczmarek.fr">Laura KACZMAREK</a>
  </i></p>

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/9f4ce0a620d94a07aad5190f009b9b79)](https://www.codacy.com/gh/Clm-Roig/suivie/dashboard?utm_source=github.com&utm_medium=referral&utm_content=Clm-Roig/suivie&utm_campaign=Badge_Grade)
![GitHub Workflow Status (branch)](https://img.shields.io/github/actions/workflow/status/clm-roig/suivie/build_test.yml?branch=develop)
[![cypress](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/i4ns1y&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/i4ns1y/runs)
[![GitHub tag](https://img.shields.io/github/tag/clm-roig/suivie?include_prereleases=&sort=semver&color=blue)](https://github.com/clm-roig/suivie/releases/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-yellow.svg)](https://github.com/prettier/prettier)

</div>
  
This application is inspired by the [Bullet Journal's trackers tool](https://diaryofajournalplanner.com/bullet-journal-habit-tracker/). It aims to track your habits like sports, food, hygiene, self-care, expenses... Even if it works on desktop, it is designed for mobile devices.

## Table of Contents

- [Main features](#main-features)
- [Development](#development)
- [About](#about)

## Main features

📄 Create tracker with a name, begin date, color, duration, frequency and add as much objectives as you want

✅ Validate a tracker today or in the past

🚀 Client-only application, no internet connection needed (data is stored in locale storage)

👻 Hide a tracker for one day if you are sure you will not validate it or if you want to focus your attention on the other ones

📊 View statistics about your trackers by weeks, month or year

## Development

### Pre-requisites

- nvm aka [Node Version Manager](https://github.com/nvm-sh/nvm) (or Node.js v16+)

### Main development scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template. You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

- `npm install`
- `npm start`
- `npm test`

### Release

`npm run release` (on develop branch, then PR to main branch)

This project use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) and [standard-version package](https://github.com/conventional-changelog/standard-version).

The application is deployed on the Github repository page [here](https://clm-roig.github.io/suivie).

## About

### Why this project? Why I built it this way?

I wanted to build an application with a modern React stack and CI tools (Typescript, Github Actions, standard-version, Cypress, Prettier & ESLint). I like stats and I like to organize my life around 2 electronic productivity tools: todo lists and calendars. I thaught Bullet Journal trackers was a good idea to complement them 🙂

### How I work on this project?

I wanted to focus on Github tools in order to have everything I need in one place:

- I write notes in a Kanban table ([Project tab](https://github.com/Clm-Roig/suivie/projects?type=beta))
- I create an issue related to the note with details and labels ([Issue tab](https://github.com/Clm-Roig/suivie/issues))
- I work on a branch and I open a Pull Request when it's done ([PR tab](https://github.com/Clm-Roig/suivie/pulls))
- On the PR, the test, linting and code security scripts are run ([Actions tab](https://github.com/Clm-Roig/suivie/actions))
- I merge the PR after rereading my code.
- Eventually, I create a new version of the application (see [CHANGELOG.md](https://github.com/Clm-Roig/suivie/blob/develop/CHANGELOG.md))

### This project uses

![React_logo_wordmark](https://user-images.githubusercontent.com/20704943/164058596-3816998c-7d62-4ac9-89ce-e46cb61213db.png)
![Typescript_logo_2020 svg](https://user-images.githubusercontent.com/20704943/164058603-56bfd228-bfd1-4112-9931-055d48ef0b27.png)
![mui](https://user-images.githubusercontent.com/20704943/164058591-79c197bf-b4b4-4b5d-88ac-17c97de793d5.png)
![recharts](https://user-images.githubusercontent.com/20704943/164058599-affd54c1-d7a8-4980-a142-5a0f1b4c8a95.png)
![Redux](https://user-images.githubusercontent.com/20704943/164058602-b96af456-1e2b-4895-a12e-11b8084dc432.png)
![eslint](https://user-images.githubusercontent.com/20704943/164058589-a52b0210-1f47-4d8e-a04a-3eff1976dcb7.png)
![prettier](https://user-images.githubusercontent.com/20704943/164058595-b2912e5f-1eaa-4200-9cc6-4b84b23804f6.png)
![cypress](https://user-images.githubusercontent.com/20704943/174458261-43b98d1c-121c-4750-af50-00f50f87892e.png)
