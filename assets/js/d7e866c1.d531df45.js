"use strict";(self.webpackChunk_hyperse_track_docs=self.webpackChunk_hyperse_track_docs||[]).push([[5071],{3023:(e,i,n)=>{n.d(i,{R:()=>d,x:()=>l});var t=n(3696);const s={},r=t.createContext(s);function d(e){const i=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function l(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:d(e.components),t.createElement(r.Provider,{value:i},e.children)}},7444:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>o,contentTitle:()=>l,default:()=>h,frontMatter:()=>d,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"plugins/types/standard-goods-item","title":"standard_goods_item","description":"standard_goods_item","source":"@site/docs/plugins/types/standard-goods-item.mdx","sourceDirName":"plugins/types","slug":"/plugins/types/standard-goods-item","permalink":"/track/docs/plugins/types/standard-goods-item","draft":false,"unlisted":false,"editUrl":"https://github.com/hyperse-io/track/docs/plugins/types/standard-goods-item.mdx","tags":[],"version":"current","frontMatter":{"title":"standard_goods_item","description":"standard_goods_item","hide_table_of_contents":false,"toc_max_heading_level":4},"sidebar":"pluginsSidebar","previous":{"title":"view_promotion","permalink":"/track/docs/plugins/standard-events/view_promotion"},"next":{"title":"add_shipping_info","permalink":"/track/docs/plugins/google-events/add_shipping_info"}}');var s=n(2540),r=n(3023);const d={title:"standard_goods_item",description:"standard_goods_item",hide_table_of_contents:!1,toc_max_heading_level:4},l="standard_goods_item",o={},c=[{value:"Parameters",id:"parameters",level:3},{value:"item_id",id:"item_id",level:4},{value:"item_name",id:"item_name",level:4},{value:"affiliation",id:"affiliation",level:4},{value:"coupon",id:"coupon",level:4},{value:"discount",id:"discount",level:4},{value:"index",id:"index",level:4},{value:"item_brand",id:"item_brand",level:4},{value:"item_category",id:"item_category",level:4},{value:"item_category2",id:"item_category2",level:4},{value:"item_category3",id:"item_category3",level:4},{value:"item_category4",id:"item_category4",level:4},{value:"item_category5",id:"item_category5",level:4},{value:"item_list_id",id:"item_list_id",level:4},{value:"item_list_name",id:"item_list_name",level:4},{value:"item_variant",id:"item_variant",level:4},{value:"location_id",id:"location_id",level:4},{value:"price",id:"price",level:4},{value:"quantity",id:"quantity",level:4},{value:"image_url",id:"image_url",level:4},{value:"url",id:"url",level:4},{value:"compare_at_price",id:"compare_at_price",level:4},{value:"row_total",id:"row_total",level:4}];function a(e){const i={code:"code",h1:"h1",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",ul:"ul",...(0,r.R)(),...e.components},{NpmLink:n,Property:t,Required:d}=i;return n||x("NpmLink",!0),t||x("Property",!0),d||x("Required",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.header,{children:(0,s.jsx)(i.h1,{id:"standard_goods_item",children:"standard_goods_item"})}),"\n",(0,s.jsx)(n,{name:"common"}),"\n",(0,s.jsx)(i.p,{children:"Product details"}),"\n",(0,s.jsx)(i.h3,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.h4,{id:"item_id",children:"item_id"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(t,{})," ",(0,s.jsx)(i.code,{children:"string"})," ",(0,s.jsx)(d,{required:!0})]}),"\n",(0,s.jsx)(i.p,{children:"The ID of the item."}),"\n",(0,s.jsx)(i.p,{children:"One of item_id or item_name is required."}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.h4,{id:"item_name",children:"item_name"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(t,{})," ",(0,s.jsx)(i.code,{children:"string"})," ",(0,s.jsx)(d,{required:!0})]}),"\n",(0,s.jsx)(i.p,{children:"The name of the item."}),"\n",(0,s.jsx)(i.p,{children:"One of item_id or item_name is required."}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.h4,{id:"affiliation",children:"affiliation"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(t,{})," ",(0,s.jsx)(i.code,{children:"string"})]}),"\n",(0,s.jsx)(i.p,{children:"A product affiliation to designate a supplying company or brick and mortar store location."}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.h4,{id:"coupon",children:"coupon"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(t,{})," ",(0,s.jsx)(i.code,{children:"string"})]}),"\n",(0,s.jsx)(i.p,{children:"The coupon name/code associated with the item."}),"\n",(0,s.jsx)(i.p,{children:"Event-level and item-level coupon parameters are independent."}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.h4,{id:"discount",children:"discount"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(t,{})," ",(0,s.jsx)(i.code,{children:"number"})]}),"\n",(0,s.jsx)(i.p,{children:"The unit monetary discount value associated with the item."}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.h4,{id:"index",children:"index"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(t,{})," ",(0,s.jsx)(i.code,{children:"number"})]}),"\n",(0,s.jsx)(i.p,{children:"The index/position of the item in a list."}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.h4,{id:"item_brand",children:"item_brand"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(t,{})," ",(0,s.jsx)(i.code,{children:"string"})]}),"\n",(0,s.jsx)(i.p,{children:"The brand of the item."}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.h4,{id:"item_category",children:"item_category"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(t,{})," ",(0,s.jsx)(i.code,{children:"string"})]}),"\n",(0,s.jsx)(i.p,{children:"The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category."}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.h4,{id:"item_category2",children:"item_category2"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(t,{})," ",(0,s.jsx)(i.code,{children:"string"})]}),"\n",(0,s.jsx)(i.p,{children:"The second category hierarchy or additional taxonomy for the item."}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.h4,{id:"item_category3",children:"item_category3"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(t,{})," ",(0,s.jsx)(i.code,{children:"string"})]}),"\n",(0,s.jsx)(i.p,{children:"The third category hierarchy or additional taxonomy for the item."}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.h4,{id:"item_category4",children:"item_category4"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(t,{})," ",(0,s.jsx)(i.code,{children:"string"})]}),"\n",(0,s.jsx)(i.p,{children:"The fourth category hierarchy or additional taxonomy for the item."}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.h4,{id:"item_category5",children:"item_category5"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(t,{})," ",(0,s.jsx)(i.code,{children:"string"})]}),"\n",(0,s.jsx)(i.p,{children:"The fifth category hierarchy or additional taxonomy for the item."}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.h4,{id:"item_list_id",children:"item_list_id"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(t,{})," ",(0,s.jsx)(i.code,{children:"string"})]}),"\n",(0,s.jsx)(i.p,{children:"The ID of the list in which the item was presented to the user."}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.h4,{id:"item_list_name",children:"item_list_name"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(t,{})," ",(0,s.jsx)(i.code,{children:"string"})]}),"\n",(0,s.jsx)(i.p,{children:"The name of the list in which the item was presented to the user."}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.h4,{id:"item_variant",children:"item_variant"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(t,{})," ",(0,s.jsx)(i.code,{children:"string"})]}),"\n",(0,s.jsx)(i.p,{children:"The item variant or unique code or description for additional item details/options."}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.h4,{id:"location_id",children:"location_id"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(t,{})," ",(0,s.jsx)(i.code,{children:"string"})]}),"\n",(0,s.jsx)(i.p,{children:"The physical location associated with the item (e.g. the physical store location). It's recommended to use the Google Place ID that corresponds to the associated item. A custom location ID can also be used."}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.h4,{id:"price",children:"price"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(t,{})," ",(0,s.jsx)(i.code,{children:"number"})]}),"\n",(0,s.jsx)(i.p,{children:"01 The monetary unit price of the item, in units of the specified currency parameter."}),"\n",(0,s.jsx)(i.p,{children:"If a discount applies to the item, set price to the discounted unit price and specify the unit price discount in the discount parameter."}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.h4,{id:"quantity",children:"quantity"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(t,{})," ",(0,s.jsx)(i.code,{children:"number"})]}),"\n",(0,s.jsx)(i.p,{children:"Item quantity."}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.h4,{id:"image_url",children:"image_url"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(t,{})," ",(0,s.jsx)(i.code,{children:"string"})]}),"\n",(0,s.jsx)(i.p,{children:"The URL of the product image."}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.h4,{id:"url",children:"url"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(t,{})," ",(0,s.jsx)(i.code,{children:"string"})]}),"\n",(0,s.jsx)(i.p,{children:"The URL of the product page."}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.h4,{id:"compare_at_price",children:"compare_at_price"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(t,{})," ",(0,s.jsx)(i.code,{children:"number"})]}),"\n",(0,s.jsx)(i.p,{children:"The original price of the product, used for comparing with the current price."}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsx)(i.h4,{id:"row_total",children:"row_total"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(t,{})," ",(0,s.jsx)(i.code,{children:"number"})]}),"\n",(0,s.jsx)(i.p,{children:"The total price of the product based on quantity."}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}function x(e,i){throw new Error("Expected "+(i?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}}}]);