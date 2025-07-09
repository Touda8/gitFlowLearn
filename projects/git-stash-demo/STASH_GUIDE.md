# Git Stash 完整使用指南

## 🎯 什么是 Git Stash？

Git Stash 是一个"临时储藏室"，可以临时保存你当前的工作状态，让你能够切换到其他任务，稍后再回来继续工作。

### 核心概念
- **栈结构**: Stash使用栈（Stack）数据结构，后进先出（LIFO）
- **自动清理**: 默认情况下，`git stash pop` 会在应用后自动删除stash
- **多重保存**: 可以创建多个stash，每个都有独立的描述

## 🔧 基本命令详解

### 1. 保存到stash
```bash
# 基本用法
git stash

# 添加描述信息
git stash push -m "描述信息"

# 保存包括未跟踪文件
git stash push -u -m "包含新文件"

# 保存所有文件（包括被忽略的）
git stash push -a -m "包含所有文件"

# 只保存暂存区
git stash push --staged -m "只保存暂存区"

# 保存修改但保持暂存区不变
git stash push --keep-index -m "保持暂存区"
```

### 2. 查看stash
```bash
# 查看stash列表
git stash list

# 查看特定stash的摘要
git stash show
git stash show stash@{1}

# 查看特定stash的详细内容
git stash show -p
git stash show -p stash@{1}
```

### 3. 恢复stash
```bash
# 恢复最新的stash并删除
git stash pop

# 恢复特定stash并删除
git stash pop stash@{1}

# 恢复最新的stash但保留
git stash apply

# 恢复特定stash但保留
git stash apply stash@{1}
```

### 4. 管理stash
```bash
# 删除特定stash
git stash drop stash@{1}

# 清空所有stash
git stash clear

# 创建分支并应用stash
git stash branch new-branch stash@{1}
```

## 🎪 实际应用场景

### 场景1: 紧急Bug修复 ✅ 已演示
**状况**: 正在开发新功能，突然需要修复紧急bug
**解决**: 使用stash保存当前工作，切换分支修复bug，然后恢复工作

### 场景2: 实验性修改
**状况**: 想要尝试不同的实现方案
**解决**: 保存当前方案，尝试新方案，对比选择最佳

### 场景3: 代码同步
**状况**: 本地有修改，需要pull远程最新代码
**解决**: stash保存修改，pull代码，然后恢复修改

### 场景4: 多任务切换
**状况**: 需要在多个任务之间快速切换
**解决**: 为每个任务创建描述性stash，需要时恢复

## 🛡️ 最佳实践

### 1. 总是添加描述信息
```bash
# 好的做法
git stash push -m "正在开发用户登录功能 - 添加密码验证"

# 不好的做法
git stash
```

### 2. 定期清理stash
```bash
# 查看所有stash
git stash list

# 删除不需要的stash
git stash drop stash@{2}

# 或者清空所有（谨慎使用）
git stash clear
```

### 3. 使用合适的选项
```bash
# 有新文件时使用-u
git stash push -u -m "包含新创建的配置文件"

# 只想保存暂存区时使用--staged
git stash push --staged -m "只保存已暂存的修改"
```

### 4. 避免长期保存
- Stash是临时存储，不要长期保存
- 超过1-2天的工作考虑创建特性分支
- 定期检查并清理旧的stash

## ⚠️ 注意事项

### 1. 文件类型处理
| 文件状态 | 默认stash | -u选项 | -a选项 |
|----------|-----------|--------|--------|
| 已跟踪修改 | ✅ | ✅ | ✅ |
| 暂存区 | ✅ | ✅ | ✅ |
| 未跟踪 | ❌ | ✅ | ✅ |
| 被忽略 | ❌ | ❌ | ✅ |

### 2. 冲突处理
```bash
# 如果恢复stash时有冲突
git stash pop
# 解决冲突后
git add <resolved-files>
# 冲突解决后，stash会自动被删除
```

### 3. 分支切换
- Stash是全局的，在任何分支都能看到
- 但恢复时要注意当前分支的兼容性
- 必要时使用 `git stash branch` 创建新分支

## 🚀 高级技巧

### 1. 选择性stash
```bash
# 交互式选择要stash的文件
git stash push -p

# 只stash特定文件
git stash push -m "只保存配置文件" config.json
```

### 2. 查看stash差异
```bash
# 比较stash和当前工作区
git stash show -p

# 比较stash和HEAD
git diff stash@{0}

# 比较两个stash
git diff stash@{0} stash@{1}
```

### 3. 恢复到新分支
```bash
# 在新分支中恢复stash
git stash branch feature-branch stash@{0}
```

---

## 🎯 接下来的实战演示

让我们继续演示其他场景：
1. 场景2: 实验性修改对比
2. 场景3: 代码同步处理
3. 场景4: 多个stash管理

你想先看哪个场景的演示？
