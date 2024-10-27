import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/MyBlog/',
  title: "Polaris",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },

      {
        text: '通用工具',
        items: [
          {text: '软件工具', link: '/MyKnowledgeBase/tutorial/general/tools'},
          {text: '脚本工具', link: '/MyKnowledgeBase/tutorial/general/scripts'},
        ]
      },    

      {
        text: '视觉',
        items: [
          {text: '工具及插件', link: '/MyKnowledgeBase/tutorial/Visual/PlugIn'},
          {text: '图片网址', link: '/MyKnowledgeBase/tutorial/Visual/CollectURL'},
        ]
      },

      {
        text: '文本',
        items: [
          {text: '工具及插件', link: '/MyKnowledgeBase/tutorial/Text/PlugIn'},
          {text: '脚本工具', link: '/MyKnowledgeBase/tutorial/Text/scripts'},
        ]
      },      

      {
        text: '语音',
        items: [
          {text: '工具及插件', link: '/MyKnowledgeBase/tutorial/Speech/Tool'},
          {text: '脚本工具', link: '/MyKnowledgeBase/tutorial/Speech/scripts'},
        ]
      },     

      {
        text: 'Python',
        items: [
          {text: '本地脚本', link: '/MyKnowledgeBase/python/Local'},
          {text: '联网脚本', link: '/MyKnowledgeBase/python/Network.md'},
        ]
      },



    ],

    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },


    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
