"use strict";(self.webpackChunk_hyperse_track_docs=self.webpackChunk_hyperse_track_docs||[]).push([[963],{5159:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>c,toc:()=>l});var r=n(2540),s=n(3023);const a={},i="TrackBuilder",c={id:"api/track-builder",title:"TrackBuilder",description:"The TrackBuilder class is designed to create a track from a series of waypoints. It provides a structured way to generate a path for a vehicle or an event tracking system to follow. This class includes hooks that allow you to customize the behavior of the track creation process.",source:"@site/docs/api/track-builder.md",sourceDirName:"api",slug:"/api/track-builder",permalink:"/track/docs/api/track-builder",draft:!1,unlisted:!1,editUrl:"https://github.com/hyperse-io/track/docs/api/track-builder.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"AdapterBuilder",permalink:"/track/docs/api/adapter-builder"},next:{title:"GoogleAdapter",permalink:"/track/docs/adapters/google-adapter"}},o={},l=[{value:"Overview",id:"overview",level:2},{value:"Constructor",id:"constructor",level:3},{value:"Hooks",id:"hooks",level:2},{value:"<code>init</code>",id:"init",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Example",id:"example",level:4},{value:"<code>before</code>",id:"before",level:3},{value:"Props",id:"props",level:4},{value:"Example",id:"example-1",level:4},{value:"<code>after</code>",id:"after",level:3},{value:"Props",id:"props-1",level:4},{value:"Example",id:"example-2",level:4},{value:"<code>select</code>",id:"select",level:3},{value:"Props",id:"props-2",level:4},{value:"Example",id:"example-3",level:4},{value:"<code>track</code>",id:"track",level:3},{value:"Props",id:"props-3",level:4},{value:"Example",id:"example-4",level:4}];function d(e){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"trackbuilder",children:"TrackBuilder"}),"\n",(0,r.jsxs)(t.p,{children:["The ",(0,r.jsx)(t.code,{children:"TrackBuilder"})," class is designed to create a track from a series of waypoints. It provides a structured way to generate a path for a vehicle or an event tracking system to follow. This class includes hooks that allow you to customize the behavior of the track creation process."]}),"\n",(0,r.jsx)(t.h2,{id:"overview",children:"Overview"}),"\n",(0,r.jsxs)(t.p,{children:["The ",(0,r.jsx)(t.code,{children:"TrackBuilder"})," class allows you to define and customize the process of building a track by:"]}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Initializing the track with specific options."}),"\n",(0,r.jsx)(t.li,{children:"Adding hooks to execute custom logic before and after certain stages of the track building."}),"\n",(0,r.jsx)(t.li,{children:"Selecting specific adapters for tracking events."}),"\n",(0,r.jsx)(t.li,{children:"Tracking events with custom data."}),"\n"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",metastring:'title="Signature"',children:"class TrackBuilder<\n  Context extends TrackContext<any>,\n  EventData extends TrackEventDataBase,\n> {\n  constructor(options: TrackCreateOptions<Context, EventData> = {});\n}\n"})}),"\n",(0,r.jsx)(t.h3,{id:"constructor",children:"Constructor"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsxs)(t.p,{children:["options: ",(0,r.jsx)(t.code,{children:"TrackCreateOptions<Context, EventData>"})," (Optional)"]}),"\n",(0,r.jsx)(t.p,{children:"The options used to create the track. These options typically include configurations for the tracking adapters, context, and other relevant settings."}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"hooks",children:"Hooks"}),"\n",(0,r.jsx)(t.h3,{id:"init",children:(0,r.jsx)(t.code,{children:"init"})}),"\n",(0,r.jsxs)(t.p,{children:["The ",(0,r.jsx)(t.code,{children:"init"})," method is used to initialize the track builder with specific options, such as which adapters to use for reporting and console output."]}),"\n",(0,r.jsx)(t.h4,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsxs)(t.p,{children:["options: ",(0,r.jsx)(t.code,{children:"TrackCreateOptions<Context, EventData>"})]}),"\n",(0,r.jsx)(t.p,{children:"An object containing the initialization options for the track. This typically includes the adapters and other configurations necessary to build the track."}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(t.h4,{id:"example",children:"Example"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",metastring:'title="TrackBuilder.ts"',children:"// method 1\ntrackBuilder.init({ reportAdapter: adapter, consoleAdapter: adapter });\n// method 2\ntrackBuilder.init(() => {\n  return { reportAdapter: adapter, consoleAdapter: adapter };\n});\n"})}),"\n",(0,r.jsx)(t.h3,{id:"before",children:(0,r.jsx)(t.code,{children:"before"})}),"\n",(0,r.jsxs)(t.p,{children:["The ",(0,r.jsx)(t.code,{children:"before"})," method is a hook that allows you to execute custom logic before the track building process begins. This can be used for tasks such as preprocessing, validation, or logging."]}),"\n",(0,r.jsx)(t.h4,{id:"props",children:"Props"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"ctx"})," : ",(0,r.jsx)(t.code,{children:"TrackContext<TrackData>"})]}),"\n",(0,r.jsx)(t.p,{children:"The context in which the tracking is occurring. This typically includes details such as user information, environment, or other contextual data relevant to the tracking event."}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(t.h4,{id:"example-1",children:"Example"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",metastring:'title="TrackBuilder.ts"',children:"trackBuilder.before(async (ctx: TrackContext<TrackData>) => {\n  // do something\n});\n"})}),"\n",(0,r.jsx)(t.h3,{id:"after",children:(0,r.jsx)(t.code,{children:"after"})}),"\n",(0,r.jsxs)(t.p,{children:["The ",(0,r.jsx)(t.code,{children:"after"})," method is a hook that allows you to execute custom logic after the track building process is completed. This can be used for tasks such as cleanup, final validation, or post-processing."]}),"\n",(0,r.jsx)(t.h4,{id:"props-1",children:"Props"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"ctx"})," : ",(0,r.jsx)(t.code,{children:"TrackContext<TrackData>"})]}),"\n",(0,r.jsx)(t.p,{children:"The context in which the tracking is occurring. This typically includes details such as user information, environment, or other contextual data relevant to the tracking event."}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(t.h4,{id:"example-2",children:"Example"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",metastring:'title="TrackBuilder.ts"',children:"trackBuilder.after(async (ctx: TrackContext<TrackData>) => {\n  // do something\n});\n"})}),"\n",(0,r.jsx)(t.h3,{id:"select",children:(0,r.jsx)(t.code,{children:"select"})}),"\n",(0,r.jsxs)(t.p,{children:["The ",(0,r.jsx)(t.code,{children:"select"})," method is used to choose which adapters should be used during the track creation process. This allows for dynamic selection based on the context or specific conditions."]}),"\n",(0,r.jsx)(t.h4,{id:"props-2",children:"Props"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"ctx"})," : ",(0,r.jsx)(t.code,{children:"TrackContext<TrackData>"})]}),"\n",(0,r.jsx)(t.p,{children:"The context in which the tracking is occurring. This typically includes details such as user information, environment, or other contextual data relevant to the tracking event."}),"\n"]}),"\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"adapterMap"})," : ",(0,r.jsx)(t.code,{children:"Record<string, TrackAdapter<Context, EventData>>"})]}),"\n",(0,r.jsx)(t.p,{children:"A map of available adapters, where the key is the adapter name and the value is the adapter instance."}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(t.h4,{id:"example-3",children:"Example"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",metastring:'title="TrackBuilder.ts"',children:"// method 1\ntrackBuilder.select(['consoleAdapter', 'reportAdapter']);\n// method 2\ntrackBuilder.select(\n  (\n    ctx: TrackContext<TrackData>,\n    adapterMap: {\n      reportAdapter: ReportAdapter;\n      consoleAdapter: ReportAdapter;\n    }\n  ) => ['consoleAdapter', 'reportAdapter']\n);\n// method 3\ntrackBuilder.select(\n  (\n    ctx: TrackContext<TrackData>,\n    adapterMap: {\n      reportAdapter: ReportAdapter;\n      consoleAdapter: ReportAdapter;\n    }\n  ) => Promise.resolve(['consoleAdapter', 'reportAdapter'])\n);\n"})}),"\n",(0,r.jsx)(t.h3,{id:"track",children:(0,r.jsx)(t.code,{children:"track"})}),"\n",(0,r.jsxs)(t.p,{children:["The ",(0,r.jsx)(t.code,{children:"track"})," method is used to track an event by specifying the event type and associated event data. This method triggers the tracking process, using the previously selected adapters."]}),"\n",(0,r.jsx)(t.h4,{id:"props-3",children:"Props"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"eventType"})," : ",(0,r.jsx)(t.code,{children:"addCart"})]}),"\n",(0,r.jsx)(t.p,{children:"The type of event being tracked. This is usually a key from the EventData that corresponds to specific events like click, purchase, etc."}),"\n"]}),"\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"eventData"})," : ",(0,r.jsx)(t.code,{children:"EventData[keyof EventData]"})]}),"\n",(0,r.jsx)(t.p,{children:"An object containing the data associated with the event. This data usually includes information such as item details, pricing, quantity, and other relevant attributes."}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(t.h4,{id:"example-4",children:"Example"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",metastring:'title="TrackBuilder.ts"',children:"trackBuilder.track('addCart', {\n  price: 99.99,\n  goodsId: 'g123',\n  goodsName: 'Sample Goods',\n  count: 2,\n});\n"})})]})}function h(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},3023:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>c});var r=n(3696);const s={},a=r.createContext(s);function i(e){const t=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(a.Provider,{value:t},e.children)}}}]);