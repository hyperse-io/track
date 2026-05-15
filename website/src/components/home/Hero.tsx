'use client';

import type { ButtonHTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, BarChart3, Layers, Zap } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
};

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles =
    'cursor-pointer inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary:
      'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] border border-transparent',
    secondary:
      'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };
  return (
    <button
      type="button"
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Hero = () => {
  const route = useRouter();
  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-28">
      <div className="pointer-events-none absolute top-0 left-1/2 z-0 h-full w-full max-w-7xl -translate-x-1/2">
        <div className="absolute top-20 left-1/4 h-96 w-96 animate-pulse-slow rounded-full bg-cyan-500/20 blur-[100px]" />
        <div
          className="absolute right-1/4 bottom-20 h-96 w-96 animate-pulse-slow rounded-full bg-purple-500/20 blur-[100px]"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1">
              <span className="flex h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
              <span className="text-xs font-semibold tracking-wide text-cyan-300 uppercase">
                TypeScript · Adapters · Events
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
              <span className="block text-white">Typed, smart</span>
              <span className="block animate-gradient-x bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text pb-2 text-transparent">
                front-end data collection
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-gray-400 lg:mx-0">
              <strong className="text-gray-200">@hyperse/track</strong> is a
              scalable analytics engine for web apps—strong typing, adapter
              plugins for Google, Facebook, and Klaviyo, and a unified event
              API.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button
                size="lg"
                className="group w-full sm:w-auto"
                onClick={() => route.push('/guide/installation')}
              >
                Get started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => route.push('/guide/introduction')}
              >
                Read documentation
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-500 lg:justify-start">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span>Strong typing &amp; inference</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-blue-400" />
                <span>Google · Facebook · Klaviyo</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-green-400" />
                <span>Standard &amp; custom events</span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-lg flex-1 lg:max-w-none">
            <div className="relative animate-float">
              <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-cyan-500 to-purple-600 opacity-30 blur" />
              <div className="relative">
                <CodeBlock code="npm install @hyperse/track --save" />

                <div className="absolute -right-4 -bottom-4 hidden rounded-xl border border-white/10 p-4 shadow-2xl glass-panel sm:-right-6 sm:-bottom-6 sm:block">
                  <div className="mb-2 flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-green-400" />
                    <span className="font-mono text-xs text-gray-400">
                      purchase event
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-lg font-bold text-white">
                      GA4 + Meta + Klaviyo
                    </span>
                    <span className="text-xs font-medium text-green-400">
                      synced · typed payload
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
