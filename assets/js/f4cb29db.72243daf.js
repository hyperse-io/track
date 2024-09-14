"use strict";(self.webpackChunk_hyperse_track_docs=self.webpackChunk_hyperse_track_docs||[]).push([[2431],{3167:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>r,metadata:()=>d,toc:()=>l});var t=i(2540),s=i(3023);const r={title:"add_shipping_info",description:"add_shipping_info",hide_table_of_contents:!1,toc_max_heading_level:4},o=void 0,d={id:"plugins/google-events/add_shipping_info",title:"add_shipping_info",description:"add_shipping_info",source:"@site/docs/plugins/google-events/add_shipping_info.mdx",sourceDirName:"plugins/google-events",slug:"/plugins/google-events/add_shipping_info",permalink:"/track/docs/plugins/google-events/add_shipping_info",draft:!1,unlisted:!1,editUrl:"https://github.com/hyperse-io/track/docs/plugins/google-events/add_shipping_info.mdx",tags:[],version:"current",frontMatter:{title:"add_shipping_info",description:"add_shipping_info",hide_table_of_contents:!1,toc_max_heading_level:4},sidebar:"pluginsSidebar",previous:{title:"standard_goods_item",permalink:"/track/docs/plugins/types/standard-goods-item"},next:{title:"login",permalink:"/track/docs/plugins/google-events/login"}},c={},l=[{value:"Parameters",id:"parameters",level:2},{value:"currency",id:"currency",level:3},{value:"value",id:"value",level:3},{value:"coupon",id:"coupon",level:3},{value:"shipping_tier",id:"shipping_tier",level:3},{value:"items",id:"items",level:3}];function a(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...(0,s.R)(),...e.components},{NpmLink:i,Property:r,Required:o}=n;return i||u("NpmLink",!0),r||u("Property",!0),o||u("Required",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i,{name:"google"}),"\n",(0,t.jsx)(n.p,{children:"This event signifies a user has submitted their shipping information in an ecommerce checkout process."}),"\n",(0,t.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsx)(n.h3,{id:"currency",children:"currency"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(r,{})," ",(0,t.jsx)(n.code,{children:"string"})," ",(0,t.jsx)(o,{required:!0})]}),"\n",(0,t.jsx)(n.p,{children:"USD Currency of the items associated with the event, in 3-letter ISO 4217 format."}),"\n",(0,t.jsx)(n.p,{children:"If you set value then currency is required for revenue metrics to be computed accurately."}),"\n",(0,t.jsx)(n.h3,{id:"value",children:"value"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(r,{})," ",(0,t.jsx)(n.code,{children:"number"})," ",(0,t.jsx)(o,{required:!0})]}),"\n",(0,t.jsx)(n.p,{children:"The monetary value of the event."}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Set value to the sum of (price * quantity) for all items in items. Don't include shipping or tax."}),"\n",(0,t.jsx)(n.li,{children:"value is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set value."}),"\n",(0,t.jsx)(n.li,{children:"currency is required if you set value."}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"coupon",children:"coupon"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(r,{})," ",(0,t.jsx)(n.code,{children:"string"})]}),"\n",(0,t.jsx)(n.p,{children:"The coupon name/code associated with the event."}),"\n",(0,t.jsx)(n.p,{children:"Event-level and item-level coupon parameters are independent."}),"\n",(0,t.jsx)(n.h3,{id:"shipping_tier",children:"shipping_tier"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(r,{})," ",(0,t.jsx)(n.code,{children:"string"})]}),"\n",(0,t.jsx)(n.p,{children:"The shipping tier (e.g. Ground, Air, Next-day) selected for delivery of the purchased item."}),"\n",(0,t.jsx)(n.h3,{id:"items",children:"items"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(r,{})," ",(0,t.jsx)(n.a,{href:"/track/docs/plugins/types/standard-goods-item",children:"Item"}),"[] ",(0,t.jsx)(o,{required:!0})]}),"\n",(0,t.jsx)(n.p,{children:"The items for the event."})]})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}function u(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},3023:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>d});var t=i(3696);const s={},r=t.createContext(s);function o(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);