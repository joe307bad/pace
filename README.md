# Pace

![Pace](https://raw.githubusercontent.com/joe307bad/pace/master/Capture.PNG)

## A mile pace calculator written in [NestJS](http://nestjs.com) and [ReactJS](http://reactjs.org)

#### Main Technical Features

- REST API written in NestJS, a progressive Node.js/Express.js framework
- SPA written in React and [Typescript](http://typescriptlang.org)
- UI components and styling from [Material UI](http://material-ui.com)
- Displaying charts using [Nivo](http://nivo.rocks), a data visualization library
- Utilizing [Lodash](http://lodash.com) to simplify data structure traversal

### Documentation

---

## Back end

#### Getting Started

1. Navigate to `/API.Pace`
2. `npm i`
3. `npm start`
4. Back end project is accessible from `http://localhost:3001`

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

## Front end

#### Getting Started

1. Navigate to `/Client.Pace`
2. `npm i`
3. `npm start`
4. Front end project is accessbible from `http://localhost:3000`
