"use strict";(self.webpackChunk_hyperse_track_docs=self.webpackChunk_hyperse_track_docs||[]).push([[220],{4651:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>c,toc:()=>p});var r=n(2540),a=n(3023),o=n(8296),s=n(2491);const l={},i="Example",c={id:"intro/sample-example",title:"Example",description:"Simple usage",source:"@site/docs/intro/sample-example.md",sourceDirName:"intro",slug:"/intro/sample-example",permalink:"/track/docs/intro/sample-example",draft:!1,unlisted:!1,editUrl:"https://github.com/hyperse-io/track/docs/intro/sample-example.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Installation",permalink:"/track/docs/intro/installation"},next:{title:"Live Example",permalink:"/track/docs/intro/live-example"}},u={},p=[{value:"Simple usage",id:"simple-usage",level:2},{value:"Congratulations !",id:"congratulations-",level:2}];function d(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",hr:"hr",p:"p",pre:"pre",strong:"strong",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"example",children:"Example"}),"\n","\n",(0,r.jsx)(t.h2,{id:"simple-usage",children:"Simple usage"}),"\n",(0,r.jsx)(t.p,{children:"Here is a simple usage for using the component:"}),"\n",(0,r.jsx)(t.hr,{}),"\n",(0,r.jsx)(t.admonition,{type:"info",children:(0,r.jsxs)(t.p,{children:["Read more in ",(0,r.jsx)(t.a,{href:"/docs/intro/introducing",children:(0,r.jsx)(t.strong,{children:"User guide > introducing"})})]})}),"\n",(0,r.jsxs)(o.A,{children:[(0,r.jsx)(s.A,{value:"track",label:"track.ts",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",metastring:'title="track.ts"',children:"export const reportTrack = () => {\n  const reportAdapter = new ReportAdapter();\n\n  const adapterBuilder = createAdapterBuilder<\n    TrackContext<ReportTrackData>,\n    ReportEventData,\n    ReportAdapterOptions<TrackContext<ReportTrackData>, ReportEventData>\n  >(reportAdapter);\n\n  const adapter = adapterBuilder\n    .setup(() => {\n      return Promise.resolve({\n        name: 'setup',\n        timeStamp: Date.now(),\n      });\n    })\n    .before((ctx, eventType, eventData) => {\n      console.log('before', ctx, eventType, eventData);\n    })\n    .transform('addCart', (ctx, eventType, eventData) => {\n      return {\n        ...eventData,\n        goodName: 'ac_' + eventData?.goodsName,\n      };\n    })\n    .transform('registry', (ctx, eventType, eventData) => {\n      return { ...eventData, userName: 'rg_' + eventData?.userName };\n    })\n    .after((ctx, eventType, reportData) => {\n      console.log('after', ctx, eventType, reportData);\n    })\n    .build();\n\n  const trackBuilder = createTrackBuilder<\n    TrackContext<ReportTrackData>,\n    ReportEventData\n  >();\n\n  return trackBuilder\n    .init(() => {\n      return {\n        reportAdapter: adapter,\n      };\n    })\n    .before((ctx) => {\n      console.log('before track', ctx);\n    })\n    .after((ctx) => {\n      console.log('after track', ctx);\n    });\n};\n"})})}),(0,r.jsx)(s.A,{value:"reportAdapter",label:"reportAdapter.ts",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",metastring:'title="reportAdapter.ts"',children:"export class ReportAdapter extends BaseAdapter<\n  TrackContext<ReportTrackData>,\n  ReportEventData,\n  ReportAdapterOptions<TrackContext<ReportTrackData>, ReportEventData>\n> {\n  isTrackable<EventType extends keyof ReportEventData>(\n    ctx: TrackContext<ReportTrackData>,\n    eventType: keyof ReportEventData,\n    reportData?:\n      | AdapterReportData<ReportEventData, ReportEventData, EventType>\n      | Awaited<AdapterReportData<ReportEventData, ReportEventData, EventType>>\n      | undefined\n  ): boolean | Promise<boolean> {\n    return true;\n  }\n\n  protected report<EventType extends keyof ReportEventData>(\n    ctx: TrackContext<ReportTrackData>,\n    eventType: keyof ReportEventData,\n    reportData?:\n      | AdapterReportData<ReportEventData, ReportEventData, EventType>\n      | Awaited<AdapterReportData<ReportEventData, ReportEventData, EventType>>\n      | undefined,\n    setupData?:\n      | {\n          name: 'setup' | 'setup1' | 'setup2';\n          timeStamp: number;\n          user?: string;\n        }\n      | undefined\n  ): void | Promise<void> {}\n}\n"})})}),(0,r.jsx)(s.A,{value:"types",label:"types.ts",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",metastring:'title="types.ts"',children:"export type ReportAdapterOptions<Context, EventData> = {\n  setup?: <EventType extends keyof EventData>(\n    ctx: Context,\n    eventTYpe: EventType,\n    eventData: EventData[EventType]\n  ) => Promise<{\n    name: 'setup' | 'setup2' | 'setup3';\n    timeStamp: number;\n  }>;\n};\n\nexport type ReportTrackData = {\n  bizMode: 'test' | 'test2';\n  env: 'prod' | 'uat';\n  platform: 'android' | 'ios';\n  ip: string;\n  userId: string;\n};\n\nexport type ReportEventData = {\n  registry?: {\n    userName: string;\n    mobile: string;\n    pwd: string;\n    email: string;\n  };\n  addCart?: {\n    price: number;\n    goodsId: string;\n    goodsName: string;\n    count: number;\n  };\n};\n"})})}),(0,r.jsx)(s.A,{value:"index",label:"index.txs",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",metastring:'title="index.tsx"',children:'export const Index = () => {\n  const onAddToCart = async () => {\n    await reportTrack().select(\'reportAdapter\').track(\'addCart\', {\n      price: 25.99,\n      goodsId: \'23432252\',\n      goodsName: \'Long Chair\',\n      count: 1,\n    });\n  };\n  return (\n    <div>\n      <div class="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl">\n        <div class="h-48 bg-gray-700 rounded-xl"></div>\n        <div class="flex flex-col gap-4">\n          <div class="flex flex-row justify-between">\n            <div class="flex flex-col">\n              <span class="text-xl font-bold">Long Chair</span>\n              <p class="text-xs text-gray-700">ID: 23432252</p>\n            </div>\n            <span class="font-bold  text-red-600">$25.99</span>\n          </div>\n          <button class="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2 rounded-md">\n            Add to cart\n          </button>\n        </div>\n      </div>\n    </div>\n  );\n};\n'})})})]}),"\n",(0,r.jsx)(t.h2,{id:"congratulations-",children:"Congratulations !"}),"\n",(0,r.jsxs)(t.p,{children:["That's all, now let's deep dive into the ",(0,r.jsx)(t.a,{href:"/docs/api/base-adapter",children:"props"}),"."]})]})}function m(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},2491:(e,t,n)=>{n.d(t,{A:()=>s});n(3696);var r=n(1750);const a={tabItem:"tabItem_wHwb"};var o=n(2540);function s(e){let{children:t,hidden:n,className:s}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,r.A)(a.tabItem,s),hidden:n,children:t})}},8296:(e,t,n)=>{n.d(t,{A:()=>D});var r=n(3696),a=n(1750),o=n(766),s=n(9519),l=n(4395),i=n(5043),c=n(4544),u=n(4243);function p(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function d(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??function(e){return p(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}(n);return function(e){const t=(0,c.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function v(e){let{queryString:t=!1,groupId:n}=e;const a=(0,s.W6)(),o=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i.aZ)(o),(0,r.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(a.location.search);t.set(o,e),a.replace({...a.location,search:t.toString()})}),[o,a])]}function x(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,o=d(e),[s,i]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:o}))),[c,p]=v({queryString:n,groupId:a}),[x,f]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,o]=(0,u.Dv)(n);return[a,(0,r.useCallback)((e=>{n&&o.set(e)}),[n,o])]}({groupId:a}),h=(()=>{const e=c??x;return m({value:e,tabValues:o})?e:null})();(0,l.A)((()=>{h&&i(h)}),[h]);return{selectedValue:s,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);i(e),p(e),f(e)}),[p,f,o]),tabValues:o}}var f=n(6681);const h={tabList:"tabList_J5MA",tabItem:"tabItem_l0OV"};var g=n(2540);function b(e){let{className:t,block:n,selectedValue:r,selectValue:s,tabValues:l}=e;const i=[],{blockElementScrollPositionUntilNextRender:c}=(0,o.a_)(),u=e=>{const t=e.currentTarget,n=i.indexOf(t),a=l[n].value;a!==r&&(c(t),s(a))},p=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const n=i.indexOf(e.currentTarget)+1;t=i[n]??i[0];break}case"ArrowLeft":{const n=i.indexOf(e.currentTarget)-1;t=i[n]??i[i.length-1];break}}t?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.A)("tabs",{"tabs--block":n},t),children:l.map((e=>{let{value:t,label:n,attributes:o}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:r===t?0:-1,"aria-selected":r===t,ref:e=>i.push(e),onKeyDown:p,onClick:u,...o,className:(0,a.A)("tabs__item",h.tabItem,o?.className,{"tabs__item--active":r===t}),children:n??t},t)}))})}function y(e){let{lazy:t,children:n,selectedValue:a}=e;const o=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:o.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a})))})}function k(e){const t=x(e);return(0,g.jsxs)("div",{className:(0,a.A)("tabs-container",h.tabList),children:[(0,g.jsx)(b,{...t,...e}),(0,g.jsx)(y,{...t,...e})]})}function D(e){const t=(0,f.A)();return(0,g.jsx)(k,{...e,children:p(e.children)},String(t))}},3023:(e,t,n)=>{n.d(t,{R:()=>s,x:()=>l});var r=n(3696);const a={},o=r.createContext(a);function s(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);