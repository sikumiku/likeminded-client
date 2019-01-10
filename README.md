# LikeMinded app client [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/sikumiku/likeminded-client/pulls)

![LikeMinded logo](https://i.imgur.com/KfMHj4c.png)

LikeMinded is an appication for tabletop enthusiasts that would like to find other tabletop gamers with similar tastes and organize groups as well as ongoing events.

This repository is for the client portion of it that is responsible for web user interface.
Backend repository can be found [here](https://github.com/sikumiku/likeminded-service).

- [Used technologies](#used-technologies) – Used technologies in app.
- [Contributing](#contributing) – How to set up local development environment for making any changes.
- [Functional requirements that still need implementation](#missing-functional-requirements) – Improvements to be implemented.
- [Principles](#principles) – Principles to follow when developing.
- [Authors](#authors) – Contributing authors.

If you see anything not working, feel free to report [issues here](https://github.com/sikumiku/likeminded-client/issues/new).

## Quick Overview

### Used technologies

- ECMA Script 6
- React
- Bootstrap
- Node.js/NPM
- Express
- Jest + Enzyme
- Hosting platform: Heroku

### Contributing

Everybody is welcome to contribute to the project. Some tips on getting started:

1. `git clone git@github.com:sikumiku/likeminded-client.git`
2. `cd react-ui`
2. for quick development:
   - `npm install`
   - `npm start`
   - service started on http://localhost:3000
3. for running via express server:
   - `npm run build`
   - `serve -s build`
   - - service started on http://localhost:5000

For setting up backend for quick development, follow the guide at the service repository.

### Functional requirements that still need implementation

- [ ] Create lower panel with About links, Github links, contact form etc.
- [ ] Change button colors to follow the Night Shadz color (dark pink).
- [ ] Polish mobile views, hide sidemenu behind movable drawer
- [ ] Use endpoint for querying blogposts.
- [ ] Add page for posting, editing and deleting blogposts (sponsor/admin only).
- [ ] Use endpoint for querying adverts.
- [ ] Add page for posting, editing and deleting adverts (sponsor/admin only).
- [ ] Admin tools UI (admin only).
- [ ] i18n implementation.
- [ ] Translations (English, Russian).
- [ ] Direct users to group creation when they want to invite people to group but need to create one.

### Principles

Principles to follow when developing anything new:

- Anything that would track states, goes to `containers` folder.
- Anything that only deals with visual elements, goes to `components` folder
- Style files use `.module.css` format, so they would only be accessible to the importing class.

## Authors

LikeMinded thanks the following people for contribution:
- [sikumiku](https://github.com/sikumiku)
