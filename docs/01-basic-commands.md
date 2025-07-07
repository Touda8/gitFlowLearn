# Git 基础命令详解

## 1. 仓库初始化和配置

### git init
```bash
git init
```
**作用**：在当前目录创建一个新的 Git 仓库
**场景**：创建新项目时使用

### git config
```bash
# 配置用户信息（全局）
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 配置用户信息（仅当前仓库）
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 查看配置
git config --list
git config user.name
```

### git clone
```bash
git clone <repository-url>
git clone <repository-url> <directory-name>
```
**作用**：从远程仓库克隆项目到本地

## 2. 基本文件操作

### git add
```bash
git add <file>           # 添加单个文件
git add .                # 添加所有文件
git add *.js             # 添加所有 .js 文件
git add -A               # 添加所有更改（包括删除）
git add -u               # 只添加已跟踪文件的更改
```

### git commit
```bash
git commit -m "提交信息"
git commit -a -m "提交信息"    # 自动添加已跟踪文件并提交
git commit --amend           # 修改最后一次提交
```

### git status
```bash
git status              # 查看完整状态
git status -s           # 简短格式
```

### git diff
```bash
git diff                # 工作区与暂存区的差异
git diff --cached       # 暂存区与最后一次提交的差异
git diff HEAD           # 工作区与最后一次提交的差异
git diff <commit1> <commit2>  # 两次提交的差异
```

### git log
```bash
git log                 # 查看提交历史
git log --oneline       # 一行显示一个提交
git log --graph         # 图形化显示
git log -p              # 显示每次提交的差异
git log --author="name" # 显示特定作者的提交
git log --since="2 weeks ago"  # 显示最近两周的提交
```

## 3. 远程仓库基础概念

### 远程仓库名称 (Remote Name)
```bash
# 查看远程仓库
git remote              # 列出所有远程仓库名称
git remote -v           # 显示远程仓库名称和URL

# 添加远程仓库
git remote add <name> <url>
git remote add origin https://github.com/username/repo.git

# 重命名远程仓库
git remote rename <old-name> <new-name>
git remote rename origin upstream
```

**重要概念**：
- **`origin`** - 默认的远程仓库名称，通常指向您的主要远程仓库
- **`upstream`** - 常用于指向原始仓库（fork时使用）
- 您可以有多个远程仓库，每个都有不同的名称

### 分支概念 (Branch)
```bash
# 查看分支
git branch              # 查看本地分支
git branch -r           # 查看远程分支
git branch -a           # 查看所有分支

# 查看当前分支
git branch --show-current
```

**重要概念**：
- **`main`** - 主分支名称（新标准）
- **`master`** - 主分支名称（旧标准）
- **`develop`** - 开发分支
- **`feature/xxx`** - 功能分支

### git push 命令详解
```bash
# 基本推送语法
git push <remote-name> <branch-name>

# 常用推送命令
git push origin main                    # 推送main分支到origin远程仓库
git push origin feature/user-login     # 推送功能分支
git push -u origin main                # 推送并设置上游分支
git push --set-upstream origin main    # 同上，完整写法

# 推送所有分支
git push origin --all

# 推送标签
git push origin --tags
```

**命令解析**：
- `git push origin main` = "将本地main分支推送到origin远程仓库"
- `origin` → 远程仓库名称（别名）
- `main` → 本地分支名称
- `-u` 或 `--set-upstream` → 设置上游分支，下次可直接使用 `git push`

### 实际示例
```bash
# 1. 查看当前远程仓库
git remote -v
# 输出：origin  https://github.com/Touda8/gitFlowLearn.git (fetch)
#      origin  https://github.com/Touda8/gitFlowLearn.git (push)

# 2. 查看当前分支
git branch --show-current
# 输出：main

# 3. 推送到远程仓库
git push origin main
# 含义：将本地main分支推送到origin(GitHub)远程仓库

# 4. 设置上游分支后，可简化命令
git push -u origin main    # 第一次推送
git push                   # 之后可直接使用
```

## 实践练习
1. 创建一个新文件
2. 将文件添加到暂存区
3. 提交更改
4. 查看提交历史
