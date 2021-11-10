#优雅的逻辑判断

---
theme: smartblue
---
## 序言
我们编写js代码时经常遇到复杂逻辑判断的情况，通常大家可以用if/else或者switch来实现多个条件判断，但这样会有个问题，随着逻辑复杂度的增加，代码中的if/else/switch会变得越来越臃肿，越来越看不懂，那么如何更优雅的写判断逻辑，本文带你试一下。

## 常见业务场景
> - 根据不同订单状态, 请求数据/响应逻辑/...
> - 根据不同账号状态, 跳转页面, 控制权限菜单...
> - 根据不同活动状态，发送日志埋点...
        
举例:        
```js
/**
 * 按钮点击事件
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 商品售罄 4 开团成功 5 系统取消
 */
const onButtonClick = (status)=>{
  if(status == 1){
    sendLog('processing')
    jumpTo('IndexPage')
  }else if(status == 2){
    sendLog('fail')
    jumpTo('FailPage')
  }else if(status == 3){
    sendLog('fail')
    jumpTo('FailPage')
  }else if(status == 4){
    sendLog('success')
    jumpTo('SuccessPage')
  }else if(status == 5){
    sendLog('cancel')
    jumpTo('CancelPage')
  }else {
    sendLog('other')
    jumpTo('Index')
  }
}
```
通过代码可以看到这个按钮的点击逻辑：根据不同活动状态做两件事情，发送日志埋点和跳转到对应页面，大家可以很轻易的提出这段代码的改写方案, 接着往下看属于什么段位(玩笑~).
        
### switch出场(白银)：
```js
/**
 * 按钮点击事件
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 商品售罄 4 开团成功 5 系统取消
 */
const onButtonClick = (status)=>{
  switch (status){
    case 1:
      sendLog('processing')
      jumpTo('IndexPage')
      break
    case 2:
    case 3:
      sendLog('fail')
      jumpTo('FailPage')
      break  
    case 4:
      sendLog('success')
      jumpTo('SuccessPage')
      break
    case 5:
      sendLog('cancel')
      jumpTo('CancelPage')
      break
    default:
      sendLog('other')
      jumpTo('Index')
      break
  }
}
```
嗯，这样看起来比if/else清晰多了，细心的同学也发现了小技巧，case 2和case 3逻辑一样的时候，可以省去执行语句和break，则case 2的情况自动执行case 3的逻辑。
            
### 对象技巧(黄金)
```js
const actions = {
  '1': ['processing','IndexPage'],
  '2': ['fail','FailPage'],
  '3': ['fail','FailPage'],
  '4': ['success','SuccessPage'],
  '5': ['cancel','CancelPage'],
  'default': ['other','Index'],
}
/**
 * 按钮点击事件
 * @param {number} status 活动状态：1开团进行中 2开团失败 3 商品售罄 4 开团成功 5 系统取消
 */
const onButtonClick = (status)=>{
  let action = actions[status] || actions['default'],
      logName = action[0],
      pageName = action[1]
  sendLog(logName)
  jumpTo(pageName)
}
```
很明显这是一种更简单的写法,上面代码确实看起来更清爽了，该方法的聪明之处在于：将判断条件作为对象的属性名，将处理逻辑作为对象的属性值，在按钮点击的时候，通过对象属性查找的方式来进行逻辑判断，这种写法特别适合一元条件判断的情况。
            
### Map巧用(铂金)
```js
const actions = new Map([
  [1, ['processing','IndexPage']],
  [2, ['fail','FailPage']],
  [3, ['fail','FailPage']],
  [4, ['success','SuccessPage']],
  [5, ['cancel','CancelPage']],
  ['default', ['other','Index']]
])
/**
 * 按钮点击事件
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 商品售罄 4 开团成功 5 系统取消
 */
const onButtonClick = (status)=>{
  let action = actions.get(status) || actions.get('default')
  sendLog(action[0])
  jumpTo(action[1])
}
```
> 这样写用到了es6里的Map对象，是不是更爽了？Map对象和Object对象有什么区别呢？
        
优势点:
- 一个对象通常都有自己的原型，所以一个对象总有一个"prototype"键。
- 一个对象的键只能是字符串或者Symbols，但一个Map的键可以是任意值。
- 你可以通过size属性很容易地得到一个Map的键值对个数，而对象的键值对个数只能手动确认。

-------
## 行在路上, 难度升级
> 我们把问题升级一下，以前按钮点击时候只需要判断status，现在还需要判断用户的身份

别急, 继续打怪升级, 至少已经铂金了(玩笑)  

-------
### 简单编码进行逻辑描述

```js
/**
 * 按钮点击事件
 * @param {number} status 活动状态：1开团进行中 2开团失败 3 开团成功 4 商品售罄 5 有库存未开团
 * @param {string} identity 身份标识：guest客态 master主态
 */
const onButtonClick = (status,identity)=>{
  if(identity == 'guest'){
    if(status == 1){
      //do sth
    }else if(status == 2){
      //do sth
    }else if(status == 3){
      //do sth
    }else if(status == 4){
      //do sth
    }else if(status == 5){
      //do sth
    }else {
      //do sth
    }
  }else if(identity == 'master') {
    if(status == 1){
      //do sth
    }else if(status == 2){
      //do sth
    }else if(status == 3){
      //do sth
    }else if(status == 4){
      //do sth
    }else if(status == 5){
      //do sth
    }else {
      //do sth
    }
  }
}
```
原谅我不写每个判断里的具体逻辑了，因为代码太冗长了。

原谅我又用了if/else，因为我看到很多人依然在用if/else写这种大段的逻辑判断。

> 从上面的例子我们可以看到，当你的逻辑升级为二元判断时，你的判断量会加倍，你的代码量也会加倍，这时怎么写更具艺术性呢？

### Map + 字符串 (钻石)
```js
const actions = new Map([
  ['guest_1', ()=>{/*do sth*/}],
  ['guest_2', ()=>{/*do sth*/}],
  ['guest_3', ()=>{/*do sth*/}],
  ['guest_4', ()=>{/*do sth*/}],
  ['guest_5', ()=>{/*do sth*/}],
  ['master_1', ()=>{/*do sth*/}],
  ['master_2', ()=>{/*do sth*/}],
  ['master_3', ()=>{/*do sth*/}],
  ['master_4', ()=>{/*do sth*/}],
  ['master_5', ()=>{/*do sth*/}],
  ['default', ()=>{/*do sth*/}],
])

/**
 * 按钮点击事件
 * @param {string} identity 身份标识：guest客态 master主态
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 开团成功 4 商品售罄 5 有库存未开团
 */
const onButtonClick = (identity,status)=>{
  let action = actions.get(`${identity}_${status}`) || actions.get('default')
  action.call(this)
}
```
上述代码核心逻辑是：把两个条件拼接成字符串，并通过以条件拼接字符串作为键，以处理函数作为值的Map对象进行查找并执行，这种写法在多元条件判断时候尤其好用。
### Object + 字符串 (钻石)
```js
const actions = {
  'guest_1':()=>{/*do sth*/},
  'guest_2':()=>{/*do sth*/},
  //....
}

const onButtonClick = (identity,status)=>{
  let action = actions[`${identity}_${status}`] || actions['default']
  action.call(this)
}

```
是不是又高级了一点点？

> 这里也看出来Map与Object的区别，Map可以用任何类型的数据作为key。

-------        
## 行在路上, 难度再升级一点点
> 我们现在再将难度升级一点点，假如guest情况下，status1-4的处理逻辑都一样怎么办?

老码手, 恭喜已经钻石了, 继续打怪升级(玩笑)  

-------

### 用钻石组的艺术描述一下可能的较差情形
```js
const actions = new Map([
  [{identity:'guest',status:1},()=>{/* functionA */}],
  [{identity:'guest',status:2},()=>{/* functionA */}],
  [{identity:'guest',status:3},()=>{/* functionA */}],
  [{identity:'guest',status:4},()=>{/* functionA */}],
  [{identity:'guest',status:5},()=>{/* functionB */}],
  //...
])
```
好一点的写法是将处理逻辑函数进行缓存, 我们稍微优化一下:
```js
const actions = ()=>{
  const functionA = ()=>{/*do sth*/}
  const functionB = ()=>{/*do sth*/}
  return new Map([
    [{identity:'guest',status:1},functionA],
    [{identity:'guest',status:2},functionA],
    [{identity:'guest',status:3},functionA],
    [{identity:'guest',status:4},functionA],
    [{identity:'guest',status:5},functionB],
    //...
  ])
}

const onButtonClick = (identity,status)=>{
  let action = [...actions()].filter(([key,value])=>(key.identity == identity && key.status == status))
  action.forEach(([key,value])=>value.call(this))
}
```
这样写已经能满足日常需求了，但认真一点讲，上面重写了4次functionA还是有点不爽，假如判断条件变得特别复杂，比如identity有3种状态，status有10种状态，那你需要定义30条处理逻辑，而往往这些逻辑里面很多都是相同的，这似乎也是认真的程序员不想接受的
### Map + RegExp (王者)
```js
const actions = ()=>{
  const functionA = ()=>{/*do sth*/}
  const functionB = ()=>{/*do sth*/}
  return new Map([
    [/^guest_[1-4]$/,functionA],
    [/^guest_5$/,functionB],
    //...
  ])
}

const onButtonClick = (identity,status)=>{
  let action = [...actions()].filter(([key,value])=>(key.test(`${identity}_${status}`)))
  action.forEach(([key,value])=>value.call(this))
}
```
这里Map的优势更加凸显，可以用正则类型作为key了，这样就有了无限可能，假如需求变成，凡是guest情况都要发送一个日志埋点，不同status情况也需要单独的逻辑处理，那我们可以这样写:
```js
const actions = ()=>{
  const functionA = ()=>{/*do sth*/}
  const functionB = ()=>{/*do sth*/}
  const functionC = ()=>{/*send log*/}
  return new Map([
    [/^guest_[1-4]$/,functionA],
    [/^guest_5$/,functionB],
    [/^guest_.*$/,functionC],
    //...
  ])
}

const onButtonClick = (identity,status)=>{
  let action = [...actions()].filter(([key,value])=>(key.test(`${identity}_${status}`)))
  action.forEach(([key,value])=>value.call(this))
}
```
利用数组循环的特性，符合正则条件的逻辑都会被执行，那就可以同时执行公共逻辑和单独逻辑，因为正则的存在，大家可以打开想象力解锁更多的玩法。

## 总结
至此, 我们探讨了8种逻辑判断写法，包括：
- if/else
- switch
- 一元判断时：存到Object里
- 一元判断时：存到Map里
- 多元判断时：将condition拼接成字符串存到Object里
- 多元判断时：将condition拼接成字符串存到Map里
- 多元判断时：将condition存为Object存到Map里
- 多元判断时：将condition写作正则存到Map里
应该有那么一点艺术味儿了，愿各位码手 未来的人生里，不只是有if/else/switch。
> 说明:
> 1. 大量借用游戏等级, 只为玩味地探索逻辑和艺术, 就当开个玩笑, 不当真
> 2. 为什么没有最强王者? 段位不够呢,这个留给大家去补充吧...
        
参考文章：

- JavaScript 复杂判断的更优雅写法

## 想法初衷

---

抽时间梳理一下符合前端工程师成长路线的知识脉络，尽可能给行业多共享一些经验总结，同时也能系统回顾和巩固自身。

> 为了方便阅读理解，本文代码已经上传[Github](https://github.com/SandySY/vue-notes)

文中如有错误，欢迎在评论区指正，如果有所帮助，欢迎点赞和关注