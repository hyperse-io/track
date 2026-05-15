import {
  BarChart3,
  Layers,
  Lightbulb,
  Puzzle,
  ShieldCheck,
  Zap,
} from 'lucide-react';

const features = [
  {
    title: 'Typed',
    description:
      'Built with TypeScript for strong typing and inference—catch errors during development and keep event payloads consistent across adapters.',
    icon: ShieldCheck,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/20',
  },
  {
    title: 'Smart',
    description:
      'Intelligent collection strategies adapt to user behavior and data changes so events stay accurate and timely without overloading the client.',
    icon: Lightbulb,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
  },
  {
    title: 'Scalable',
    description:
      'From SPAs to large storefronts, Track scales with modular adapters and builders that grow with your analytics surface area.',
    icon: BarChart3,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/20',
  },
  {
    title: 'Powerful',
    description:
      'Unified APIs for standard commerce events plus platform-specific payloads for Google Analytics, Meta, and Klaviyo.',
    icon: Zap,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/20',
  },
  {
    title: 'Front-end friendly',
    description:
      'Lightweight client footprint designed to collect data without hurting page load or interaction performance.',
    icon: Layers,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
  },
  {
    title: 'Easy integration',
    description:
      'Composable BaseAdapter, AdapterBuilder, and TrackBuilder APIs integrate cleanly with React and other modern stacks.',
    icon: Puzzle,
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    border: 'border-red-400/20',
  },
];

export const HomeFeatures = () => {
  return (
    <section id="features" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute top-1/2 left-0 h-1/2 w-1/3 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            <span className="bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Why teams choose Track
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            One engine for typed events, premium adapters, and documentation
            that matches how you ship analytics in production.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-white/5 p-8 glass-panel transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              <div
                className={`mb-6 flex h-12 w-12 items-center justify-center rounded-lg border ${feature.bg} ${feature.border} transition-transform duration-300 group-hover:scale-110`}
              >
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white transition-colors group-hover:text-cyan-400">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
