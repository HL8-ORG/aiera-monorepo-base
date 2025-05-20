# monorepo 共享shadcn-ui的基础组件

## 需求

我们希望在一个monorepo内的项目能够共享一个shadcn-ui的基础组件库，而不是在各子项目内分别安装和存放shadcn-ui的代码，避免依赖和代码冗余。

## 方法

这里很关键的一个环节就是`components.json`文件的配置：

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@hl8/ui/components",
    "utils": "@hl8/ui/lib/utils",
    "ui": "@hl8/ui/components/ui",
    "lib": "@hl8/ui/lib",
    "hooks": "@hl8/ui/hooks"
  },
  "iconLibrary": "lucide"
}
```
这份配置文件关系到`shadcn`命令行（`cli`）的使用，例如组件安装等，同时，还会影响到tailwindcss的使用。

首先是别名部分
```json
"aliases": {
    "components": "@hl8/ui/components",
    "utils": "@hl8/ui/lib/utils",
    "ui": "@hl8/ui/components/ui",
    "lib": "@hl8/ui/lib",
    "hooks": "@hl8/ui/hooks"
  },
  ```
  这些别名的定义将作为变量，保障组件安装时，组件中代码对`utils`文件的引用，同时，也决定了组件代码被放置的位置。
然后，就是tailwindcss部分的设置，这决定了外部子项目使用时能否获得正确的样式。
