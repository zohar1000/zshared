# zshared
Useful javascript/typescript utilities collected over the years.<br/>
The utilities relate to handling arrays, objects, strings, time, etc.<br/>
It can be used on browser/node/deno, it has 0 dependencies and is optimized for performance.

### Installation
```sh
npm install zshared
```

The library can be consumed by using either 'require' or 'import' syntax.<br/>
The libraray is devided to classes, each handles its own area (arrays, strings, etc).<br/>
Each class name begins with 'Z' and the area (ZArray, ZString, etc).<br/>
```sh
import { ZTime, ZArray } from 'zshared';
```


## Some examples
Below are some examples, the complete list can be found in the docs.<br/>
All class functions are static.

#### Time
```sh
await ZTime.sleep(1000);  // wait 1 second
```

get local/utc time in universal format, local time zone GMT+3
```sh
ZTime.utcUniDateTime();     // returns '2020-04-29 17:29:20'
ZTime.localUniDateTime();   // returns '2020-04-29 20:29:20'
```

convert seconds to display time (hh:mm:ss) 
```sh
ZTime.seconds2UniTime(3500) // returns '33:20'
```

#### Objects
```sh
const obj1 = { a: 1, b: 2, c: 3 };
ZObj.clone(obj1);  // returns shallow copy { a: 1, b: 2, c: 3 };
ZObj.clone(obj1, ['a', 'c']);  // pass keys array, returns: { a: 1, c: 3 };
```

```sh
ZObj.areEquals(obj1, { a: 1, b: 2 });  // returns false
ZObj.areEquals(obj1, { a: 1, b: 2, c: 3 });  // returns true
```

#### Arrays
```sh
items = ['a', 'b', 'a', 'c'];
ZArray.distincts(items);  // returns ['a', 'b', 'c'];
ZArray.deleteItem(items, 'b');  // items is now ['a', 'a', 'c'];
```

```sh
items = ['a', 'b', 'c'];
ZArray.toObj(items);  // returns { a: 'a', b: 'b', c: 'c' };
ZArray.toObj(items, item => '_' + item);  // pass a function, returns { a: '_a', b: '_b', c: '_c' };
```

convert items array to objects
```sh
items = [{ a: 1 }, { b: 2 }]; 
ZArray.toObj(items);  // returns { a: 1, b: 2 };
ZArray.toObj(items, (key, value) => value * 2);  // pass a function, returns { a: 2, b: 4 };
```

#### Numbers
```sh
ZNumber.thousandsSep(12345);  // returns 12,345 or 12.345, depends on locale
```

#### Strings
```sh
const str = '2 cats met another cat';
ZString.replaceAll(str, 'cat', 'dog');   // returns '2 dogs met another dog'
ZString.occurrences(str, 'cat');         // returns 2
ZString.initialCapital('good morning');  // returns 'Good morning'
ZString.replaceParams('I say {0} {1} and {0}', 'bla', 'gla);  // returns 'I say bla gla and bla'
```

#### logt
the libraray contains also a static function 'logt', it acts like console.log() with a time prefix
```sh
logt('some message', 1200, 'another message');  // output: 2020-04-29 23:39:12.397 ==> some message 1200 another message
```



