"use strict";(self.webpackChunk_hyperse_track_docs=self.webpackChunk_hyperse_track_docs||[]).push([[8401],{2877:(e,t,s)=>{s.r(t),s.d(t,{default:()=>re});var n=s(3696),a=s(6666),o=s(5198),i=s(2540);const r=n.createContext(null);function l(e){let{children:t,content:s}=e;const a=function(e){return(0,n.useMemo)((()=>({metadata:e.metadata,frontMatter:e.frontMatter,assets:e.assets,contentTitle:e.contentTitle,toc:e.toc})),[e])}(s);return(0,i.jsx)(r.Provider,{value:a,children:t})}function c(){const e=(0,n.useContext)(r);if(null===e)throw new o.dV("DocProvider");return e}function d(){const{metadata:e,frontMatter:t,assets:s}=c();return(0,i.jsx)(a.be,{title:e.title,description:e.description,keywords:t.keywords,image:s.image??t.image})}var h=s(1750),m=s(2575),u=s(6590),x=s(3587);function p(e){const{permalink:t,title:s,subLabel:n,isNext:a}=e;return(0,i.jsxs)(x.A,{className:(0,h.A)("pagination-nav__link",a?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[n&&(0,i.jsx)("div",{className:"pagination-nav__sublabel",children:n}),(0,i.jsx)("div",{className:"pagination-nav__label",children:s})]})}function b(e){const{previous:t,next:s}=e;return(0,i.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,u.T)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"}),children:[t&&(0,i.jsx)(p,{...t,subLabel:(0,i.jsx)(u.A,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc",children:"Previous"})}),s&&(0,i.jsx)(p,{...s,subLabel:(0,i.jsx)(u.A,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc",children:"Next"}),isNext:!0})]})}function g(){const{metadata:e}=c();return(0,i.jsx)(b,{previous:e.previous,next:e.next})}var v=s(7032),j=s(4548),f=s(3237),N=s(9092),_=s(4435);const A={unreleased:function(e){let{siteTitle:t,versionMetadata:s}=e;return(0,i.jsx)(u.A,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:(0,i.jsx)("b",{children:s.label})},children:"This is unreleased documentation for {siteTitle} {versionLabel} version."})},unmaintained:function(e){let{siteTitle:t,versionMetadata:s}=e;return(0,i.jsx)(u.A,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:(0,i.jsx)("b",{children:s.label})},children:"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained."})}};function C(e){const t=A[e.versionMetadata.banner];return(0,i.jsx)(t,{...e})}function k(e){let{versionLabel:t,to:s,onClick:n}=e;return(0,i.jsx)(u.A,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:(0,i.jsx)("b",{children:(0,i.jsx)(x.A,{to:s,onClick:n,children:(0,i.jsx)(u.A,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label",children:"latest version"})})})},children:"For up-to-date documentation, see the {latestVersionLink} ({versionLabel})."})}function y(e){let{className:t,versionMetadata:s}=e;const{siteConfig:{title:n}}=(0,v.A)(),{pluginId:a}=(0,j.vT)({failfast:!0}),{savePreferredVersionName:o}=(0,N.g1)(a),{latestDocSuggestion:r,latestVersionSuggestion:l}=(0,j.HW)(a),c=r??(d=l).docs.find((e=>e.id===d.mainDocId));var d;return(0,i.jsxs)("div",{className:(0,h.A)(t,f.G.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert",children:[(0,i.jsx)("div",{children:(0,i.jsx)(C,{siteTitle:n,versionMetadata:s})}),(0,i.jsx)("div",{className:"margin-top--md",children:(0,i.jsx)(k,{versionLabel:l.label,to:c.path,onClick:()=>o(l.name)})})]})}function w(e){let{className:t}=e;const s=(0,_.r)();return s.banner?(0,i.jsx)(y,{className:t,versionMetadata:s}):null}function L(e){let{className:t}=e;const s=(0,_.r)();return s.badge?(0,i.jsx)("span",{className:(0,h.A)(t,f.G.docs.docVersionBadge,"badge badge--secondary"),children:(0,i.jsx)(u.A,{id:"theme.docs.versionBadge.label",values:{versionLabel:s.label},children:"Version: {versionLabel}"})}):null}const T={tag:"tag_otG2",tagRegular:"tagRegular_s0E1",tagWithCount:"tagWithCount_PGyn"};function V(e){let{permalink:t,label:s,count:n,description:a}=e;return(0,i.jsxs)(x.A,{href:t,title:a,className:(0,h.A)(T.tag,n?T.tagWithCount:T.tagRegular),children:[s,n&&(0,i.jsx)("span",{children:n})]})}const M={tags:"tags_Ow0B",tag:"tag_DFxh"};function H(e){let{tags:t}=e;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("b",{children:(0,i.jsx)(u.A,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list",children:"Tags:"})}),(0,i.jsx)("ul",{className:(0,h.A)(M.tags,"padding--none","margin-left--sm"),children:t.map((e=>(0,i.jsx)("li",{className:M.tag,children:(0,i.jsx)(V,{...e})},e.permalink)))})]})}var B=s(147);function I(){const{metadata:e}=c(),{editUrl:t,lastUpdatedAt:s,lastUpdatedBy:n,tags:a}=e,o=a.length>0,r=!!(t||s||n);return o||r?(0,i.jsxs)("footer",{className:(0,h.A)(f.G.docs.docFooter,"docusaurus-mt-lg"),children:[o&&(0,i.jsx)("div",{className:(0,h.A)("row margin-top--sm",f.G.docs.docFooterTagsRow),children:(0,i.jsx)("div",{className:"col",children:(0,i.jsx)(H,{tags:a})})}),r&&(0,i.jsx)(B.A,{className:(0,h.A)("margin-top--sm",f.G.docs.docFooterEditMetaRow),editUrl:t,lastUpdatedAt:s,lastUpdatedBy:n})]}):null}var z=s(51),P=s(5397);const F={tocCollapsibleButton:"tocCollapsibleButton_iI2p",tocCollapsibleButtonExpanded:"tocCollapsibleButtonExpanded_cHjC"};function G(e){let{collapsed:t,...s}=e;return(0,i.jsx)("button",{type:"button",...s,className:(0,h.A)("clean-btn",F.tocCollapsibleButton,!t&&F.tocCollapsibleButtonExpanded,s.className),children:(0,i.jsx)(u.A,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component",children:"On this page"})})}const R={tocCollapsible:"tocCollapsible_wXna",tocCollapsibleContent:"tocCollapsibleContent_vea0",tocCollapsibleExpanded:"tocCollapsibleExpanded_BbRn"};function E(e){let{toc:t,className:s,minHeadingLevel:n,maxHeadingLevel:a}=e;const{collapsed:o,toggleCollapsed:r}=(0,z.u)({initialState:!0});return(0,i.jsxs)("div",{className:(0,h.A)(R.tocCollapsible,!o&&R.tocCollapsibleExpanded,s),children:[(0,i.jsx)(G,{collapsed:o,onClick:r}),(0,i.jsx)(z.N,{lazy:!0,className:R.tocCollapsibleContent,collapsed:o,children:(0,i.jsx)(P.A,{toc:t,minHeadingLevel:n,maxHeadingLevel:a})})]})}const S={tocMobile:"tocMobile_Ojys"};function D(){const{toc:e,frontMatter:t}=c();return(0,i.jsx)(E,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:(0,h.A)(f.G.docs.docTocMobile,S.tocMobile)})}var O=s(3077);function U(){const{toc:e,frontMatter:t}=c();return(0,i.jsx)(O.A,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:f.G.docs.docTocDesktop})}var W=s(1381),$=s(500);function q(e){let{children:t}=e;const s=function(){const{metadata:e,frontMatter:t,contentTitle:s}=c();return t.hide_title||void 0!==s?null:e.title}();return(0,i.jsxs)("div",{className:(0,h.A)(f.G.docs.docMarkdown,"markdown"),children:[s&&(0,i.jsx)("header",{children:(0,i.jsx)(W.A,{as:"h1",children:s})}),(0,i.jsx)($.A,{children:t})]})}var Q=s(2454),X=s(4379),Z=s(883);function J(e){return(0,i.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,i.jsx)("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"})})}const K={breadcrumbHomeIcon:"breadcrumbHomeIcon_sfvy"};function Y(){const e=(0,Z.Ay)("/");return(0,i.jsx)("li",{className:"breadcrumbs__item",children:(0,i.jsx)(x.A,{"aria-label":(0,u.T)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e,children:(0,i.jsx)(J,{className:K.breadcrumbHomeIcon})})})}const ee={breadcrumbsContainer:"breadcrumbsContainer_T5ub"};function te(e){let{children:t,href:s,isLast:n}=e;const a="breadcrumbs__link";return n?(0,i.jsx)("span",{className:a,itemProp:"name",children:t}):s?(0,i.jsx)(x.A,{className:a,href:s,itemProp:"item",children:(0,i.jsx)("span",{itemProp:"name",children:t})}):(0,i.jsx)("span",{className:a,children:t})}function se(e){let{children:t,active:s,index:n,addMicrodata:a}=e;return(0,i.jsxs)("li",{...a&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},className:(0,h.A)("breadcrumbs__item",{"breadcrumbs__item--active":s}),children:[t,(0,i.jsx)("meta",{itemProp:"position",content:String(n+1)})]})}function ne(){const e=(0,Q.OF)(),t=(0,X.Dt)();return e?(0,i.jsx)("nav",{className:(0,h.A)(f.G.docs.docBreadcrumbs,ee.breadcrumbsContainer),"aria-label":(0,u.T)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"}),children:(0,i.jsxs)("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList",children:[t&&(0,i.jsx)(Y,{}),e.map(((t,s)=>{const n=s===e.length-1,a="category"===t.type&&t.linkUnlisted?void 0:t.href;return(0,i.jsx)(se,{active:n,index:s,addMicrodata:!!a,children:(0,i.jsx)(te,{href:a,isLast:n,children:t.label})},s)}))]})}):null}var ae=s(3518);const oe={docItemContainer:"docItemContainer_tjFy",docItemCol:"docItemCol_Qr34"};function ie(e){let{children:t}=e;const s=function(){const{frontMatter:e,toc:t}=c(),s=(0,m.l)(),n=e.hide_table_of_contents,a=!n&&t.length>0;return{hidden:n,mobile:a?(0,i.jsx)(D,{}):void 0,desktop:!a||"desktop"!==s&&"ssr"!==s?void 0:(0,i.jsx)(U,{})}}(),{metadata:n}=c();return(0,i.jsxs)("div",{className:"row",children:[(0,i.jsxs)("div",{className:(0,h.A)("col",!s.hidden&&oe.docItemCol),children:[(0,i.jsx)(ae.A,{metadata:n}),(0,i.jsx)(w,{}),(0,i.jsxs)("div",{className:oe.docItemContainer,children:[(0,i.jsxs)("article",{children:[(0,i.jsx)(ne,{}),(0,i.jsx)(L,{}),s.mobile,(0,i.jsx)(q,{children:t}),(0,i.jsx)(I,{})]}),(0,i.jsx)(g,{})]})]}),s.desktop&&(0,i.jsx)("div",{className:"col col--3",children:s.desktop})]})}function re(e){const t=`docs-doc-id-${e.content.metadata.id}`,s=e.content;return(0,i.jsx)(l,{content:e.content,children:(0,i.jsxs)(a.e3,{className:t,children:[(0,i.jsx)(d,{}),(0,i.jsx)(ie,{children:(0,i.jsx)(s,{})})]})})}},4846:(e,t,s)=>{s.d(t,{A:()=>i});s(3696);var n=s(3587),a=s(3603),o=s(2540);function i(e){return"cli"!==e.type?(0,o.jsx)(a.A,{...e}):(0,o.jsx)(a.A,{icon:(0,o.jsx)(r,{}),title:"Vendure CLI",...e,children:(0,o.jsxs)(o.Fragment,{children:[e.children,(0,o.jsxs)("div",{style:{fontSize:"12px"},children:["Learn more about the"," ",(0,o.jsx)(n.A,{href:"/guides/developer-guide/cli/",children:"Vendure CLI"})]})]})})}function r(){return(0,o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",style:{fill:"rgb(8 32 41)",stroke:"#fff"},children:(0,o.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"})})}},3555:(e,t,s)=>{s.d(t,{A:()=>i});s(3696);var n=s(1750),a=s(2540);const o={common:"@hyperse-hub/track-plugin-common",google:"@hyperse-hub/track-plugin-google",facebook:"@hyperse-hub/track-plugin-facebook",klaviyo:"@hyperse-hub/track-plugin-klaviyo"};const i={...s(424).A,Required:e=>{const{required:t=!1}=e;return t?(0,a.jsx)("span",{className:"border rounded-md px-2 py-1 bg-orange-500 text-[75%] font-[700] text-gray-50",children:"required"}):(0,a.jsx)("span",{className:"border rounded-md px-2 py-1 bg-gray-400 text-[75%] font-[700] text-white",children:"Optional"})},Property:()=>(0,a.jsx)("span",{className:"border rounded-md px-2 py-1 bg-[#17c1ff] text-[75%] font-[700] text-gray-50 mr-1",children:"Property"}),NpmLink:e=>{const t=o[e.name];return(0,a.jsxs)("a",{href:`https://registry.hyperse.net/package/${t}`,target:"_blank",className:(0,n.A)("bg-[#ebedf0] dark:bg-[#232323] flex flex-row items-center justify-center w-fit px-2 py-0.5 gap-2 border rounded-md no-underline hover:no-underline",e.className,e.noMarginBottom?"":"mb-4"),children:[(0,a.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"540",height:"210",viewBox:"0 0 18 7",className:"w-[24px] h-[12px]",children:[(0,a.jsx)("path",{fill:"#888",d:"M0 0h18v6H9v1H5V6H0zm1 5h2V2h1v3h1V1H1zm5-4v5h2V5h2V1zm2 1h1v2H8zm3-1v4h2V2h1v3h1V2h1v3h1V1z"}),(0,a.jsx)("path",{fill:"#FFF",d:"M1 5h2V2h1v3h1V1H1zM6 1v5h2V5h2V1zm3 3H8V2h1zM11 1v4h2V2h1v3h1V2h1v3h1V1z"})]}),(0,a.jsx)("span",{className:"text-[75%] font-[700]",children:o[e.name]})]})},Platform:e=>(0,a.jsxs)("span",{className:"text-[75%] font-[700] text-gray-50 mr-1 cursor-pointer",onClick:()=>{alert(`The current field is only valid for ${e.children}, other platforms will automatically eliminate or reduce to additional parameters`)},children:[(0,a.jsx)("span",{className:"px-2 py-1 bg-[#5a5a5a] rounded-l-md",children:"Platform"}),(0,a.jsxs)("span",{className:"bg-[#6ec044] rounded-r-md px-2 py-1 relative",children:[(0,a.jsx)("span",{className:"pr-[14px]",children:e.children}),(0,a.jsxs)("svg",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",viewBox:"0 0 1024 1024",height:"16px",width:"16px",xmlns:"http://www.w3.org/2000/svg",className:"absolute top-[3px] right-1",children:[(0,a.jsx)("path",{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}),(0,a.jsx)("path",{d:"M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0 1 30.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1 0 80 0 40 40 0 1 0-80 0z"})]})]})]}),FlexLayout:e=>{const{deration:t="row"}=e;return(0,a.jsx)("div",{className:(0,n.$)("flex gap-2 mb-4","row"===t?"flex-row items-center":"flex-col"),children:e.children})}}}}]);