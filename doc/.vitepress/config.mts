import { defineConfig } from "vitepress";

export default defineConfig({
  title: "剑网3机器人使用手册",
  description: "JX3 Help Bot 用户使用指南",
  lang: "zh-CN",

  head: [["link", { rel: "icon", href: "/favicon.ico" }]],

  themeConfig: {
    logo: "/logo.png",

    nav: [
      { text: "首页", link: "/" },
      { text: "使用指南", link: "/guide/getting-started" },
      { text: "常见问题", link: "/faq" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "入门",
          items: [{ text: "快速开始", link: "/guide/getting-started" }],
        },
        {
          text: "功能指南",
          items: [
            { text: "日常活动查询", link: "/guide/daily" },
            { text: "角色与战绩", link: "/guide/character" },
            { text: "奇遇与宠物", link: "/guide/adventure" },
            { text: "交易与物价", link: "/guide/trade" },
            { text: "阵营与帮会", link: "/guide/faction" },
            { text: "其他功能", link: "/guide/misc" },
          ],
        },
        {
          text: "管理员设置",
          items: [{ text: "播报订阅", link: "/guide/broadcast" }],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/abandon-jw3/jx3-help" }],

    footer: {
      message: "基于 Koishi 框架开发",
      copyright: "Copyright © 2024 JX3 Help",
    },

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

    outline: {
      label: "页面导航",
      level: [2, 3],
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    lastUpdated: {
      text: "最后更新于",
    },
  },
});
