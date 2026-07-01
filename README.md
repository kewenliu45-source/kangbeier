# 康贝儿

专业的生殖健康服务平台官网

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: TailwindCSS 4
- **UI 组件**: Shadcn UI
- **CMS**: Sanity (待接入)
- **包管理器**: npm

## 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd 康贝儿
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制环境变量示例文件并填入真实值：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，配置以下环境变量：

| 变量名 | 说明 | 是否必填 |
|--------|------|----------|
| `NEXT_PUBLIC_SITE_URL` | 站点 URL | 是 |
| `NEXT_PUBLIC_SITE_NAME` | 站点名称 | 是 |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity 项目 ID | 否（Phase 4 配置） |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity 数据集 | 否（Phase 4 配置） |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API 版本 | 否（Phase 4 配置） |
| `SANITY_API_READ_TOKEN` | Sanity 读取 Token | 否（Phase 4 配置） |
| `CONTACT_NOTIFICATION_EMAIL` | 联系表单通知邮箱 | 否 |
| `SMTP_HOST` | SMTP 服务器地址 | 否 |
| `SMTP_PORT` | SMTP 端口 | 否 |
| `SMTP_USER` | SMTP 用户名 | 否 |
| `SMTP_PASSWORD` | SMTP 密码 | 否 |
| `WECHAT_WEBHOOK_URL` | 企业微信 Webhook URL | 否 |
| `FEISHU_WEBHOOK_URL` | 飞书 Webhook URL | 否 |
| `NEXT_PUBLIC_BAIDU_ANALYTICS_ID` | 百度统计 ID | 否 |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | 否 |

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看效果。

## 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 生产构建 |
| `npm start` | 启动生产服务器 |
| `npm run lint` | ESLint 检查 |
| `npm run typecheck` | TypeScript 类型检查 |
| `npm run format` | Prettier 格式化 |
| `npm run format:check` | Prettier 格式检查 |

## 项目结构

```
康贝儿/
├── app/                    # Next.js App Router 页面
│   ├── globals.css         # 全局样式
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页
│   ├── services/           # 服务项目页面
│   ├── advantages/         # 试管优势页面
│   ├── knowledge/          # 科普中心页面
│   └── contact/            # 联系我们页面
├── components/             # 组件
│   ├── layout/             # 布局组件
│   │   ├── header.tsx      # 顶部导航
│   │   ├── footer.tsx      # 页脚
│   │   └── page-container.tsx  # 页面容器
│   └── ui/                 # Shadcn UI 组件
├── lib/                    # 工具函数
│   ├── utils.ts            # 通用工具
│   └── env.ts              # 环境变量工具
├── public/                 # 静态资源
├── .env.example            # 环境变量示例
├── components.json         # Shadcn UI 配置
├── next.config.ts          # Next.js 配置
├── tailwind.config.ts      # Tailwind 配置
└── tsconfig.json           # TypeScript 配置
```

## 环境变量使用

在代码中使用环境变量：

```typescript
import { env, isSanityConfigured } from "@/lib/env";

// 使用环境变量
console.log(env.NEXT_PUBLIC_SITE_NAME);

// 检查配置是否完整
if (isSanityConfigured()) {
  // 使用 Sanity
}
```

## 部署

### Vercel 部署

1. 在 Vercel 中导入项目
2. 配置环境变量
3. 部署

### 其他平台

```bash
npm run build
npm start
```

## 开发规范

- 使用 TypeScript 严格模式
- 遵循 ESLint 和 Prettier 规范
- 组件使用 Shadcn UI 作为基础
- 样式使用 TailwindCSS
- 路径别名使用 `@/*`

## 许可证

© 2024 康贝儿. All rights reserved.
