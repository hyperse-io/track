"use strict";(self.webpackChunk_hyperse_track_docs=self.webpackChunk_hyperse_track_docs||[]).push([[89],{2955:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>d,frontMatter:()=>s,metadata:()=>c,toc:()=>l});var i=t(2540),r=t(3023);const s={},o="Contribution Guidelines",c={id:"community/contributing",title:"Contribution Guidelines",description:"Hi! Thank you for taking the time to contribute to Hyperse!",source:"@site/docs/community/contributing.md",sourceDirName:"community",slug:"/community/contributing",permalink:"/track/docs/community/contributing",draft:!1,unlisted:!1,editUrl:"https://github.com/hyperse-io/track/docs/community/contributing.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"GoogleAdapter",permalink:"/track/docs/adapters/google-adapter"},next:{title:"FAQ's",permalink:"/track/docs/faq"}},a={},l=[{value:"Branches",id:"branches",level:2},{value:"Bug fixes",id:"bug-fixes",level:2},{value:"New features",id:"new-features",level:2},{value:"Commit message format",id:"commit-message-format",level:2},{value:"Breaking Changes",id:"breaking-changes",level:4},{value:"Linting",id:"linting",level:4},{value:"Setting up the dev environment",id:"setting-up-the-dev-environment",level:2},{value:"Contributor License Agreement",id:"contributor-license-agreement",level:2}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"contribution-guidelines",children:"Contribution Guidelines"}),"\n",(0,i.jsx)(n.p,{children:"Hi! Thank you for taking the time to contribute to Hyperse!"}),"\n",(0,i.jsx)(n.p,{children:"In order to make the best use of both your time and that of the Hyperse maintainers, please follow the guidelines in this document."}),"\n",(0,i.jsx)(n.h2,{id:"branches",children:"Branches"}),"\n",(0,i.jsx)(n.p,{children:"There are 3 important branches to know about:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"master"})," - the default branch"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"minor"})," - a branch for commits which introduce new features which would go in the next ",(0,i.jsx)(n.a,{href:"https://semver.org/",children:"SemVer minor"})," release."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"major"})," - a branch for commits which introduce breaking changes which would go in the next ",(0,i.jsx)(n.a,{href:"https://semver.org/",children:"SemVer major"})," release."]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Bug fixes should go direct in the ",(0,i.jsx)(n.code,{children:"master"})," branch, from which new patch releases will be made regularly. Periodically the master branch will be merged into the ",(0,i.jsx)(n.code,{children:"minor"})," and ",(0,i.jsx)(n.code,{children:"major"})," branches."]}),"\n",(0,i.jsx)(n.h2,{id:"bug-fixes",children:"Bug fixes"}),"\n",(0,i.jsx)(n.p,{children:"If you would like to contribute a bugfix, please first create an issue detailing the bug, and indicate that you intend to fix it. When creating commits, please follow the commit message format below."}),"\n",(0,i.jsx)(n.h2,{id:"new-features",children:"New features"}),"\n",(0,i.jsxs)(n.p,{children:["Again, please create a feature request detailing the functionality you intend to add, and state that you would like to implement it. When creating commits, please follow the commit message format below. New feature pull requests should be made against the ",(0,i.jsx)(n.code,{children:"minor"})," branch."]}),"\n",(0,i.jsxs)(n.p,{children:["When adding new public APIs to support your new feature, add a ",(0,i.jsx)(n.code,{children:"@since 1.2.0"}),' tag (where "1.2.0" corresponds to what will be the next minor version) to the doc block. This will let readers of the documentation know the version in which the API was introduced. See the ',(0,i.jsx)(n.a,{href:"https://github.com/hyperse-io/track/blob/main/README.md",children:"docs readme"})," for more details on the valid docs tags."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-TypeScript",children:"/**\n * @description\n * Sets the value of the new API thing.\n *\n * @since 1.2.0\n */\nmyNewApi: number;\n"})}),"\n",(0,i.jsx)(n.h2,{id:"commit-message-format",children:"Commit message format"}),"\n",(0,i.jsxs)(n.p,{children:["This repo uses ",(0,i.jsx)(n.a,{href:"https://www.conventionalcommits.org",children:"Conventional Commits"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"type(scope): Message in present tense\n"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"type"})," may be one of:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"feat"})," (A new feature)"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"fix"})," (A bug fix)"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"docs"})," (Documentation only changes)"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"style"})," (Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc))"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"refactor"})," (A code change that neither fixes a bug nor adds a feature)"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"perf"})," (A code change that improves performance)"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"test"})," (Adding missing tests or correcting existing tests)"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"chore"})," (Other changes that don't modify src or test file)"]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"scope"})," indicates the package affected by the commit:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"website"}),"\n",(0,i.jsx)(n.li,{children:"core"}),"\n",(0,i.jsx)(n.li,{children:"common"}),"\n",(0,i.jsx)(n.li,{children:"etc."}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"If a commit affects more than one package, separate them with a comma:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:"fix(core,common): Fix the thing\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:"You can use `yarn g:cz` to interactively prompt you on how to commit.\n"})}),"\n",(0,i.jsx)(n.p,{children:"If a commit applies to no particular package (e.g. a tooling change in the root package.json), the scope can be omitted."}),"\n",(0,i.jsx)(n.h4,{id:"breaking-changes",children:"Breaking Changes"}),"\n",(0,i.jsxs)(n.p,{children:["If your contribution includes any breaking changes (including any backwards-incompatible changes; backwards-incompatible changes to current behavior), please include a ",(0,i.jsx)(n.code,{children:"BREAKING CHANGE"})," section in your commit message as per the ",(0,i.jsx)(n.a,{href:"https://www.conventionalcommits.org/en/v1.0.0/#commit-message-with-both-and-breaking-change-footer",children:"Conventional Commits specification"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Please also make your pull request against the ",(0,i.jsx)(n.code,{children:"major"})," branch rather than ",(0,i.jsx)(n.code,{children:"master"})," in the case of breaking changes."]}),"\n",(0,i.jsx)(n.p,{children:"Example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-shell",children:'feat(core): Add new field to Customer\n\nRelates to #123. This commit adds the "foo" field to the Custom entity.\n\nBREAKING CHANGE: A DB migration will be required in order to add the new "foo" field to the customer table.\n'})}),"\n",(0,i.jsx)(n.h4,{id:"linting",children:"Linting"}),"\n",(0,i.jsx)(n.p,{children:"Commit messages are linted on commit, so you'll know if your message is not quite right."}),"\n",(0,i.jsx)(n.h2,{id:"setting-up-the-dev-environment",children:"Setting up the dev environment"}),"\n",(0,i.jsxs)(n.p,{children:["After cloning the Hyperse repo, please follow the ",(0,i.jsx)(n.a,{href:"https://github.com/hyperse-io/track/blob/main/README.md#development",children:"Development guide"})," in the README for instructions on how to get up and running locally."]}),"\n",(0,i.jsx)(n.h2,{id:"contributor-license-agreement",children:"Contributor License Agreement"}),"\n",(0,i.jsxs)(n.p,{children:["All contributors are required to agree to the ",(0,i.jsx)(n.a,{href:"https://github.com/hyperse-io/.github/blob/main/license/CLA.md",children:"Contributor License Agreement"})," before their contributions can be merged."]}),"\n",(0,i.jsx)(n.p,{children:"This is done via an automation bot which will prompt you to sign the CLA when you open a pull request."})]})}function d(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},3023:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>c});var i=t(3696);const r={},s=i.createContext(r);function o(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);