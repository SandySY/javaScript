# JavaScript This （ Context ） 之 完全拿下

![image](https://github.com/SandySY/javaScript/this-context/js-this.png)
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1126d245d794879b9a496b0a2334315~tplv-k3u1fbpfcp-watermark.image)

> 如何正确判断 this？  
> 普通函数的 this 如何改变？（哪些工具函数如何工作？）  
> 严格模式的 this 有什么区别  
> 箭头函数的 this 是什么？

鉴于 this 风骚的运作方式，各大厂面试和基础书籍阅读中，对 this 的理解是永不过时的话题，这块骨头既然这么难啃干净，那就干脆将其大卸八块，高压锅一压，营养一锅端；话不多说，这就完全拿下的。

## 1 描述概念

> this is all about context.

this 说白了就是找老大，找拥有当前上下文（context）的对象（context object）。大致可以分为八层（也可以是六层，还有说是四层，都对都没问题），层数越高权力越大，this 只会认最大的。

> 八层： 箭头函数>new>bind>call|apply>forEach>setTimeout(foo,100)>obj.foo()>foo()  
> 六层： 箭头函数>new>bind>call|apply>obj.foo()>foo()  
> 四层： new>bind>obj.foo()>foo()

## 2 点兵点将

咱们直接整最详细的，准备一个函数 foo，首行代码控制严格模式开关，就像这样：

```js
"use strict";
var that;
function foo(params) {
  that = this;
  console.log("this是：", this);
}
```

### 2.1 直接调用

```js
// 1-直接调用 window || undefined (严格模式)
foo();
```

这是一个兜底的存在，在普通情况下 this 就是全局，浏览器里就是 window；在 use strict 的情况下就是 undefined。

### 2.2 对象调用

如果用到 this 的那个函数是属于某个 context object 的，那么这个 context object 绑定到 this。比如下面的例子：

```js
//2-挂载在对象上，然后执行 -> 对象
let arr = [1, 2, 3];
arr.fn = foo;
arr.fn();
```

### 2.3 定时器调用

这个玩儿法还有很多类似的，比如用户点击 IO，宏任务响应等。

```js
//3-定时器--window
setTimeout(foo, 100);
```

对，这里始终是 window，因为是任务队列里面的，当被线程推到执行调用栈，此时的调用环境就是 window

### 2.4 工具函数（forEach）

```js
[(1, 2, 3)].forEach(function (item) {
  console.warn(this, item);
}); //window || undefined 3
[1, 2, 3].forEach(function (item) {
  console.warn(this, item);
}); //window || undefined 1-3
```

可以看到 forEach 这样的遍历函数，其 this 和第一种直接一样，根据是否是严格模式反馈兜底的结果，至于为什么不是前面的对象调用，仔细想想，不难发现原因是吧。

### 2.5 工具函数（call|apply）

Object.prototype.call 和 Object.prototype.apply，它们可以通过参数指定 this,具体用法和差异在此就不赘述，有需要可以上 MDN。

```js
foo.call(12); // 12
foo.call(Date()); // ... (中国标准时间)
foo.call("ajflk"); // ajflk
foo.apply(/dfjlk/); // /dfjlk/
//注意this是不可以直接赋值的哦，this = 2会报ReferenceError。
```

### 2.6 工具函数（bind）

Object.prototype.bind，它不但通过一个新函数来提供永久的绑定，还会覆盖以上工具函数的命令。

```js
let _obj = { name: "demo" };
let foo2 = foo.bind(_obj);
foo2(); // {name: "demo"}
foo2.call(_obj2); // {name: "demo"}
```

### 2.7 new 当成构造函数使用

这是一个比较容易忽略的绑定 this 的地方。当我们 new 一个函数时，就会自动把 this 绑定在新对象上，然后再调用这个函数。它会覆盖 bind 的绑定。

```js
let _obj = { name: "demo" };
new foo(); // foo {}
let foo2 = foo.bind(_obj);
foo2(); // {name: "demo"}
new foo2(); // foo {}
```

### 2.8 箭头函数

ES2015 的箭头函数很酷，几乎所有前端开发人员都爱不释手。其原因就是在箭头函数里，this 不再妖艳，被永远封印到当前词法作用域之中，称作 Lexical this ，在代码运行前就可以确定。没有其他途径可以覆盖。  
这样的好处就是方便让回调函数的 this 使用当前的作用域，不怕引起混淆。所以对于箭头函数，只要看它在哪里创建的就行。如果对[词法作用域](https://juejin.cn/post/6917150828633686030)感兴趣可以看看[这里](https://github.com/SandySY/javaScript/lexical-scope)。

```js
let fun = () => console.log("fun this is", this);
fun(); // fun this is window
// new fun(); 		// TypeError
var obj1 = {
  name: "obj1",
  funThis() {
    var func = () => console.log("funThis this is", this);
    return func();
  },
};
fun.call(obj1); // fun this is window
var funBind = fun.bind(obj1);
funBind(); // fun this is window
obj1.funThis(); // funThis this is obj1
var obj2 = {
  name: "obj2",
  funThis: obj1.funThis,
};
obj2.funThis(); // funThis this is obj2
```

箭头函数的核心就是一句话：“对于箭头函数，只要看它在哪里创建”。

## 3 总结

啃骨头就得啃干净，this 这么看来就简单了，但是简单的东西有那么多文章来描述它定义它，那其实也就不见得是多简单，所以，咱们还是平常心。

> 认真揣摩，多看（书籍，mdn 等）多练（coding | test）。  
> 谁也不笨，谁也不见得多聪明，始终坚信，保持每天进步一点点，这就够了！

为了方便阅读理解，本文代码已经上传[Github](https://github.com/SandySY/javaScript)
[掘金社区](https://juejin.cn/post/6918927493046992910)  
文中如有错误，欢迎在评论区指正，如果有所帮助，欢迎点赞和关注
