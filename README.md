# Pace


## A mile pace calculator written in [NestJS](nestjs.com) and [ReactJS](reactjs.org)

#### Main Technical Features

- REST API written in NestJS, a progressive Node.js/Express.js framework
- SPA written in React and [Typescript](typescriptlang.org)
- UI components and styling from [Material UI](material-ui.com)
- Displaying charts using [Nivo](nivo.rocks), a data visualization library
- Utilizing [Lodash](lodash.com) to simplify data stricture traversal

### Documentation

---

## Backend

#### Getting Started

1. Navigate to `/API.Client`
2. `npm i`
3. `npm start`
4. Project is accessible from `http://localhost:3001`

#### Routes

```
GET /pace
```

- Gets all PaceDto's

```
POST /pace

{
  currentMile: number;
  mileTime: number;
}
```

- Creates a new Mile Pace

```
DELETE /pace

?id={ID of Mile Pace}
```

- Deletes a Mile Pace

```
GET /pace/graph
```

- Gets the current Average Pace Graph

---

## Frontend

#### Getting Started

1. Navigate to `/Client.Pace`
2. `npm i`
3. `npm run`
4. Front end project is accessbible from `http://localhost:3000`
