# 🌍 Global Logistics Query Engine (FedEx Employee Tool)

**Current Version:** v6.0 Final (Unified Edition)  
**Live Demo:** [点击这里查看网页效果](https://你的用户名.github.io/global-shipping-guide/)  
*(请将上面的链接替换为你自己的 GitHub Pages 链接)*

## 📖 项目简介 (Introduction)

这是一个专为跨境物流从业者（及 FedEx 员工）打造的**轻量级、实时物流政策查询引擎**。它解决了日常工作中“查税率难、查违禁品慢、算成本繁琐”的痛点。

核心功能包括：
1.  **多国数据覆盖：** 包含欧美澳（US, UK, EU, AU）及东南亚/中东（VN, MY, ID, SA, AE）等 13 个热门国家。
2.  **智能税费模拟：** 内置计算引擎，自动识别马来西亚 LVG 税、印尼保护性关税等复杂逻辑。
3.  **合规避坑指南：** 针对佛牌、电子烟、锂电池等敏感货物提供实时警告。
4.  **极速分享：** 支持一键复制查询结果，并通过 URL 参数分享特定国家页面。

## 🛠️ 技术栈 (Tech Stack)

* **HTML5** - 语义化结构
* **Tailwind CSS** - 现代极简 UI 设计
* **Vanilla JavaScript (ES6)** - 无依赖的核心逻辑引擎
* **GitHub Pages** - 免费托管部署

## 🚀 快速开始 (Quick Start)

1.  克隆本仓库：
    ```bash
    git clone [https://github.com/你的用户名/global-shipping-guide.git](https://github.com/你的用户名/global-shipping-guide.git)
    ```
2.  直接双击打开 `index.html` 即可在本地运行。

## 📂 文件结构 (File Structure)

* `index.html` - 网页入口（骨架）
* `data.js` - 核心数据库（所有国家政策、汇率都在这里修改）
* `script.js` - 业务逻辑（计算器、页面渲染、交互逻辑）
* `styles.css` - 自定义样式表

## 💡 使用技巧

* **分享美国数据：** 发送链接 `.../index.html?country=US`
* **分享电子产品发往印尼：** 发送链接 `.../index.html?country=ID&cat=Electronics`

## ⚠️ 免责声明

本项目数据仅供参考，海关政策实时变化，请以官方最新条例为准。

---
*Built with ❤️ by a FedEx Employee & AI Assistant.*
