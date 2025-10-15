# koishi-plugin-jx3Render

基于 Koishi 的剑网3图片渲染服务插件，用于将 HTML 模板渲染为图片。

## 📦 功能特性

- 🎨 **模板渲染**：基于 Handlebars 模板引擎，支持灵活的 HTML 模板定义
- 📸 **图片生成**：通过 Puppeteer 将 HTML 转换为高质量图片
- 💾 **缓存支持**：支持图片缓存功能，提高响应速度
- 🔌 **服务注入**：作为 Koishi 服务，可被其他插件调用
- 📋 **预置模板**：内置活动日历、名剑大会进度等常用模板

## 📥 安装

```bash
# npm
npm install koishi-plugin-jx3Render

# yarn
yarn add koishi-plugin-jx3Render
```

## 🔧 依赖

该插件依赖以下服务：

- `koishi-plugin-puppeteer`：用于网页截图

请确保在使用前已安装并启用 puppeteer 插件。

## 📖 使用方法

### 基础使用

```jsx
const data = {
  // 你的模板数据
};
// 渲染图片
const imageBase64 = await ctx.jx3Render.render(
  "templateName", // 模板名称
  data, // 模板数据
  "imageName", // 图片名称
  false // 是否使用缓存（可选，默认 false）
);
// 发送图片
return <img src="data:image/png;base64,${imageBase64}" />;
```

### 启用缓存

```typescript
const imageBase64 = await ctx.jx3Render.render(
  "celebs",
  data,
  "celebs-20231015",
  true // 启用缓存
);
```

当启用缓存时，如果已存在同名图片文件，将直接返回缓存的图片，不会重新渲染。

## 🛠 API 说明

### RenderService

#### render(templateName, data, imgName, isCache?)

渲染模板并生成图片。

**参数：**

- `templateName` (string)：模板名称，对应 `templates` 目录下的 `.hbs` 文件名（不含扩展名）
- `data` (any)：传递给模板的数据对象
- `imgName` (string)：生成图片的文件名（不含扩展名）
- `isCache` (boolean)：是否使用缓存，默认 `false`

**返回：**

- `Promise<string>`：返回图片的 Base64 编码字符串

**示例：**

```typescript
const base64Image = await ctx.jx3Render.render(
  'ActiveList',
  { data: [...] },
  'activity-calendar',
  true
);
```

### 模板建议

- 使用内联样式或 `<style>` 标签，避免外部 CSS 文件
- 考虑图片宽度，建议设置合理的视口宽度
- 使用中文字体确保文字渲染正常
- 注意响应式设计以适应不同内容长度

## ⚙️ 配置

当前版本暂无配置项。

## 📂 目录结构

```
koishi-plugin-jx3Render/
├── src/
│   └── index.ts          # 主要源代码
├── templates/            # 模板目录
│   ├── ActiveList.hbs    # 活动日历模板
│   └── celebs.hbs        # 楚天社或云从社模板
├── screenshot/           # 图片缓存目录（自动生成）
├── package.json
├── tsconfig.json
└── readme.md
```

## 🔍 技术栈

- [Koishi](https://koishi.chat/)：机器人框架
- [Handlebars](https://handlebarsjs.com/)：模板引擎
- [Puppeteer](https://pptr.dev/)：网页截图工具

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📮 相关链接

- [Koishi 官方文档](https://koishi.chat/)
- [Handlebars 文档](https://handlebarsjs.com/)
- [Puppeteer 文档](https://pptr.dev/)

---

Made with ❤️ for 剑网3玩家
