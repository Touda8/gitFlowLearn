# Git Flow 工作流详解

## Git Flow 简介

Git Flow 是一个基于 Git 分支模型的工作流程，由 Vincent Driessen 提出。它定义了一个严格的分支模型，围绕项目发布来设计。

## 分支类型

### 1. 主分支（Main Branches）
- **main/master**：主分支，存储正式发布的历史
- **develop**：开发分支，作为功能分支的集成分支

### 2. 辅助分支（Supporting Branches）
- **feature**：功能分支，用于开发新功能
- **release**：发布分支，用于准备新的生产版本
- **hotfix**：热修复分支，用于快速修复生产版本的问题

## Git Flow 分支流程图

```
main     ●─────●─────●─────●─────●
           ╲     ╲     ╲     ╲
develop     ●─────●─────●─────●───●
             ╲   ╱ ╲   ╱ ╲   ╱
feature       ●─●   ●─●   ●─●
```

## 安装 Git Flow

### Windows
```bash
# 使用 Git for Windows（已包含）
git flow

# 或者下载 gitflow-avh
# https://github.com/petervanderdoes/gitflow-avh
```

### 其他系统
```bash
# macOS (使用 Homebrew)
brew install git-flow-avh

# Ubuntu/Debian
sudo apt-get install git-flow

# CentOS/RHEL
sudo yum install gitflow
```

## Git Flow 命令详解

### 初始化
```bash
git flow init
```
这个命令会：
- 创建 develop 分支
- 设置分支命名约定
- 配置 Git Flow

### 功能分支（Feature）
```bash
# 开始新功能
git flow feature start <feature-name>

# 完成功能（合并到 develop 并删除功能分支）
git flow feature finish <feature-name>

# 发布功能分支到远程
git flow feature publish <feature-name>

# 获取远程功能分支
git flow feature pull origin <feature-name>
```

### 发布分支（Release）
```bash
# 开始新发布
git flow release start <version>

# 完成发布（合并到 main 和 develop，创建标签）
git flow release finish <version>

# 发布到远程
git flow release publish <version>
```

### 热修复分支（Hotfix）
```bash
# 开始热修复
git flow hotfix start <version>

# 完成热修复（合并到 main 和 develop，创建标签）
git flow hotfix finish <version>
```

## Git Flow 实践示例

### 1. 项目初始化
```bash
# 初始化仓库
git init
git remote add origin <repository-url>

# 初始化 Git Flow
git flow init

# 推送 develop 分支
git push -u origin develop
```

### 2. 开发新功能
```bash
# 开始功能开发
git flow feature start user-authentication

# 开发过程中的提交
git add .
git commit -m "添加用户认证模块"
git commit -m "添加密码加密功能"

# 完成功能开发
git flow feature finish user-authentication
```

### 3. 准备发布
```bash
# 开始发布准备
git flow release start 1.0.0

# 发布准备工作（bug修复、文档更新等）
git add .
git commit -m "更新版本号到 1.0.0"
git commit -m "修复发布前的小问题"

# 完成发布
git flow release finish 1.0.0
```

### 4. 紧急修复
```bash
# 开始热修复
git flow hotfix start 1.0.1

# 修复问题
git add .
git commit -m "修复登录验证漏洞"

# 完成热修复
git flow hotfix finish 1.0.1
```

## Git Flow vs 其他工作流

### GitHub Flow
- 更简单，只有一个主分支
- 适合持续部署的项目
- 功能分支直接合并到主分支

### GitLab Flow
- 结合了 Git Flow 和 GitHub Flow
- 支持环境分支（staging, production）
- 更适合复杂的部署流程

## 最佳实践

1. **分支命名规范**
   - feature/功能描述
   - release/版本号
   - hotfix/修复描述

2. **提交信息规范**
   - 使用清晰的提交信息
   - 遵循约定式提交规范

3. **代码审查**
   - 功能分支合并前进行代码审查
   - 使用 Pull Request/Merge Request

4. **自动化**
   - CI/CD 流水线
   - 自动化测试
   - 自动化部署
