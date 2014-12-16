Reactjs Component Playground
============================

A place where you can design with your existing react components by drag and drop and changing component properties.

## Features
1. Drag and drop components to the playground area. Drag the component to place it in the right place.
2. Modify the components properties on the fly from the input boxes (needs propTypes to be defined).
3. Modify the components styles on the fly (needs className or style as a prop).
4. Complete history of the changes you made in the playground with undo, redo and goto any point in history functionalities.
5. Unique sharable link to share your work with others. With complete history preserved.
6. Auto save the work on every action.

## How to add your own components to the playground

You can add your own components easily to the list of components to be shown by adding an object to the `uidata` array in the file `src/js/uidata.jsx`.

For e.g., if you have built a component name `List`, then in the `src/js/uidata` file - 

```
var MyList = require('/path/to/listcomponent');
var UI = {
    'MyComponents/MyList': {
        comp: MyList,
        props: {
            data: [], // pass data to the list
            style: {},
        },
        dragImage: require('./../images/ghost-images/mycomponents/list.png'), // optional.
        icon: 'image-adjust' // optional. checkout material-ui icon for icon options
    },
    ... // the rest of the components
};
```

The properties of the component are sniffed from the propTypes object of the component. So make sure to specify propTypes in all your components.

Also, the style for each component is customized by adding a custom className to the component. So if you want the style to be editable do *either* of the two - 
    - Accept a prop named `className` and append that className to your component
            OR
    - Accept a prop named `style` and append that to your prop

Once you are done with the above set up, it's time to build and start the server.

## Build and Start the server

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