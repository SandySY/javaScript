// function Person(name) {
//   this.name = name;
// }
// Person.prototype.age = 18;
// var person = new Person();
// console.dir(person);
// console.log(typeof person, typeof Person, typeof Person.prototype);
// console.log(person.__proto__.__proto__);

function Person(name) {
  this.name = name || "noName";
  this.sleep = function () {
    console.log(this.name + "好想睡觉");
  };
}
Person.prototype.eat = function (food) {
  console.log(this.name + "想吃" + food);
};

//1) 原型链继承
function Woman() {}
Woman.prototype = new Person();
let woman = new Woman();

//2) 构造函数继承
function Man(name) {
  Person.call(this, name);
  this.name = name || "No Name";
}
let man = new Man("jack");

//3) 实例继承
function Woman(name) {
  let instance = new Person();
  instance.name = name || "no name";
  return instance;
}
var women = new Woman();

//4)组合继承
function Man(name) {
  Person.call(this, name);
  this.name = name || "no name";
}

// 将整个原型链更改
Man.prototype = new Person();
Man.prototype.constructor = Man;
let man = new Man();

//5)寄生组合继承
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

// 6) Class 继承
class A {}
class B extends A {}

B.__proto__ === A; // true
B.prototype.__proto__ === A.prototype; // true

//继承
class A extends Object {}

A.__proto__ === Object; // true
A.prototype.__proto__ === Object.prototype; // true

//非继承
class A {}

A.__proto__ === Function.prototype; // true
A.prototype.__proto__ === Object.prototype; // true
A.prototype.__proto__ === Function.prototype; // false

// 7) Class 如果子类没有定义constructor方法，这个方法会被默认添加，
class ColorPoint extends Point {}

// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}

// 实现new方法
//createInstance(Person, {name: 'Tom', age:20})
function createInstance() {
  let obj = {};
  let constructor = [].shift.call(arguments);
  // let [constructor,...args] = [...arguments]

  obj.__proto__ = constructor.prototype;
  let result = constructor.apply(obj, arguments);

  return typeof result === "object" ? result : obj;
}

const createInstance = (Constructor, ...args) => {
  let instance = Object.create(Constructor.prototype);
  Constructor.call(instance, ...args);
  return instance;
};
function User(firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
}
