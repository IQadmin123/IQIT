_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[24],{"/o8v":function(e,t,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/portfolio-details",function(){return c("xZTC")}])},CViU:function(e,t,c){"use strict";var s=c("nKUr");c("q1tI");t.a=function(e){var t=e.data,c=t.image,n=t.title,r=t.categories,i=t.url;return Object(s.jsxs)("div",{className:"singlefolio",children:[Object(s.jsx)("img",{src:c,alt:n}),Object(s.jsxs)("div",{className:"folioHover",children:[Object(s.jsx)("a",{className:"cate",href:"#",children:r.map((function(e){return e+", "}))}),Object(s.jsx)("h4",{children:Object(s.jsx)("a",{href:i,children:n})})]})]})}},LvMP:function(e,t,c){"use strict";var s=c("nKUr"),n=c("q1tI"),r=c("KSab"),i=c("7vrA"),a=c("3Z9Z"),l=c("JI6e"),j=c("A8kL"),o=c("5fB9"),d=c("YFqc"),b=c.n(d);t.a=function(){var e=Object(n.useState)(!1),t=e[0],c=e[1],d=Object(n.useContext)(j.a),h=d.searchStatus,O=d.updateSearchStatus,m=Object(n.useContext)(o.a),u=m.menuStatus,x=m.updateMenuStatus,f=function(){window.scrollY>70?c(!0):window.scrollY<70&&c(!1)};return Object(n.useEffect)((function(){return window.addEventListener("scroll",f),function(){window.removeEventListener("scroll",f)}}),[t]),Object(s.jsx)("header",{className:"header_01 ".concat(!0===t?"fixedHeader animated flipInX":null),id:"header",children:Object(s.jsx)(i.a,{fluid:!0,children:Object(s.jsxs)(a.a,{className:"justify-content-between",children:[Object(s.jsx)(l.a,{className:"col-6",lg:2,md:3,sm:3,children:Object(s.jsx)("div",{className:"logo",children:Object(s.jsx)(b.a,{href:"/",children:Object(s.jsx)("a",{children:Object(s.jsx)("img",{src:r.p.light,alt:""})})})})}),Object(s.jsx)(l.a,{lg:8,sm:8,md:7,className:"d-none d-lg-block ",children:Object(s.jsx)("nav",{className:"mainmenu text-center",children:Object(s.jsx)("ul",{children:r.q.map((function(e,t){return Object(s.jsxs)("li",{className:"".concat(void 0!==e.subItems?"menu-item-has-children":""),children:[Object(s.jsx)(b.a,{href:e.url,children:Object(s.jsx)("a",{children:e.name})}),void 0!==e.subItems?Object(s.jsx)("ul",{className:"sub-menu",children:e.subItems.map((function(e,t){return Object(s.jsx)("li",{children:Object(s.jsx)(b.a,{href:e.url,children:Object(s.jsx)("a",{children:e.name})})},t)}))}):null]},t)}))})})}),Object(s.jsx)(l.a,{lg:2,md:2,sm:4,className:"col-6",children:Object(s.jsxs)("div",{className:"navigator text-right",children:[Object(s.jsx)("a",{className:"search searchToggler",href:"#",onClick:function(e){e.preventDefault(),O(!h)},children:Object(s.jsx)("i",{className:"mei-magnifying-glass"})}),Object(s.jsx)("a",{href:"#",className:"menu mobilemenu d-none d-md-none d-lg-none",children:Object(s.jsx)("i",{className:"mei-menu"})}),Object(s.jsx)("a",{id:"open-overlay-nav",className:"menu hamburger",onClick:function(e){e.preventDefault(),x(!u)},href:"#",children:Object(s.jsx)("i",{className:"mei-menu"})})]})})]})})})}},TgFl:function(e,t,c){"use strict";var s=c("nKUr");c("q1tI");t.a=function(e){var t=e.title,c=e.name;return Object(s.jsx)("section",{className:"pageBanner",children:Object(s.jsx)("div",{className:"container",children:Object(s.jsx)("div",{className:"row",children:Object(s.jsx)("div",{className:"col-lg-12",children:Object(s.jsxs)("div",{className:"banner_content text-center",children:[Object(s.jsxs)("h4",{children:[Object(s.jsx)("a",{href:"/",children:"home"})," - ",c]}),Object(s.jsx)("h2",{children:t})]})})})})})}},xZTC:function(e,t,c){"use strict";c.r(t);var s=c("nKUr"),n=(c("q1tI"),c("aIN1")),r=c("CafY"),i=c("TgFl"),a=c("7vrA"),l=c("3Z9Z"),j=c("JI6e"),o=c("KSab"),d=function(){var e=o.t.gallery,t=o.t.title,c=o.t.text,n=o.t.client,r=o.t.categories,i=o.t.date,d=o.t.socials;return Object(s.jsx)("section",{className:"commonSection porfolioDetail",children:Object(s.jsx)(a.a,{children:Object(s.jsxs)(l.a,{children:[Object(s.jsx)(j.a,{lg:8,md:7,sm:12,children:e.map((function(e,t){var c=e.image;return Object(s.jsx)("div",{className:"portDetailThumb",children:Object(s.jsx)("img",{alt:"portDetailThumb",src:c})},t)}))}),Object(s.jsxs)(j.a,{lg:4,md:5,sm:12,children:[Object(s.jsxs)("div",{className:"singlePortfoio_content",children:[Object(s.jsx)("h3",{children:t}),Object(s.jsx)("p",{children:c})]}),Object(s.jsxs)("div",{className:"singlePortfoio_content",children:[Object(s.jsx)("h4",{children:"Clients:"}),Object(s.jsx)("p",{children:n})]}),Object(s.jsxs)("div",{className:"singlePortfoio_content",children:[Object(s.jsx)("h4",{children:"Category:"}),Object(s.jsx)("p",{children:r.map((function(e,t){var c=e.name,n=e.url;return Object(s.jsxs)("a",{href:n,children:[c,","]},t)}))})]}),Object(s.jsxs)("div",{className:"singlePortfoio_content",children:[Object(s.jsx)("h4",{children:"Date:"}),Object(s.jsx)("p",{children:i})]}),Object(s.jsxs)("div",{className:"singlePortfoio_content",children:[Object(s.jsx)("h4",{children:"Follow:"}),Object(s.jsx)("ul",{children:d.map((function(e,t){var c=e.name,n=e.url;return Object(s.jsx)("li",{children:Object(s.jsx)("a",{href:n,children:c})},t)}))})]})]})]})})})},b=c("rePB"),h=c("CViU"),O=c("xqva"),m=c("Ndxo");c("4l1m");function u(e,t){var c=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),c.push.apply(c,s)}return c}function x(e){for(var t=1;t<arguments.length;t++){var c=null!=arguments[t]?arguments[t]:{};t%2?u(Object(c),!0).forEach((function(t){Object(b.a)(e,t,c[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(c)):u(Object(c)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(c,t))}))}return e}var f=function(){return Object(s.jsx)("section",{className:"commonSection relatedPortfolio",children:Object(s.jsxs)("div",{className:"container",children:[Object(s.jsx)("div",{className:"row",children:Object(s.jsxs)("div",{className:"col-lg-12 text-center",children:[Object(s.jsx)("h4",{className:"sub_title",children:"our portfolio"}),Object(s.jsx)("h2",{className:"sec_title",children:"related work"}),Object(s.jsxs)("p",{className:"sec_desc",children:["We are committed to providing our customers with exceptional service while",Object(s.jsx)("br",{})," offering our employees the best training."]})]})}),Object(s.jsx)("div",{className:"row",children:Object(s.jsx)("div",{className:"col-lg-12",children:Object(s.jsx)(O.a,x(x({className:"related_slider"},{spaceBetween:0,slidesPerView:1,breakpoints:{0:{spaceBetween:0,slidesPerView:1},576:{spaceBetween:30,slidesPerView:2},992:{spaceBetween:30,slidesPerView:3}}}),{},{children:o.s.map((function(e,t){return Object(s.jsx)(m.a,{children:Object(s.jsx)(h.a,{data:e})},t)}))}))})})]})})},v=c("5fB9"),p=c("A8kL"),g=c("LvMP");t.default=function(){return Object(s.jsx)(v.b,{children:Object(s.jsx)(p.b,{children:Object(s.jsxs)(r.a,{PageTitle:"Portfolio Details Page",children:[Object(s.jsx)(g.a,{}),Object(s.jsx)(i.a,{title:"Portfolio Details",name:"Portfolio"}),Object(s.jsx)(d,{}),Object(s.jsx)(f,{}),Object(s.jsx)(n.a,{})]})})})}}},[["/o8v",0,2,1,3,4]]]);