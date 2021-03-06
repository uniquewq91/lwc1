# LWC Learning Notes

## Basic

> there are 2 files,  ***eslintrc*** and ***jsconfig.json***, in the lwc folder.

The Lightning Web Components extension ships by default with ESLint. ESLint is a widely used linting tool that evaluates code for errors, coding best practices, and more. Salesforce provides specific ESLint rules out of the box for you as a Lightning Web Component developer so that you can write great code. And if you make a mistake, the linting rules help you see it before you deploy your code.

> The JavaScript file for a Lightning web component must include at least following code, where MyComponent is the name you assign your component class.

```Javascript
import { LightningElement } from 'lwc';
export default class MyComponent extends LightningElement {
}
```

> The Lightning Web Component model uses modules (built-in modules were introduced in ECMAScript 6) to bundle core functionality and make it accessible to the JavaScript in your component file. The core module for Lightning web components is `lwc`

```Javascript
import { LightningElement } from 'lwc';
```

> Bring in the module with the import statement and specify the functionality of the module that your component uses.
>
> In our example, the import statement indicates the JavaScript uses the LightningElement and track functionality from the lwc module.

```Javascript
import { LightningElement, track } from 'lwc';
```

> The export statement defines a class that extends the LightningElement class. As a best practice, the name of the class usually matches the file name of the JavaScript class, but it’s not a requirement.

```Javascript
export default class MyComponent extends LightningElement {
}
```

### Decorators

> Decorators are often used in JavaScript to extend the behavior of a class, property, getter, setter, or method.
>
> Examples of Lightning Web Component decorators include:
>
> - `@api`: Marks a property as public for use in your template or other components.
> - `@track`: Marks a property for internal monitoring. A template or function using this property forces a component to rerender when the property’s value changes. Use this to store values locally, especially as a user interacts with your component.
> - `@wire`: Gives you a way to get and bind data. This implementation simplifies getting data from a Salesforce org.
>
> You can import multiple decorators. Like:

```Javascript
import { LightningElement, track, api } from 'lwc';
```

## Lighting Data Service

### How does it work

lwc <--> Lightning Data Service <--> UI API <--> sObject

### Ways to get data from server

#### Using Base Lightning Components

Lightning Record Form
Lightning Record View Form
Lightning Record Edit Form

#### Using Wire Service

***Syntax***

```Javascript
import {adapterId} from 'adapterModule';
@wire(adapterId, adapterConfig) propertyOrFunction;
```

***Usage***

```Javascript
import {LightningElement, api, wire} from 'lwc';
import {getRecord} from 'lightning/uiRecordApi';

export default class Record extends LightningElement{
    @api recordId;
    @wire(getRecord, {recordId:'$recordId',fields:['Account.Name']}) myProperty;
}
```

## Resources

### `this` Keyword

> The `this` keyword in JavaScript refers to the top level of the current context. Here, the context is this class. Which ***ready***? This class’s ***ready***. The connectedCallback() method assigns the value for the top level ***ready*** variable.

```Javascript
import { LightningElement, track } from 'lwc';
export default class App extends LightningElement {
    @track  
    ready = false;
    connectedCallback() {
        setTimeout(() => {
            this.ready = true;
        }, 3000);
    }
}
```

### Call Apex Methods from LWC

1. Import Apex Methods into JS file of that LWC
2. It now treated as a JS function
3. We can call these functions directly from JS
4. How to call these function?
    1. Wire Service (must set it as @AuraEnabled(cacheable=true))
        1. Wire apex method to a property
        2. Wire apex method to a function
    2. Call imperatively

#### Call Apex method using wire service

***Syntax***

```Javascript
import apexMethod from '@salesforce/apex/Namespace.Classname.apexMethod';
@wire(apexMethod, {apexMethodParams}) propertyOrFunction;
```

***Usage***

```Javascript
import {LightningElement, track, wire} from 'lwc';
import findContacts from '@salesforce/apex/ContactController.findContacts';

export default class extends LightningElement{
    @track searchKey = '';
    @wire(findContacts, {searchKey:'$searchKey'}) contacts;
}
```

#### Call Apex method imperatively


## Issues
