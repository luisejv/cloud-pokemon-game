/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.pokemon.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  output: "export",
};

export default nextConfig;
