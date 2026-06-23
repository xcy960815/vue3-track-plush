import { defineConfig } from 'vitepress';

const githubLink = 'https://github.com/xcy960815/vue3-track-plush';
const npmLink = 'https://www.npmjs.com/package/vue3-track-plush';

export default defineConfig({
  title: 'vue3-track-plush',
  description: 'Vue 3 tracking plugin powered by custom directives.',
  base: '/vue3-track-plush/',
  cleanUrls: true,
  lastUpdated: true,
  head: [['meta', { name: 'theme-color', content: '#0ea5e9' }]],
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      description: 'Vue 3 tracking plugin powered by custom directives.',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/guide/install' },
          { text: 'API', link: '/guide/api' },
          { text: 'Demo', link: '/guide/demo' },
          { text: 'npm', link: npmLink },
          { text: 'GitHub', link: githubLink },
        ],
        sidebar: [
          {
            text: 'Getting Started',
            items: [
              { text: 'Install', link: '/guide/install' },
              { text: 'API', link: '/guide/api' },
              { text: 'Online Demo', link: '/guide/demo' },
            ],
          },
        ],
        socialLinks: [
          { icon: 'github', link: githubLink },
        ],
        footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright © xuchongyu',
        },
      },
    },
    'zh-CN': {
      label: '简体中文',
      lang: 'zh-CN',
      description: '基于自定义指令的 Vue 3 埋点插件。',
      themeConfig: {
        nav: [
          { text: '指南', link: '/zh-CN/guide/install' },
          { text: 'API', link: '/zh-CN/guide/api' },
          { text: '演示', link: '/zh-CN/guide/demo' },
          { text: 'npm', link: npmLink },
          { text: 'GitHub', link: githubLink },
        ],
        sidebar: [
          {
            text: '开始使用',
            items: [
              { text: '安装', link: '/zh-CN/guide/install' },
              { text: 'API', link: '/zh-CN/guide/api' },
              { text: '在线演示', link: '/zh-CN/guide/demo' },
            ],
          },
        ],
        socialLinks: [
          { icon: 'github', link: githubLink },
        ],
        footer: {
          message: '基于 MIT 协议发布。',
          copyright: 'Copyright © xuchongyu',
        },
      },
    },
  },
  themeConfig: {
    logo: {
      text: 'vue3-track-plush',
    },
  },
  sitemap: {
    hostname: 'https://xcy960815.github.io/vue3-track-plush/',
  },
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
});
