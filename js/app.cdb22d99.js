(function(t){function e(e){for(var a,o,s=e[0],u=e[1],l=e[2],m=0,p=[];m<s.length;m++)o=s[m],i[o]&&p.push(i[o][0]),i[o]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(t[a]=u[a]);c&&c(e);while(p.length)p.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],a=!0,s=1;s<n.length;s++){var u=n[s];0!==i[u]&&(a=!1)}a&&(r.splice(e--,1),t=o(o.s=n[0]))}return t}var a={},i={app:0},r=[];function o(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=a,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)o.d(n,a,function(e){return t[e]}.bind(null,a));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/a-datatable/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var c=u;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"097d":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("097da");var a=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",{attrs:{id:"app"}},[n("h1",{staticClass:"title"},[t._v("Payments")]),n("datatable",{attrs:{"csv-file":"payments-data","column-props":t.columnProps}})],1)},r=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"datatable",attrs:{id:"datatable"}},[n("table",[n("thead",[n("tr",t._l(t.columnsCount-1,function(e){return n("th",{key:e},[n("div",{staticClass:"column-name",class:t.sorting[e],attrs:{id:t.columnProps[e].name+"Column"},on:{click:function(n){t.toggleSorting(e)}}},[t._v("\n            "+t._s(t.columnProps[e].name)+"\n          ")]),n("div",{staticClass:"column-search"},["text"===t.columnProps[e].type?n("input",{attrs:{type:"text",id:t.columnProps[e].name,placeholder:"Search"},on:{input:function(n){t.filterText(e,n.target.value)}}}):t._e(),"amount"===t.columnProps[e].type?n("input",{directives:[{name:"model",rawName:"v-model",value:t.amountFilter.min,expression:"amountFilter.min"}],attrs:{type:"number",placeholder:"0",id:t.columnProps[e].name+"Min"},domProps:{value:t.amountFilter.min},on:{input:[function(e){e.target.composing||t.$set(t.amountFilter,"min",e.target.value)},function(n){t.filterAmount(e)}]}}):t._e(),"amount"===t.columnProps[e].type?n("input",{directives:[{name:"model",rawName:"v-model",value:t.amountFilter.max,expression:"amountFilter.max"}],attrs:{type:"number",placeholder:"1000000",id:t.columnProps[e].name+"Max"},domProps:{value:t.amountFilter.max},on:{input:[function(e){e.target.composing||t.$set(t.amountFilter,"max",e.target.value)},function(n){t.filterAmount(e)}]}}):t._e(),"date"===t.columnProps[e].type?n("input",{directives:[{name:"model",rawName:"v-model",value:t.dateFilter.min,expression:"dateFilter.min"}],attrs:{type:"date",id:t.columnProps[e].name+"Min"},domProps:{value:t.dateFilter.min},on:{change:function(n){t.filterDate(e)},input:function(e){e.target.composing||t.$set(t.dateFilter,"min",e.target.value)}}}):t._e(),"date"===t.columnProps[e].type?n("input",{directives:[{name:"model",rawName:"v-model",value:t.dateFilter.max,expression:"dateFilter.max"}],attrs:{type:"date",id:t.columnProps[e].name+"Max"},domProps:{value:t.dateFilter.max},on:{change:function(n){t.filterDate(e)},input:function(e){e.target.composing||t.$set(t.dateFilter,"max",e.target.value)}}}):t._e()])])}))]),n("tbody",t._l(t.filteredData,function(e,a){return n("tr",{key:e[t.columnProps[0].name]},t._l(t.columnsCount-1,function(i){return n("td",{key:i},[n("div",{staticClass:"cell",class:t.columnProps[i].type},[t.columnProps[i].editable&&t.editing[i][a]?n("span",[n("textarea",{class:t.columnProps[i].type,attrs:{id:t.columnProps[i].name+"-"+a+"-Edit"},domProps:{value:e[t.columnProps[i].name]},on:{input:function(e){t.newValuesBuffer=e.target.value}}}),n("button",{staticClass:"save-button",attrs:{id:t.columnProps[i].name+"-"+a+"-SaveButton"},on:{click:function(e){t.save(a,i),t.$set(t.editing[i],a,!1)}}}),n("button",{staticClass:"cancel-button",attrs:{id:t.columnProps[i].name+"-"+a+"-CancelButton"},on:{click:function(e){t.$set(t.editing[i],a,!1)}}})]):t.columnProps[i].editable?n("span",{attrs:{id:t.columnProps[i].name+"-"+a+"-Cell"}},[t._v("\n              "+t._s(t.parseValue(e,i))+"\n              "),n("button",{staticClass:"edit-button",attrs:{id:t.columnProps[i].name+"-"+a+"-EditButton"},on:{click:function(e){t.$set(t.editing[i],a,!0)}}})]):n("span",{attrs:{id:t.columnProps[i].name+"-"+a+"-Cell"}},[t._v("\n              "+t._s(t.parseValue(e,i))+"\n            ")])])])}))}))])])},s=[],u=(n("3b2b"),n("6c7b"),n("55dd"),n("ac6a"),n("c5f6"),n("7f7f"),n("5698")),l={name:"Datatable",props:{csvFile:{type:String,required:!0},columnProps:{type:Array,required:!0}},data:function(){return{tableData:[],filteredData:[],sorting:[],editing:[],newValuesBuffer:"",amountFilter:{min:0,max:1e3},dateFilter:{min:"2000-01-01",max:"2022-12-31"}}},computed:{columnsCount:function(){return this.columnProps.length}},created:function(){this.loadCsvFile(),this.setupSorting(),this.setupEditing(),this.filteredData=this.tableData},methods:{loadCsvFile:function(){var t=this;u["a"]("".concat("/a-datatable/").concat(this.csvFile,".csv"),function(e){t.tableData.push(e)})},parseValue:function(t,e){var n=t[this.columnProps[e].name],a=this.columnProps[e].type;return"date"===a?new Date(n).toLocaleDateString():"amount"===a?new Number(n).toLocaleString(void 0,{maximumFractionDigits:2,minimumFractionDigits:2}):n},setupSorting:function(){var t=this;this.columnProps.forEach(function(e,n){e.sorting?(t.$set(t.sorting,n,e.sorting),t.sort(n)):t.$set(t.sorting,n,"ascending")})},setupEditing:function(){var t=this;this.editing=new Array(this.columnsCount).fill(null).map(function(e){return e=new Array(t.tableData.length).fill(null),e})},toggleSorting:function(t){"ascending"===this.sorting[t]?this.$set(this.sorting,t,"descending"):"descending"===this.sorting[t]?this.$set(this.sorting,t,"ascending"):this.$set(this.sorting,t,"descending"),this.sort(t)},sort:function(t){var e=this.columnProps[t].name,n=this.columnProps[t].type,a="ascending"===this.sorting[t];"text"===n||"date"===n?this.filteredData.sort(function(t,n){return t[e]<n[e]?a?-1:1:t[e]>n[e]?a?1:-1:0}):"amount"===n&&this.filteredData.sort(function(t,n){return a?t[e]-n[e]:n[e]-t[e]})},filterText:function(t,e){var n=this.columnProps[t].name,a=this.columnProps[t].type,i=new RegExp(e,"i");"text"===a&&(this.filteredData=this.tableData.filter(function(t){return i.test(t[n])}))},filterAmount:function(t){var e=this,n=this.columnProps[t].name,a=this.columnProps[t].type;"amount"===a&&(this.filteredData=this.tableData.filter(function(t){var a=new Number(t[n]);return a>=e.amountFilter.min&&a<=e.amountFilter.max}))},filterDate:function(t){var e=this.columnProps[t].name,n=this.columnProps[t].type;if("date"===n&&""!==this.dateFilter.min&&""!==this.dateFilter.max){var a=new Date(this.dateFilter.min),i=new Date(this.dateFilter.max);this.filteredData=this.tableData.filter(function(t){var n=new Date(t[e]);return n>=a&&n<=i})}},save:function(t,e){var n=this.tableData[t];n[this.columnProps[e].name]=this.newValuesBuffer,this.newValuesBuffer="",this.filteredData=this.tableData,this.amountFilter.min=0,this.amountFilter.max=1e3,this.dateFilter.min="2000-01-01",this.dateFilter.max="2022-12-31"}}},c=l,m=(n("ac70"),n("2877")),p=Object(m["a"])(c,o,s,!1,null,"2c4a3c7a",null);p.options.__file="Datatable.vue";var d=p.exports,f={name:"app",components:{Datatable:d},data:function(){return{columnProps:[{name:"ID",type:"text"},{name:"Name",type:"text"},{name:"Description",type:"text",editable:!0},{name:"Date",type:"date",sorting:"descending"},{name:"Amount",type:"amount"}]}}},h=f,v=(n("f83f"),Object(m["a"])(h,i,r,!1,null,"4046369a",null));v.options.__file="App.vue";var g=v.exports;a["a"].config.productionTip=!1,new a["a"]({render:function(t){return t(g)}}).$mount("#app")},ac70:function(t,e,n){"use strict";var a=n("097d"),i=n.n(a);i.a},f83f:function(t,e,n){"use strict";var a=n("ff15"),i=n.n(a);i.a},ff15:function(t,e,n){}});
//# sourceMappingURL=app.cdb22d99.js.map