# intake.js
A simple DI container based on ES7 Decorators written in Typescript.

## Install

You can get the package via npm:

```
npm install intakejs
```
	
Just import decorators and you are ready to go:

```
import {Service, Inject} from "intakejs"
```
	
To use intake.js in node.js/io.js enviroment, just import it with ```require``` statement:

```
let intake = require('intake');
```
	
AMD version for client-side usage is also available:

```
require(['node_modules/intakejs/build/intak'], function(intake) {
	...
});
```
	
## Usage

Usage is quite simple:

### 1. Use definition reference:

  ```		
  /// <reference path="<my_project>/node_modules/intake.js/build/intake.d.ts" />
  ```

### 2. Import decorators:

```
import {Service, Inject} from "intakejs";
```
	
### 3. Define a service:

```
@Service
class Producer { 
    //ensure your service class has a constructor with no arguments
        
    public static service_name = 'producer'; //this field is runtime id for your service
        
    foo() {
        return 'foo';
    }
}
```

### 4. Inject it in consumer class: 

```
class Consumer {
    @Inject('producer')     //injects service with name 'producer'
    private foo: Producer; //you can use this field after class is constructed

    public bar(): string {
        return this.foo.foo() + 'bar';
    }
}
```
 
### 5. That's all, you can use it:

```
let consumer = new Consumer();
consumer.bar(); //returns "foobar"
```		

## Roadmap

* Add name parameter to ```@Service``` decorator
* Create mechanism for injecting mock dependencies in test enviroment
* Use decorators metadata for automatic service name generation
* Add support for injecting service into constructor

## License
MIT

