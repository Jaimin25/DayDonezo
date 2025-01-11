// next.config.ts
import withPWA from './next-pwa.config';

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
});

export default nextConfig;
