# 六一儿童节祝福页 · 糖果字符雨

一份送给各位姐姐们的六一儿童节互动祝福页面。采用少女风马卡龙配色，背景为糖果色字符雨动画，支持将自定义文字投入雨中一起飘落。

## 预览效果

- 浅色渐变背景 + 漂浮爱心、星星装饰
- 顶部祝福卡片与中央寄语
- 底部输入框：输入的文字会汇入字符雨

## 项目结构

```
AI_test/
├── AI.html    # 页面结构与内容
├── AI.css     # 样式与动画
├── AI.js      # 字符雨画布与交互逻辑
└── README.md  # 项目说明（本文件）
```

| 文件 | 职责 |
|------|------|
| `AI.html` | 定义 DOM 结构，引入样式表与脚本 |
| `AI.css` | 少女风视觉、布局、关键帧动画 |
| `AI.js` | Canvas 字符雨渲染、窗口自适应、文字池与输入交互 |

## 快速开始

### 方式一：直接打开（推荐）

确保 `AI.html`、`AI.css`、`AI.js` 位于同一目录，双击或在浏览器中打开：

```
AI.html
```

### 方式二：本地静态服务

若需通过 HTTP 访问（避免部分浏览器对 `file://` 的限制），可在项目目录执行：

```bash
# Python 3
python -m http.server 8080

# 或 Node.js（需已安装 npx）
npx serve .
```

浏览器访问：`http://localhost:8080/AI.html`

## 功能说明

### 祝福文案

页面默认展示：

> 送给各位姐姐们，祝各位姐姐们六一儿童节快乐！

### 字符雨

- 使用 Canvas 绘制下落字符，带拖尾渐变
- 部分列为「祝福列」，从文字池中随机取字，颜色为粉、紫、蓝、绿等马卡龙色
- 其余列为装饰符号（♡、★、✿、假名等）

默认文字池（可在 `AI.js` 中修改 `rainPool`）：

```
送给各位姐姐们祝各位姐姐们六一儿童节快乐永远的好朋友甜甜哒
```

### 互动输入

1. 在底部输入框填写祝福（最多 80 字）
2. 点击 **「丢进雨里 ♡」** 或按 **Enter**
3. 输入内容会追加到 `rainPool`，随后在祝福列中随机出现

## 技术栈

- 纯前端：HTML5 + CSS3 + 原生 JavaScript
- 无构建工具、无第三方框架依赖
- 字体：[站酷快乐体](https://fonts.google.com/)（Google Fonts，需联网；离线时回退至系统字体）

## 自定义指南

### 修改祝福文字

编辑 `AI.html` 中 `.opening-dedication`、`.love-message` 区域的文案即可。

### 修改默认字符雨内容

编辑 `AI.js` 顶部的 `rainPool` 字符串：

```javascript
let rainPool = '你的祝福文字…';
```

### 调整配色与风格

在 `AI.css` 中修改：

- `body` 背景渐变
- `.opening-dedication`、`.rain-input-panel` 等组件样式
- `@keyframes` 动画

在 `AI.js` 中修改：

- `pastelHead` / `pastelTail`：字符雨颜色
- `fontSize`、`setInterval(draw, 38)`：字号与刷新频率

## 浏览器兼容性

支持现代浏览器（Chrome、Edge、Firefox、Safari 等）。需支持：

- Canvas 2D API
- CSS `clamp()`、渐变、`backdrop-filter`（部分旧版浏览器可能无磨砂效果）

## 许可

仅供个人祝福与学习使用，可自由修改与分享。
