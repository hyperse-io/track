import React from 'react';
import UmlImageUrlDark from '@site/static/img/uml-dark.png';
import UmlImageUrlLight from '@site/static/img/uml-light.png';

export default function Index() {
  return (
    <div className="bg-[#66757f1a] dark:bg-[#66757f1a] rounded">
      <img
        alt=""
        src={UmlImageUrlDark}
        width={'100%'}
        height={'100%'}
        className="hidden dark:block"
      />
      <img
        alt=""
        src={UmlImageUrlLight}
        width={'100%'}
        height={'100%'}
        className="block dark:hidden"
      />
    </div>
  );
}
