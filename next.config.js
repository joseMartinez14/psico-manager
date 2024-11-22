// next.config.mjs

module.exports = {
  async headers() {
    return [
      {
        source: '/admin/availability',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ]
  },
}