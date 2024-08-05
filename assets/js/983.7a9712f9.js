(self.webpackChunk_hyperse_track_docs=self.webpackChunk_hyperse_track_docs||[]).push([[983],{2491:(e,t,r)=>{"use strict";r.d(t,{A:()=>u});r(3696);var n=r(1750);const a={tabItem:"tabItem_wHwb"};var o=r(2540);function u(e){let{children:t,hidden:r,className:u}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,n.A)(a.tabItem,u),hidden:r,children:t})}},8296:(e,t,r)=>{"use strict";r.d(t,{A:()=>j});var n=r(3696),a=r(1750),o=r(766),u=r(9519),l=r(4395),i=r(5043),s=r(4544),c=r(4243);function f(e){return n.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function d(e){const{values:t,children:r}=e;return(0,n.useMemo)((()=>{const e=t??function(e){return f(e).map((e=>{let{props:{value:t,label:r,attributes:n,default:a}}=e;return{value:t,label:r,attributes:n,default:a}}))}(r);return function(e){const t=(0,s.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,r])}function b(e){let{value:t,tabValues:r}=e;return r.some((e=>e.value===t))}function p(e){let{queryString:t=!1,groupId:r}=e;const a=(0,u.W6)(),o=function(e){let{queryString:t=!1,groupId:r}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:t,groupId:r});return[(0,i.aZ)(o),(0,n.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(a.location.search);t.set(o,e),a.replace({...a.location,search:t.toString()})}),[o,a])]}function v(e){const{defaultValue:t,queryString:r=!1,groupId:a}=e,o=d(e),[u,i]=(0,n.useState)((()=>function(e){let{defaultValue:t,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!b({value:t,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=r.find((e=>e.default))??r[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:o}))),[s,f]=p({queryString:r,groupId:a}),[v,h]=function(e){let{groupId:t}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,o]=(0,c.Dv)(r);return[a,(0,n.useCallback)((e=>{r&&o.set(e)}),[r,o])]}({groupId:a}),m=(()=>{const e=s??v;return b({value:e,tabValues:o})?e:null})();(0,l.A)((()=>{m&&i(m)}),[m]);return{selectedValue:u,selectValue:(0,n.useCallback)((e=>{if(!b({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);i(e),f(e),h(e)}),[f,h,o]),tabValues:o}}var h=r(6681);const m={tabList:"tabList_J5MA",tabItem:"tabItem_l0OV"};var g=r(2540);function y(e){let{className:t,block:r,selectedValue:n,selectValue:u,tabValues:l}=e;const i=[],{blockElementScrollPositionUntilNextRender:s}=(0,o.a_)(),c=e=>{const t=e.currentTarget,r=i.indexOf(t),a=l[r].value;a!==n&&(s(t),u(a))},f=e=>{let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const r=i.indexOf(e.currentTarget)+1;t=i[r]??i[0];break}case"ArrowLeft":{const r=i.indexOf(e.currentTarget)-1;t=i[r]??i[i.length-1];break}}t?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.A)("tabs",{"tabs--block":r},t),children:l.map((e=>{let{value:t,label:r,attributes:o}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:n===t?0:-1,"aria-selected":n===t,ref:e=>i.push(e),onKeyDown:f,onClick:c,...o,className:(0,a.A)("tabs__item",m.tabItem,o?.className,{"tabs__item--active":n===t}),children:r??t},t)}))})}function w(e){let{lazy:t,children:r,selectedValue:a}=e;const o=(Array.isArray(r)?r:[r]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===a));return e?(0,n.cloneElement)(e,{className:"margin-top--md"}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:o.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==a})))})}function k(e){const t=v(e);return(0,g.jsxs)("div",{className:(0,a.A)("tabs-container",m.tabList),children:[(0,g.jsx)(y,{...t,...e}),(0,g.jsx)(w,{...t,...e})]})}function j(e){const t=(0,h.A)();return(0,g.jsx)(k,{...e,children:f(e.children)},String(t))}},8601:(e,t,r)=>{var n=NaN,a="[object Symbol]",o=/^\s+|\s+$/g,u=/^[-+]0x[0-9a-f]+$/i,l=/^0b[01]+$/i,i=/^0o[0-7]+$/i,s=parseInt,c="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g,f="object"==typeof self&&self&&self.Object===Object&&self,d=c||f||Function("return this")(),b=Object.prototype.toString,p=Math.max,v=Math.min,h=function(){return d.Date.now()};function m(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function g(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&b.call(e)==a}(e))return n;if(m(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=m(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(o,"");var r=l.test(e);return r||i.test(e)?s(e.slice(2),r?2:8):u.test(e)?n:+e}e.exports=function(e,t,r){var n,a,o,u,l,i,s=0,c=!1,f=!1,d=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function b(t){var r=n,o=a;return n=a=void 0,s=t,u=e.apply(o,r)}function y(e){var r=e-i;return void 0===i||r>=t||r<0||f&&e-s>=o}function w(){var e=h();if(y(e))return k(e);l=setTimeout(w,function(e){var r=t-(e-i);return f?v(r,o-(e-s)):r}(e))}function k(e){return l=void 0,d&&n?b(e):(n=a=void 0,u)}function j(){var e=h(),r=y(e);if(n=arguments,a=this,i=e,r){if(void 0===l)return function(e){return s=e,l=setTimeout(w,t),c?b(e):u}(i);if(f)return l=setTimeout(w,t),b(i)}return void 0===l&&(l=setTimeout(w,t)),u}return t=g(t)||0,m(r)&&(c=!!r.leading,o=(f="maxWait"in r)?p(g(r.maxWait)||0,t):o,d="trailing"in r?!!r.trailing:d),j.cancel=function(){void 0!==l&&clearTimeout(l),s=0,n=i=a=l=void 0},j.flush=function(){return void 0===l?u:k(h())},j}},9935:(e,t,r)=>{"use strict";r.d(t,{A:()=>o});var n=r(3696);function a({title:e,titleId:t,...r},a){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:a,"aria-labelledby":t},r),e?n.createElement("title",{id:t},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m4.5 12.75 6 6 9-13.5"}))}const o=n.forwardRef(a)},2729:(e,t,r)=>{"use strict";r.d(t,{A:()=>o});var n=r(3696);function a({title:e,titleId:t,...r},a){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:a,"aria-labelledby":t},r),e?n.createElement("title",{id:t},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"}))}const o=n.forwardRef(a)},5904:(e,t,r)=>{"use strict";r.d(t,{Cj:()=>a});var n=r(3696);r(8601);"undefined"!=typeof window?n.useLayoutEffect:n.useEffect;function a(){const[e,t]=(0,n.useState)(null);return[e,(0,n.useCallback)((async e=>{if(!(null==navigator?void 0:navigator.clipboard))return console.warn("Clipboard not supported"),!1;try{return await navigator.clipboard.writeText(e),t(e),!0}catch(r){return console.warn("Copy failed",r),t(null),!1}}),[])]}}}]);