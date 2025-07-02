module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'neon-blue': ' #00f0ff',
        'neon-purple': ' #a259ff',
        'neon-pink': ' #ff00e6',
        'neon-cyan': ' #00fff7',
        'neon-green': ' #00ffb2',
        'neon-bg-dark': ' #18192a',
      },
      boxShadow: {
        'neon': '0 0 24px 4pxrgb(12, 216, 231), 0 0 48px 8px rgba(142, 54, 186, 0.82)',
      },
    },
  },
  plugins: [],
}
