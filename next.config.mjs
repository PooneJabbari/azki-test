/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sign-up",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
