# Lunanore

Lunanore is my personal 3D typescript game framework built on top of [Three](https://threejs.org).

## About

### Background
If you look at my other repositories you will notice quickly I also have several other library projects focussed at game development. I have been a game (engine) developer for almost a decade and if I wanted to create a 3D library I could.. eventually. I decided however _not_ to because there are many 3D rendering libraries already out there. Three is such a library.

While I would not recommend trying to create the next Call of Duty or Skyrim with Three, it sure as hell is powerful enough for a lot of web games. But not just games. Three is also used a lot in the indudstry for the creation of CAD software. That said..

### Downsides

As you have noticed, Three is not specifically designed for video games and only provides functionality for rendering 3D objects and a wrapper for the Web Audio API. It does not cover input, asset magenement or specific structures because that would be out of scope for Three. However, because Three is pretty genericaly designed it is easy to end up with chaotic code. Especially if you have to do all the input management yourself too.

### Lunanore.. I choose you!

That is where Lunanore comes in. Lunanore provides a structure that allows you to maintain that overview and quickly have a basic game project up and running. Lunanore does so by providing classes for asset management, scene control and input like mouse, keyboard, touch and even gamepads. Lunanore also comes with its own wrapper for the Web Audio API. The only reason I included it because I already had one from my other project [Aquanore](https://github.com/thebonejarmer/aquanore).

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