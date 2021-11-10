# 被低估的三大框架

当我们想到基于 JavaScript 的框架时，马上就会想到一些名字：Angular，React 和 Vue 等。

如果在搜索引擎上搜索与 JavaScript 相关的内容，这些框架的名字很可能会出现在你的视野中，因为他们已经建立并拥有自己庞大的社区。但是今天不讨论那些框架。在本文中，我将介绍三个被低估的 JavaScript 框架及其功能, 在一些特殊项目的应用场景中, 往往能够带来意想不到的便利。

## **1. Svelte**

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6e1b7d5abaf4ef5bc0abee11070ad8b~tplv-k3u1fbpfcp-zoom-1.image)

Svelte 是一种全新的构建用户界面的方法。传统框架如 React 和 Vue 在浏览器中需要做大量的工作，而 Svelte 将这些工作放到构建应用程序的编译阶段来处理。

与使用虚拟（virtual）DOM 差异对比不同。Svelte 编写的代码在应用程序的状态更改时就能像做外科手术一样更新 DOM。

> Svelte 组件构建在 HTML 之上。然后只需添加数据即可。

```
<script>  let name = 'world';</script>
<h1>Hello {name}!</h1>
```


## **2. Ember**

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c40e00106ce142b4af9e2cc05c768d93~tplv-k3u1fbpfcp-zoom-1.image)

Ember 是另一个重要的 JavaScript 框架，最初发布于 2011 年，用于开发 Web 应用程序并使用 MVC（模型 - 视图 - 控制器）架构模式。


```
<script type="text/x-handlebars">  <h1>Hello {{App.name}}!</h1></script>

<script type="text/javascript">  App = Ember.Application.create();
  App.name= 'world';</script>
```


## **3. Preact**

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1843ead4973547fb878e413701699d5d~tplv-k3u1fbpfcp-zoom-1.image)

React 的轻量级替代方案，体积仅有 3kB，并且拥有与 React 相同的 API。

```
<script type="module">  import { h, Component, render } from 'https://unpkg.com/preact?module';
  const app = h('h1', null, 'Hello World!');
  render(app, document.body);</script>
```


---

抽时间梳理一下符合前端工程师成长路线的知识脉络，尽可能给行业多共享一些经验总结，同时也能系统回顾和巩固自身。

> 本文代码已经上传[Github](https://github.com/SandySY/javaScript)

文中如有错误，欢迎在评论区指正，如果有所帮助，欢迎点赞和关注