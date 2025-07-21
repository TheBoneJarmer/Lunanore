# Lunanore

Lunanore is my personal 3D typescript game framework built on top of Three. Lunanore does not abstract away Three functionality but rather tries to give more handhelds and structure to get you started easier.

## About

### Background
For those who have looked at my GitHub repositories will have noticed I also have several other library projects. Most of of them are focussed on OpenGL and WebGL. I have been a game (engine) developer for almost a decade and if I wanted to create a 3D engine I could. I choose however not to take that route because there are enough 3D rendering libraries that already do the heavy lifting for you. Three is such a library.

While I would not recommend trying to create the next Call of Duty or Skyrim with Three, it sure is powerful enough for smaller web games. And combined with the power of Typescript you can get something up and running rather quickly. However..

### Downsides

Three is not specifically designed for video games and only provides functionality for rendering and basic audio. Because Three is designed in a generic way it is easy to end up with chaotic code. And maybe that does not have that much of an impact on very small projects, for bigger ones it can get messy very quickly.

### Lunanore.. I choose you!

That is where Lunanore comes in. Lunanore provides a structure that allows you to maintain that overview and clarity. Lunanore does so by providing classes for assets management and scene control. But on top of that does Lunanore also provide classes for input. With Lunanore you have a structured way of building your game while remaining access to Three features.

## Installation

```shell
npm install --save lunanore
```

## Examples

I highly recommend looking at the [example folder](./src/examples/). That way you get some idea of how to use Lunanore. When the framework is stable enough I will provide some documentation too.

## Contribution

Right now I have pull requests locked because I am still working on the beta version but in the future help is certainly welcome!

## License

[MIT](./LICENSE)