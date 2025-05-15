import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AI ERA",
  titleTemplate: 'AI ERA | :title',
  description: "A VitePress Site",

  base: '/docs/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'IDE', link: '/cursor/index' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'IDE',
        items: [
          { text: '概述', link: '/cursor/index' },
          { text: '扩展', link: '/cursor/extensions' },
          { text: '规则', link: '/cursor/rules' },
        ]
      },
      {
        text: 'monorepo',
        items: [
          { text: 'monorepo', link: '/monorepo/index' }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
