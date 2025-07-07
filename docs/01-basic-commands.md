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

## 实践练习
1. 创建一个新文件
2. 将文件添加到暂存区
3. 提交更改
4. 查看提交历史
