## 构建前准备工作

安装全局安装 lerna（monorepo包管理工具），commitizen（规范化git提交插件）

```shell
yarn global add lerna commitizen
```

## 命令说明

```json
"scripts": {
    //删除项目下所有 node_modules，并重新安装依赖
    "bootstrap": "bash scripts/bootstrap.sh",
    // 打包项目
    "build": "lerna run build",
    // 规范化提交git commit
    "commit": "git add . && cz",
    // 打标签并提交git
    "lt": "lerna version",
    //打标签、提交git、发布版本
    "lp": "lerna publish  --create-release github",
    "test": "lerna run test"
}
```