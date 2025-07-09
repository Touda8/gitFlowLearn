# Git Stash 实战演示记录

## 🚨 场景1：紧急Bug修复

### 📋 场景描述
**开发状态：**
- 正在开发任务优先级功能
- 修改了3个文件：app.js, index.html, styles.css
- 创建了1个新文件：priority-feature.js
- 功能还没有完成，不适合提交

**突发状况：**
- 收到紧急bug报告：删除任务功能有问题
- 需要立即切换到hotfix分支修复
- 但当前工作区有未完成的修改

### 🎯 解决方案：使用Git Stash

#### 第1步：检查当前状态
```bash
git status
```

**结果：**
```
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
Changes not staged for commit:
        modified:   app.js
        modified:   index.html
        modified:   styles.css
Untracked files:
        priority-feature.js
```

#### 第2步：保存当前工作到stash
```bash
git stash push -m "正在开发任务优先级功能 - 需要紧急修复bug"
```

⚠️ **注意**：默认情况下，git stash不会保存未跟踪的文件（Untracked files）
如果需要保存未跟踪的文件，使用：
```bash
git stash push -u -m "正在开发任务优先级功能 - 包含新文件"
```

#### 第3步：验证工作区已清理
```bash
git status
```

**期望结果：**
```
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
Untracked files:
        priority-feature.js  # 只有未跟踪文件保留（如果没用-u选项）
```

#### 第4步：创建hotfix分支修复bug
```bash
git checkout -b hotfix/delete-task-bug
```

#### 第5步：修复bug并提交
```bash
# 修复bug后
git add .
git commit -m "修复：删除任务功能bug"
```

#### 第6步：切换回主分支
```bash
git checkout main
```

#### 第7步：恢复之前的工作
```bash
git stash pop
```

**或者使用apply（保留stash）：**
```bash
git stash apply
```

#### 第8步：继续开发
现在可以继续开发任务优先级功能了！

### 🔧 重要的stash命令

#### 查看stash列表
```bash
git stash list
```

#### 查看stash内容
```bash
git stash show stash@{0}
git stash show -p stash@{0}  # 显示详细差异
```

#### 应用特定的stash
```bash
git stash apply stash@{1}
```

#### 删除stash
```bash
git stash drop stash@{0}
git stash clear  # 清空所有stash
```

### 📊 不同stash选项对比

| 选项 | 命令 | 保存修改文件 | 保存暂存文件 | 保存未跟踪文件 | 保存被忽略文件 |
|------|------|-------------|-------------|---------------|---------------|
| 默认 | `git stash` | ✅ | ✅ | ❌ | ❌ |
| 包含未跟踪 | `git stash -u` | ✅ | ✅ | ✅ | ❌ |
| 包含所有 | `git stash -a` | ✅ | ✅ | ✅ | ✅ |
| 只暂存区 | `git stash --staged` | ❌ | ✅ | ❌ | ❌ |
| 保持索引 | `git stash --keep-index` | ✅ | 保持不变 | ❌ | ❌ |

---

## 🚀 场景2：实验性修改对比

### 📋 场景描述
**当前状态：**
- 正在开发任务优先级功能
- 想要尝试不同的UI设计方案
- 需要保存当前实现，尝试新方案
- 对比后选择最佳实现

### 🎯 解决方案：使用多个stash进行方案对比

#### 第1步：保存当前实现方案
```bash
git stash push -u -m "方案A：使用下拉选择器的优先级实现"
```

#### 第2步：实现新的方案B
（修改文件，实现不同的UI方案）

#### 第3步：保存方案B
```bash
git stash push -u -m "方案B：使用按钮组的优先级实现"
```

#### 第4步：对比两个方案
```bash
# 查看所有stash
git stash list

# 对比两个方案
git stash show -p stash@{0}  # 方案B
git stash show -p stash@{1}  # 方案A
```

#### 第5步：选择最佳方案
```bash
# 选择方案A
git stash apply stash@{1}

# 或者选择方案B
git stash apply stash@{0}
```

### 让我们实际演示这个过程！
