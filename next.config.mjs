/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "", // leave empty unless you’re using a custom port
        pathname: "/**", // allow all paths under Cloudinary
      },
    ],
  },
};

export default nextConfig;
