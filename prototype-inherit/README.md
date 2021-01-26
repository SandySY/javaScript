---
# 主题列表：juejin, github, smartblue, cyanosis, channing-cyan, fancy, hydrogen, condensed-night-purple, greenwillow, v-green, vue-pro, healer-readable, mk-cute, jzman, geek-black, awesome-green, qklhk-chocolate
# 贡献主题：https://github.com/xitu/juejin-markdown-themes
theme: channing-cyan
highlight:
---

![image](https://github.com/SandySY/javaScript/tree/master/prototype-inherit/js_person1.png)

## JavaScript原型、原型链、继承之随记随查至通透
这是一个炒冷饭的话题，既然是很老旧的知识点，那还有这么多人去炒，肯定是说明这其中有事儿：
- 有难以揣摩的、
- 不好记忆的、
- 容易混淆的；
那这次就一起给收拾干净！       

### **开局代码**    
---
``` js
function Person(name) {
  this.name = name;
}
Person.prototype.age = 18;
var person = new Person();
```
>关键名词：构造函数 Person，实例对象 person，原型对象 Person.peototype；    
上面的代码咱们来看两个打印：
``` js
console.dir(person);
console.log(typeof person, typeof Person, typeof Person.prototype);
```
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03fdbdc7869b4a58b53cee188dd46acf~tplv-k3u1fbpfcp-watermark.image)			

> 大白话描述：构造函数 new 创建的 person对象，通过__proto__（浏览器调试使用，不可用在代码中）person 对象可以访问原型对象，通过 constructor 原型对象可以访问构造函数。			

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7faa0eccbf54b69912b644779457929~tplv-k3u1fbpfcp-watermark.image)    


### 原型
---

在 JavaScript 中每个对象（除 null 外）创建的时候，就会关联另一个对象，这个关联对象就是原型对象，与大多数资料一致，后续简称原型(本质也是对象)，每一个对象都会从原型中继承属性。

#### 1) prototype
从这里可以看到，每个函数都有一个prototype属性，这个属性指向的是函数的原型对象。函数的原型可以通过.prototype属性获取到，可以读取或设置其原型对象的属性。    

#### 2) __ proto__
``` js
console.log(person.__proto__ === Person.prototype);   // true
```
每个对象(除 null 外)都会有一个__proto__ 属性，这个属性可以获取到该对象的原型    

#### 3) constructor
``` js
console.log(Person === Person.prototype.constructor);  //true
```
每个原型都有constructor属性，指向关联它的构造函数。    

#### 4) instanceof
有了以上的基础，我们继续探讨，怎么知道Person是不是person的原型上的构造函数呢？
instanceof就是处理这个事情，如果A沿着原型链能找到B.prototype，那么A instanceof B为true，此时B却不一定是A直接new出来的，切记，看几个特例；    
``` js
console.log(Object instanceof Object);//true 
console.log(Function instanceof Function);//true 
console.log(Function instanceof Object);//true 
console.log(Object instanceof Function);//true 

console.log(Number instanceof Number);//false 
console.log(String instanceof String);//false 
console.log(Person instanceof Function);//true 
console.log(Person instanceof Person);//false
```	    

### 原型链    
---    

#### 1) 套娃
原型是一个对象，原型的原型是什么？   
我们可以反复去打印获悉：    
``` js
console.log(person.__proto__.__proto__)   //Object
console.log(person.__proto__.__proto__.__proto__);    //null
```
于是，用一张图展示出上方person的原型链，那应该是这样：    
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a68c2db0f6c44ee870b4a3c51dfdfb5~tplv-k3u1fbpfcp-watermark.image)    

#### 2) 澄清概念
person套娃链结束，然而真正的难点却才刚刚开始，如果认真看到这里的话：    
- 上面的 instanceof 特例是怎么回事？      
- Object 和 Function 为何搞特殊待遇？    
不急，我们先来澄清一些概念，至少到目前为止可以帮助总结：    
> 1. JavaScript 对象分为函数对象和普通对象，每个对象都有__proto__属性，但是只有函数对象才有prototype属性
> 2. Object、Function都是JavaScript内置的函数, 类似的还有我们常用到的Array、RegExp、Date、Boolean、Number、String
> 3. 属性__proto__ 指向是一个对象(原型)，它有两个属性，constructor 和__proto__ ；
> 4. 原型对象 prototype 有一个默认的 constructor 属性，用于记录实例是由哪个构造函数创建；    

那么，我们归纳和精简一下： 
> 所有构造函数都是 Function 的实例，所有原型对象都是 Object 的实例除了 Object.prototype。
谈到这里，不得不上一张永恒的图，JavaScript 灵魂图：   
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0aa7f5b242bc41ebb4f7803a9ab018c0~tplv-k3u1fbpfcp-watermark.image)    
对与老前端来讲，这就是曾经夕阳下的奔跑...磕磕~    

#### 3) 特例单独记忆（易混淆）
``` js
Object.__proto__ === Function.prototype;
Function.prototype.__proto__ === Object.prototype;
Object.prototype.__proto__ === null;
```
这里推荐一个有趣的故事记忆法则，偶然发现的，觉得有意思它就有意思，觉得无聊就跳过此处：    
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dce8c27417af46c882a464bf1cb780ae~tplv-k3u1fbpfcp-watermark.image)    
> JS 说，我好寂寞。因为 JS 的本源是空的，即：null。   
> JS 说，要有神。所以它通过万能术 __proto__ 产生了 No1 这号神，即：No1.__proto__== null。   
> JS 说，神你要有自己的想法啊。所以神自己想了个方法，根据自己的原型 prototype 创建了对象 Object，即：Object.prototype == No1; No1.__proto__ == null。于是我们把 prototype 叫做原型，就好比 Object 的原型是神，男人的原型是人类一样，同时 __proto__ 叫做原型链，毕竟有了 __proto__，对象、神、JS 之间才有联系。这时候 Object.prototype.__proto__ == null。   
> JS 说，神你要有更多的想法啊，我把万能术 __proto__ 借你用了。所以神根据 Object，使用 __proto__ 做了个机器 No2，即 No2.__proto__ == No1，并规定所有的东西，通过 __proto__ 可以连接机器，再找到自己，包括 Object 也是，于是 Object 成为所有对象的原型，Object.__proto__.__proto__ == No1，然后 String、Number、Boolean、 Array 这些物种也是如此。   
> JS 说，神你的机器好厉害喔！你的机器能不能做出更多的机器啊？神咧嘴一笑：你通过万能术创造了我，我通过自己原型创造了对象。如此，那我造个机器 Function，Function.prototype == No2, Function.__proto__ == No2，即 Function.prototype == Function.__proto__ 吧！这样 No2 就成了造机器的机器，它负责管理 Object、Function、String、Number、Boolean、Array 这几个。    

### 继承
现在扩充一下父类Person，使其具有以下属性和方法：
``` js
function Person(name) {
  this.name = name || "noName";
  this.sleep = function () {
    console.log(this.name + "好想睡觉");
  };
}
Person.prototype.eat = function (food) {
  console.log(this.name + "想吃" + food);
};
```    

#### 1) 原型链继承
``` js
// 原型链继承
function Man(){}
Man.prototype = new Person();
let man = new Man();
```
- 优点：
	- 这样将父类的示例作为子类的原型，容易实现。
	- 父类后续新增的属性或方法，子类中都可以访问。
	- 操作子类即可修改原型中的属性。
- 缺点：
	- 要新增原型中属性或方法，必须要先new一个实例。
	- 无法多继承
	- 创建子类实例时，无法向父类构造函数传参    

#### 2) 构造函数继承
``` js
// 构造函数继承
function Man(name) {
  Person.call(this, name);
  this.name = name || "No Name";
}
let man = new Man("jack");
```
- 优点：
	- 解决了原型链继承中不可传递参数的缺点。
	- 子类可以继承多个父类，使用多个call或apply之类的
- 缺点：
	- 这里的man是Man的实例，但不是Person的实例
	- 父类Person原型中的属性和方法(eat)无法被继承。
	- 子类实例man虽然可以继承父类Person的属性和方法，但是父类Person中的函数无法被复用，如上代码中的sleep()    

#### 3) 实例继承
``` js
// 实例继承
function Woman(name) {
  let instance = new Person();
  instance.name = name || "no name";
  return instance;
}
var women = new Woman();
```
- 优点：
	- 不限制调用方式，无论是new Woman()还是Woman()都可以实现继承
	- 子类可以继承多个父类，使用多个call或apply之类的
- 缺点：
	- woman是Person的实例，而不是Woman的实例
	- 不支持多继承
    
#### 4) 组合继承
``` js
//组合继承
function Man(name) {
  Person.call(this, name);
  this.name = name || "no name";
}
// 将整个原型链规整
Man.prototype = new Person();
Man.prototype.constructor = Man;
let man = new Man();
```
- 优点：
	- man实例既能获取Man的属性和方法，也能获取到Person的原型对象的属性和方法(eat)
    - man即是子类Man的实例，也是父类Person的实例
    - 弥补了单纯的构造继承的缺点，可以向父类Person传值
    - 可以复用所有对象的函数
- 缺点：
	- 调用了两次父类构造函数，生成了两份实例，多了一些些内存消耗。    

#### 5) 寄生组合继承
``` js
//寄生组合继承
function Woman(name) {
  Person.call(this, name);
  this.name = name || "No Name";
}
(function () {
  // Super无实例方法，避免了上一种继承方式的创建两次实例
  var Super = function () {};
  Super.prototype = Person.prototype;
  Woman.prototype = new Super();
});
Woman.prototype.constructor = Woman;

let woman = new Woman();
```
- 优点：
	- 在组合继承方式优点上，解决了创建两次实例的问题
- 缺点：
	- 实现复杂    

#### 6) ES6 Class继承
Class 作为构造函数的语法糖，同时有 prototype 属性和__proto__ 属性，因此同时存在两条继承链。

> 子类的__proto__ 属性，表示构造函数的继承，总是指向父类。     
> 子类prototype属性的__proto__ 属性，表示方法的继承，总是指向父类的prototype属性。    

``` js
// Class 继承
class A {}
class B extends A {}

B.__proto__ === A; // true
B.prototype.__proto__ === A.prototype; // true
```
再看：
``` js
//继承
class A extends Object {}
A.__proto__ === Object; // true
A.prototype.__proto__ === Object.prototype; // true

//非继承
class A {}
A.__proto__ === Function.prototype; // true
A.prototype.__proto__ === Object.prototype; // true
A.prototype.__proto__ === Function.prototype; // false
```    

### ES5继承与ES6继承的区别    
---
> ES5：先创建子类的实例对象 this，再将父类的属性/方法添加上去 Parent.call(this)       
> ES6：先创建父类实例 this，再用子类的构造函数修改 this    

ES5 的继承，实质是先创造子类的实例对象 this，然后再将父类的方法添加到this上面（Parent.apply(this)）。    
ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到 this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。    
class 的职责是充当创建 object 的模板， 通常来说，data 数据是由 instance 承载，而  methods 行为/方法则在 class 里。   

> 也就是说，基于 class 的继承，继承的是行为和结构，但没有继承数据。而基于 prototype 的继承，可以继承数据、结构和行为三者。
``` js
// 特殊 如果子类没有定义constructor方法，这个方法会被默认添加，
class ColorPoint extends Point {
}

// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}
```    

### new 浅析    
----
#### 1) 做了什么？拆解：    
> 1. 开辟内存空间，创建一个新对象储存；    
> 2. 将构造函数推入执行栈，作用域this给到（指向）新对象；    
> 3. 执行构造函数中的代码（此时执行代码都在为新对象添加属性、方法）；    
> 4. 返回这个新对象    

#### 2) 实现new方法    
- 调用需求：createInstance(Person, {name: 'Tom', age:20})；    
- 实现思路：    
	- 创建一个空对象    
    - 从参数中删除第一个元素并返回，第一个参数(就是构造函数)，剩下就是参数    
    - 链接到原型    
    - 调用构造函数，把this绑定到新对象上    
    - 返回构造函数调用的结果，或者新对象    

- 代码实现一：    
``` js
function createInstance() {
    let obj = {}
    let constructor = [].shift.call(arguments)
    obj.__proto__ = constructor.prototype
    let result = constructor.apply(obj, arguments)
    return typeof result === 'object' ? result : obj
}
```    

- 代码实现二：    
``` js
const createInstance = (Constructor, ...args) => {
  let instance = Object.create(Constructor.prototype);
  Constructor.call(instance, ...args);
  return instance;
};
function User(firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
}
```

### 小结    
----
一开始的结构序幕拉得太大了，导致这篇慢慢倒腾下来，居然篇幅这么长，后面有时间看看是否需要调整一下内容板块，拆成两篇异或重新整合，暂时就这样了，虽然整体长一些，但结构还算清晰！    

> 为了方便阅读理解，本系列代码已经上传 [Github](https://github.com/SandySY/javaScript)  [掘金](https://juejin.cn/user/3421335916911527)       
文中如有错误，欢迎在评论区指正，如果有所帮助，欢迎点赞和关注！    


