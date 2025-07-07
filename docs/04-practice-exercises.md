# Git 实践练习

## 练习 1：基础文件操作

### 目标
熟悉 Git 的基本文件操作命令

### 步骤
1. 创建一个新文件 `hello.txt`
2. 添加内容："Hello, Git!"
3. 将文件添加到暂存区
4. 提交更改
5. 查看提交历史

### 命令示例
```bash
echo "Hello, Git!" > hello.txt
git add hello.txt
git commit -m "添加 hello.txt 文件"
git log --oneline
```

## 练习 2：分支操作

### 目标
学习分支的创建、切换和合并

### 步骤
1. 创建并切换到新分支 `feature/greeting`
2. 修改 `hello.txt` 文件内容
3. 提交更改
4. 切换回主分支
5. 合并功能分支
6. 删除功能分支

### 命令示例
```bash
git checkout -b feature/greeting
echo "Hello, Git World!" > hello.txt
git add hello.txt
git commit -m "更新问候信息"
git checkout main
git merge feature/greeting
git branch -d feature/greeting
```

## 练习 3：Git Flow 实践

### 目标
使用 Git Flow 开发一个简单功能

### 步骤
1. 初始化 Git Flow
2. 开始一个新功能 `calculator`
3. 创建简单的计算器文件
4. 完成功能开发
5. 开始发布准备
6. 完成发布

### 命令示例
```bash
git flow init
git flow feature start calculator
# 创建并编辑 calculator.py
git add calculator.py
git commit -m "添加基础计算器功能"
git flow feature finish calculator
git flow release start 1.0.0
git flow release finish 1.0.0
```

## 练习 4：Git Stash 暂存操作

### 目标
学习使用 git stash 管理临时更改

### 步骤
1. 修改 `hello.txt` 文件但不提交
2. 使用 `git stash` 暂存更改
3. 切换到其他分支进行紧急修复
4. 返回原分支并恢复暂存的更改
5. 提交最终更改

### 命令示例
```bash
# 修改文件
echo "临时修改内容" >> hello.txt
git status

# 暂存更改
git stash save "临时保存的修改"
git status

# 查看暂存列表
git stash list

# 进行其他工作...
git checkout -b hotfix/urgent-fix
echo "紧急修复" > urgent-fix.txt
git add urgent-fix.txt
git commit -m "紧急修复"
git checkout main

# 恢复暂存的更改
git stash pop
git add hello.txt
git commit -m "完成之前暂存的修改"
```

## 练习 5：Git Rebase 变基操作

### 目标
学习使用 git rebase 整理提交历史

### 步骤
1. 创建功能分支并进行多次提交
2. 使用交互式 rebase 整理提交历史
3. 将功能分支变基到最新的主分支
4. 合并到主分支

### 命令示例
```bash
# 创建功能分支
git checkout -b feature/rebase-demo

# 进行多次小提交
echo "第一次修改" >> demo.txt
git add demo.txt
git commit -m "第一次修改"

echo "第二次修改" >> demo.txt
git add demo.txt
git commit -m "第二次修改"

echo "第三次修改" >> demo.txt
git add demo.txt
git commit -m "第三次修改"

# 交互式变基，合并最近3个提交
git rebase -i HEAD~3

# 变基到主分支
git checkout main
git pull origin main  # 确保主分支是最新的
git checkout feature/rebase-demo
git rebase main

# 合并到主分支
git checkout main
git merge feature/rebase-demo
```

## 练习 6：冲突解决

### 目标
学习如何解决合并冲突

### 步骤
1. 在主分支修改文件
2. 创建分支并修改同一文件的同一行
3. 尝试合并产生冲突
4. 手动解决冲突
5. 完成合并

### 命令示例
```bash
# 在主分支修改文件
echo "主分支的内容" > conflict-demo.txt
git add conflict-demo.txt
git commit -m "主分支修改"

# 创建分支并修改同一文件
git checkout -b feature/conflict
echo "功能分支的内容" > conflict-demo.txt
git add conflict-demo.txt
git commit -m "功能分支修改"

# 尝试合并（会产生冲突）
git checkout main
git merge feature/conflict

# 手动解决冲突后
git add conflict-demo.txt
git commit -m "解决合并冲突"
```

## 练习记录

请在完成每个练习后，在下面记录您的操作和遇到的问题：

### 练习 1 完成情况
- [ ] 已完成
- 遇到的问题：
- 学到的知识点：

### 练习 2 完成情况
- [ ] 已完成
- 遇到的问题：
- 学到的知识点：

### 练习 3 完成情况
- [ ] 已完成
- 遇到的问题：
- 学到的知识点：

### 练习 4 完成情况（Git Stash）
- [ ] 已完成
- 遇到的问题：
- 学到的知识点：

### 练习 5 完成情况（Git Rebase）
- [ ] 已完成
- 遇到的问题：
- 学到的知识点：

### 练习 6 完成情况（冲突解决）
- [ ] 已完成
- 遇到的问题：
- 学到的知识点：
