# Tweello

## Project Description

Tweello unlocks a company's ultimate potential to improve their workflow by allowing for the
efficient organization of workspaces, boards, and tasks. Users will be able to create shared
workspaces for teams and boards for projects to organize and assign tasks and track progress.

### Built With

- [![Next][Next.js]][Next-url]
- [![NodeJS][Node.js]][Nodejs-url]
- [![Express][Express]][Express-url]
- [![MongoDB][MongoDB]][MongoDB-url]

## Getting Started

### Project Folder

After installing dependencies, you can run both client and server from the root folder through one command

```sh
npm start
```

### Front-End

Create `.env` inside `client/` folder and fill in contents from Discord

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<GET_FROM_DISCORD>
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Install necessary packages and run the frontend app

```sh
cd client
npm i
npm run dev
```

### Back-End

Create `.env` inside `server/` folder and fill in contents from Discord

```
NODE_ENV=development
PORT=8000
MONGO_URI=<GET_FROM_DISCORD>
retryWrites=true&w=majority
JWT_SECRET=<GET_FROM_DISCORD>
```

Install necessary packages and run the backend app

```sh
cd server
npm i
npm run server
```

## Authors

- [Diego Garcia](https://github.com/diegogarciacs)
- [Jordan Ali Hilado](https://github.com/jordanhilado)
- [Daniel Jo](https://github.com/danielskjo)
- [Grant Smith](https://github.com/grantsmith01)
- [Sarah Zacky](https://github.com/sarahzacky)

<!-- Markdown Links -->

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Node.js]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Nodejs-url]: https://nodejs.org/en
[Express]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
