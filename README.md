# Insight — 会员订阅网站

基于 Quizlet 设计系统的内容订阅网站 Demo，支持免费/付费内容分级访问与完整会员订阅流程。

## 项目结构

```
insight-membership/
├── index.html          # 主入口（单页面应用）
├── src/
│   ├── variables.css   # Design tokens
│   ├── styles.css      # 全部组件样式
│   ├── data.js         # 内容数据 & 定价配置
│   └── app.js          # 页面路由 & 交互逻辑
└── docs/               # 原始设计文件
```

## 快速开始

直接打开 index.html 即可本地预览，无需构建工具。

## 设计系统

基于 Quizlet 设计语言：
- 主色 #4255ff (Iris Bolt)
- 页面背景 #f6f7fb (Chalk Canvas)
- 卡片背景 #ffffff (Paper White)
- 200px pill 形主按钮
- DM Sans 字体

## 部署

推送到 main 分支后，在仓库 Settings → Pages → Source 选 GitHub Actions 即可自动部署。