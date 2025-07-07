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

## 练习 4：冲突解决

### 目标
学习如何解决合并冲突

### 步骤
1. 在主分支修改文件
2. 创建分支并修改同一文件的同一行
3. 尝试合并产生冲突
4. 手动解决冲突
5. 完成合并

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

### 练习 4 完成情况
- [ ] 已完成
- 遇到的问题：
- 学到的知识点：
