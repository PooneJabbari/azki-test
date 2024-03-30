/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sign-up",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
