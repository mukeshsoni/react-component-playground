Reactjs Component Playground
============================

A place where you can design with existing react components by drag and drop and other not programmatic ways.

The question to answer is - Can we use immutable data structures and react's rerender logic to build a photoshop like thing, but for react components only?

How to try it out -

Install [Redis](http://redis.io/download) and run the redis server

```
$ redis-server
```

Install npm packages, build using webpack and run the node server

```
$ npm install
$ npm install webpack -g
$ webpack --progress --colors --watch
$ node server
```

Go to the link - [http://localhost:3001](http://localhost:3001)