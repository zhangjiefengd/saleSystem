webpackJsonp([15],{nH2Y:function(t,e){},zHLG:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("iIyZ"),s={name:"develop",data:function(){return{background:"",worlds:"",number:0,num:0,backBig:"",head:n.a+":80/"}},created:function(){var t=this;this.$axios.get("/brand/enterpriseDevelop/get").then(function(e){e.data.data&&(t.num=e.data.data.length,t.worlds=e.data.data,t.worlds.map(function(e,a){e.enterpriseDevelopImageLocation&&(t.worlds[a].image=t.getImage(e.enterpriseDevelopImageLocation,1))}))}).catch(function(t){console.log(t)}),this.$axios.get("/brand/enterpriseDevelop/backgroundImage/get").then(function(e){e.data.data&&(t.background=t.getImage(e.data.data.imageLocation,1),screen.width>1024?t.backBig=t.getImage(e.data.data.imageLocation,1):t.backBig=t.getImage(e.data.data.imageLocation,2))}).catch(function(t){console.log(t)})},methods:{clickBack:function(){this.$router.push({path:"/index"})},changeAll:function(t){this.number=t},getImage:function(t,e){for(var a=t.split(/\_|\./g),n=e;a.length-1<=n;)n--;return this.head+a[0]+"_"+a[n]+"."+a[a.length-1]}},watch:{backBig:function(){var t=document.querySelector(".honor"),e=this.backBig,a=new Image;a.src=e,a.onload=function(){var a=this;setInterval(function(){a.background=e,document.getElementsByClassName("back")[0].src=a.background,t.setAttribute("class","honor complete")},100)}}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"honor",attrs:{id:"develop"}},[null!==t.background?a("img",{staticClass:"back",attrs:{src:t.background,alt:""}}):t._e(),t._v(" "),null==t.background?a("img",{attrs:{src:"",alt:""}}):t._e(),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content1"},[a("div",{staticClass:"pictureIntro"},t._l(t.worlds,function(e,n){return a("div",{key:n,staticClass:"hide",class:[{show:n==t.number}]},[null!==e.image?a("img",{attrs:{src:e.image,alt:""}}):t._e()])})),t._v(" "),a("div",{staticClass:"worldIntro"},[a("div",[a("div",{staticClass:"worldIntroTop"},t._l(t.worlds,function(e,n){return a("div",{staticClass:"world hide",class:[{show:n==t.number}]},[a("div",{staticClass:"title"},[t._v("\n                  "+t._s(e.step)+" (第 "+t._s(n+1)+" 阶段)\n                ")]),t._v(" "),a("h3",[t._v("\n                  "+t._s(e.developTitle)+"\n                ")]),t._v(" "),a("p",[t._v("\n                  "+t._s(e.enterpriseDevelopInfo)+"\n                ")])])})),t._v(" "),a("ul",{staticClass:"worldIntroBottom"},t._l(t.worlds,function(e,n){return a("li",{class:[{changeStyle:n==t.number}],on:{click:function(e){t.changeAll(n)}}},[t._v("\n                "+t._s(n+1)+"\n              ")])}))])])])])])},staticRenderFns:[]};var i=a("VU/8")(s,o,!1,function(t){a("nH2Y")},"data-v-65ed1917",null);e.default=i.exports}});
//# sourceMappingURL=15.12d87560845f1b8ad98b.js.map