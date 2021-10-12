// -----原型链继承
function fatherFn(){
  this.some = '父类的this属性/方法'
}
fatherFn.prototype.fatherFnSome = '父类原型对象的属性或者方法'

//子类
function sonFn(){
  this.obkoro1 = '子类的this属性/方法'
}

//核心步骤 重写子类的原型对象
sonFn.prototype = new fatherFn();
sonFn.prototype.sonFnSome = '子类原型对象的属性或者方法'

//实例化子类
const sonFnInstance = new sonFn();
console.log('子类的实例', sonFnInstance, sonFnInstance.__proto__, fatherFn.prototype)

/* 
  原型链继承获取父类的属性和方法
  1. fatherFn 通过this声明的属性/方法都会绑定在new期间创建的新对象上.
  2. 新对象的原型是 sonFn.prototype, 通过原型链的属性查找到 fatherFn.prototype 的属性和方法 
    sonFnInstance.__proto__ === sonFn.prototype; 
    sonFn.prototype.__proto__ === fatherFn.prototype

*/



// function Person(name) {
//   this.name = name || "noName";
//   this.sleep = function () {
//     console.log(this.name + "好想睡觉");
//   };
// }
// Person.prototype.eat = function (food) {
//   console.log(this.name + "想吃" + food);
// };

// //1) 原型链继承
// function Woman() {}
// Woman.prototype = new Person();
// let woman = new Woman();
// console.log(woman);