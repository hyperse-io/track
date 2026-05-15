import Image from 'next/image';
import { SITE_BASE_PATH } from '@/config/site';
import { Icon } from '@iconify/react';

const copyrightYear = new Date().getFullYear();

export const SiteFooter = () => {
  return (
    <footer className="border-t border-white/10 bg-[#020617] pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <Image
                src={`${SITE_BASE_PATH}/logo.svg`}
                alt="Hyperse Track"
                width={28}
                height={28}
                className="h-7 w-7 shrink-0"
              />
              <span className="text-xl font-bold text-white">Track</span>
            </div>
            <p className="mb-4 text-sm text-gray-500">
              A typed, smart, scalable data collection engine for modern web
              applications—by Hyperse.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/hyperse-io"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Icon icon="mdi:github" className="size-6" />
              </a>
              <a
                href="https://x.com/hyperse_net"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Icon icon="mdi:twitter" className="size-6" />
              </a>
              <a
                href="https://www.hyperse.net/community"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Icon icon="mdi:discord" className="size-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Docs</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href={`${SITE_BASE_PATH}/guide/introduction`}
                  className="transition-colors hover:text-cyan-400"
                >
                  Introduction
                </a>
              </li>
              <li>
                <a
                  href={`${SITE_BASE_PATH}/guide/installation`}
                  className="transition-colors hover:text-cyan-400"
                >
                  Installation
                </a>
              </li>
              <li>
                <a
                  href={`${SITE_BASE_PATH}/plugins/google-adapter`}
                  className="transition-colors hover:text-cyan-400"
                >
                  Premium plugins
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="https://www.npmjs.com/package/@hyperse/track"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-cyan-400"
                >
                  npm
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/hyperse-io/track"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-cyan-400"
                >
                  Repository
                </a>
              </li>
              <li>
                <a
                  href="https://www.hyperse.net/blog"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-cyan-400"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Related</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="https://hyperse-io.github.io/pipeline/"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-cyan-400"
                >
                  Hyperse Pipeline
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/hyperse-io"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-cyan-400"
                >
                  Hyperse org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-sm text-gray-600">
            © {copyrightYear} Hyperse Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
