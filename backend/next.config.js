/** @type {import('next').NextConfig} */
module.exports = {
    target: 'serverless',
    experimental: { nftTracing: true },
    serverRuntimeConfig: {
        PROJECT_ROOT: __dirname
    }
}