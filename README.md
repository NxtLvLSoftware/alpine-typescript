<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./.github/banner-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="./.github/banner-light.svg">
    <img alt="Project Banner (@nxtlvlsoftware/alpine-typescript)" src="./.github/banner-light.svg" width="350" height="160" style="max-width: 100%;">
  </picture>
</p>

<h1 align="center">
  Alpine.js Typescript Components
</h1>

<h4 align="center">
  Define your component logic in classes with added type safety.
</h4> 

<h6 align="center">
  Based on <a href="https://github.com/archtechx/alpine-typescript">archtechx/alpine-typescript</a> with
  <a href="./tsconfigs">tsconfigs</a> from <a href="https://github.com/withastro/astro/tree/main/packages/astro/tsconfigs">astro.js</a>.
</h6>

<br /><hr /><br />

* [Installation](#installation)
* [Usage](#usage)
  * [Projects](#in-projects)
    * [Setup](#project-setup)
  * [Packages](#in-packages)
    * [Setup](#package-setup)
  * [Defining Components](#defining-components)
    * [Generic Objects](#generic-objects)
    * [Classes](#typescript-classes)
  * [Using Components](#using-components)
* [Contributing](#contributing)
  * [Issues](#issues)
* [License](#license-information)

<br /><hr /><br />

## About
This package provides support for writing reusable Alpine.js components in Typescript.
Supporting Alpine's existing model of registering any generic object/type and user-defined
classes inheriting from the [AlpineComponent class](./src/Component.ts) which provides type
definitions for Alpine's magics. This enables your IDE to give useful auto-completion without
any extra plugins/extensions and gives Typescript a better understanding of your component
code, producing useful compilation/transpilation errors before testing.

### Installation
```
npm install --save @nxtlvlsoftware/alpine-typescript
```
The package requires manual initialization in the browser as we don't assume a specific use-case:

Using `Alpine.plugin()`:
```typescript
import Alpine from 'alpinejs';

window.Alpine = Alpine;

import { componentPlugin } from '@nxtlvlsoftware/alpine-typescript';

Alpine.plugin(componentPlugin);
Alpine.start();
```
This is the easiest way to get started in existing projects but doesn't offer a way to modify the
default options provided the package.

Using `AlpineComponents.bootstrap()`:
```typescript
import Alpine from 'alpinejs';

window.Alpine = Alpine;

import { AlpineComponents } from '@nxtlvlsoftware/alpine-typescript';

AlpineComponents.bootstrap();
```
The default options are best suited to new projects and automatically starts Alpine for you.
To integrate into existing projects seamlessly, just pass in an options object:
```typescript
import { AlpineComponents } from '@nxtlvlsoftware/alpine-typescript';

AlpineComponents.bootstrap({
  startAlpine: false,
  logErrors: true // should only enable this in dev enviroments for debugging
}); // pass the Alpine object explicity if you aren't following the default convention

window.Alpine.start();
```
If you aren't following the default convention of defining `window.Alpine` after importing Alpine
just pass it after your options object:
```typescript
import Alpine from 'alpinejs';

let myAlpine = Alpine;

import { AlpineComponents } from '@nxtlvlsoftware/alpine-typescript';

const isProduction = () => false; // equivelent would be injected/definied server-side by your framework
AlpineComponents.bootstrap({
    logErrors: !isProduction()
}, myAlpine);

// might break alpine or other packages by defining after init but we support it ¯\_(ツ)_/¯
window.Alpine = myAlpine;
```

### Usage
This package can be used to define components directly in projects or to distribute components
in their own package.

#### In Projects
This package is designed to be easily integrated into existing projects. You can start by
migrating complex, logic heavy components into classes without worrying about the simple stuff
that makes Alpine so powerful.

Take a look at the provided example project [here.](./examples/project)

##### Project Setup
You'll want to start by [installing](#installation) the package then add these lines to your
client script:
```typescript
import { AlpineComponents } from '@nxtlvlsoftware/alpine-typescript';

AlpineComponents.bootstrap({
  components: {
    //
  },
  startAlpine: false,
  logErrors: true
});
```

Now create a directory for your components, something like `components` and create a new
Typescript file and add:
```typescript
import { AlpineComponent } from "@nxtlvlsoftware/alpine-typescript";

export class MyComponent extends AlpineComponent<MyComponent> {

  constructor(
    public required: string,
    public optional: boolean = false
  ) {
    super();
  }

  init(): void {
    //
  }

}
```
Now register your new component in the `AlpineComponents.bootstrap()` method call:
```typescript
import { MyComponent } from './components/MyComponent';

AlpineComponents.bootstrap({
  components: {
    myComponent: MyComponent
  },
  ...
});
```
You can now use the component in your HTML with `x-data="myComponent('Hello World!')"`.
#### In Packages
The main purpose of this package is to easily distribute components in their own package.

Take a look at the provided example components package [here.](./examples/package)

##### Package Setup
The easiest way to start distributing your components is to copy everything from the [package example](./examples/package)
directory and start writing your components.

Manual setup requires a project with `typescript` installed to compile the code to javascript:
```
npm i --save-dev typescript
```
Then add the following scripts to `package.json` for running `tsc`:
```json
  "scripts": {
    "build": "tsc -p ./",
    "dev": "tsc --watch -p ./"
  }
```
You'll need to tell `tsc` about the target on which the javascript it produces will be
executed in `tsconfig.json`:
```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "include": [
    "src/**/*.ts",
    "index.ts"
  ],
  "compilerOptions": {
    "target": "es5",
    "module": "ESNext",
    "declaration": true,
    "noEmit": false,
    "lib": [
        "es2017",
        "dom"
    ]
  }
}
```
Now create a `index.ts` file, `src` and `src/components` directories:
```
touch index.ts && mkdir src && mkdir src/components
```
The `index.ts` file doesn't have to be in the root of your package but doing so prevents
any confusion/indirection caused by defining a custom index path in `package.json`. You'll
want to export all types, classes and global variables from your `index.ts` file so
they're available with a simple `import { Type, Type2, Var } from '@org/package-name';` call.

For convenient consumption of your components you'll want to define a bootstrap method similar
to this package:
```
touch src/Plugin.ts
```
Copy the following and change the namespace to the name of your package:
```typescript
import {
  AlpineComponents,
  makeAlpineConstructor,
  type Globals
} from '@nxtlvlsoftware/alpine-typescript';

import {
  MyComponent,
  DefaultMyComponentName
} from "./components/MyComponent";

export namespace MyComponents {

  export interface Options extends AlpineComponents.Options {
    myComponentName: string;

    bootstrapComponents: boolean;
  }

  export const defaultOptions = {
    ...AlpineComponents.defaultOptions,

    myComponentName: DefaultMyComponentName,

    bootstrapComponents: true
  } satisfies Options;

  export function bootstrap(
    options: Partial<Options> = defaultOptions,
    alpinejs: Globals.Alpine = window.Alpine
  ): void {
    const opts: Options = {
      ...defaultOptions,
      ...options
    };

    // make typescript happy
    let alpine = <Globals.AlpineWithComponents>alpinejs;

    document.addEventListener('alpine:init', () => {
      // Register any alpine stores your components rely on here.
    });

    document.addEventListener('alpine-components:init', () => {
      // Basic registration with support for consumers to provide their own
      // name for use with x-data.
      alpine.Components.register(MyComponent, opts.myComponentName);
    });


    // Allow booting alpine and the components package.
    if (opts.bootstrapComponents) {
      AlpineComponents.bootstrap(opts, alpine);
    }
  }

}

// Support loading our components with a standardized call to Alpine.plugin().
export function myPlugin(alpine: Globals.Alpine): void {
  MyComponents.bootstrap(
    {
      // can't assume we're the only ones using the component library
      bootstrapComponents: false,
      // definitely not the only ones using alpine if we're being used as a plugin here
      startAlpine: false
    }, alpine);
}
```
Export the `MyComponent` namespace and `myPlugin()` function as default from `index.ts`:
```typescript
export {
  MyComponents,
  myPlugin
} from './src/Plugin';

/**
 * Alpine plugin as default export.
 */
import { myPlugin } from './src/Plugin';
export default myPlugin;
```
Now you can start writing your components. Remember to create the `src/components/MyComponent.ts`
file before running `npm run dev` or `npm run build`.

#### Defining Components

Guide

##### Generic Objects

##### Typescript Classes

#### Using Components

Guide

## Contributing

#### Issues

Found a problem with this project? Make sure to open an issue on
the [issue tracker](https://github.com/NxtLvLSoftware/alpine-typescript/issues)
and we'll do our best to get it sorted!

## License Information

[`nxtlvlsoftware/alpine-typescript`](https://github.com/NxtLvlSoftware/alpine-typescript) is open-sourced software,
freely available to use under the terms of the
[MIT License](https://www.techtarget.com/whatis/definition/MIT-License-X11-license-or-MIT-X-license).

__A full copy of the license is available [here](../LICENSE).__

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.

#

__A [NxtLvL Software Solutions](https://github.com/NxtLvLSoftware) product.__
