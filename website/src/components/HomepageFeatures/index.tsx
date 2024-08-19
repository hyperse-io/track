import React from 'react';
import bars from '@site/static/img/bars.svg';
import browser from '@site/static/img/browser.svg';
import lightbulb from '@site/static/img/lightbulb.svg';
import muscle from '@site/static/img/muscle.svg';
import puzzle from '@site/static/img/puzzle.svg';
import shield from '@site/static/img/shield.svg';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Typed',
    Svg: shield,
    description: (
      <>
        <p>
          Leveraging TypeScript's static type checking, Hyperse ensures that
          most errors are caught during development, reducing runtime issues and
          enhancing the robustness and stability of front-end code.
        </p>
        <p>
          The strong typing system also aids developers in faster code
          completion, refactoring, and debugging, thereby increasing development
          efficiency.
        </p>
      </>
    ),
  },
  {
    title: 'Smart',
    Svg: lightbulb,
    description: (
      <>
        <p>
          Hyperse integrates intelligent data collection strategies that
          automatically optimize the collection process based on user behavior,
          data changes, and network conditions, ensuring real-time data accuracy
          and timeliness.
        </p>
        <p>
          It supports dynamic configuration, allowing the adjustment of
          collection strategies to meet performance needs across different
          front-end scenarios.
        </p>
      </>
    ),
  },
  {
    title: 'Scalable',
    Svg: bars,
    description: (
      <>
        <p>
          Optimized for large-scale front-end data collection tasks, Hyperse
          efficiently gathers necessary data whether in single-page applications
          (SPA) or multi-page applications.
        </p>
        <p>
          Its modular design allows developers to extend and adjust collection
          features as needed, ensuring scalability to accommodate future
          requirements.
        </p>
      </>
    ),
  },

  {
    title: 'Powerful',
    Svg: muscle,
    description: (
      <>
        <p>
          Supports multiple data sources and formats, including browser APIs,
          user inputs, DOM elements, and network requests, covering a wide range
          of front-end data collection scenarios.
        </p>
        <p>
          Offers flexible configuration options, enabling developers to
          customize collection frequency, data formats, filtering rules, and
          more, catering to specific application needs.
        </p>
        <p>
          Integrated with basic data cleansing functionalities, ensuring the
          collected data is accurate and consistent.
        </p>
      </>
    ),
  },

  {
    title: 'Front-End Friendly',
    Svg: browser,
    description: (
      <>
        <p>
          Designed with front-end performance and user experience in mind,
          Hyperse collects data without significantly impacting page load times
          or user interactions.
        </p>
        <p>
          Its lightweight design ensures smooth operation even on
          resource-constrained mobile devices.
        </p>
      </>
    ),
  },

  {
    title: 'Easy Integration',
    Svg: puzzle,
    description: (
      <>
        <p>
          Provides an intuitive API that simplifies integration with existing
          front-end frameworks and libraries such as React, Vue, and Angular.
        </p>
        <p>
          Supports real-time data transmission to backend systems or third-party
          services via Webhooks or other front-end communication methods,
          ensuring a smooth data flow.
        </p>
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <article className="relative from-primary-300/40 block p-[1px] h-full overflow-hidden rounded-md hover:brightness-90 transition-all cursor-pointer group from-gray-900 to-gray-950 hover:from-gray-800 hover:to-gray-950 hover:scale-110 duration-700">
      <div className="block overflow-hidden rounded-[inherit] h-full bg-[#66757f1a] dark:bg-[#66757f1a] p-8 transition-all">
        <h3 className="text-2xl font-bold text-[var(--ifm-font-color-base)] dark:text-white flex flex-row items-center gap-2 ">
          <Svg />
          {title}
        </h3>
        <div className="mt-2">
          <div className="mb-4 text-gray-600 dark:text-gray-400 ">
            {description}
          </div>
        </div>
      </div>

      <div className="h-2 w-full bg-gradient-to-l via-yellow-500 group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0"></div>
      <div className="h-0.5 group-hover:w-full bg-gradient-to-l  via-yellow-950 group-hover:via-yellow-500 w-[0%] m-auto rounded transition-all"></div>
    </article>
  );
}

export default function HomepageFeatures() {
  return (
    <div className="container">
      <section className={styles.features}>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </section>
    </div>
  );
}
