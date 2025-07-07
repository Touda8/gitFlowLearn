# Git 分支操作详解

## 3. 分支操作

### git branch
```bash
git branch                    # 查看所有本地分支
git branch -a                 # 查看所有分支（包括远程）
git branch <branch-name>      # 创建新分支
git branch -d <branch-name>   # 删除分支
git branch -D <branch-name>   # 强制删除分支
git branch -m <old> <new>     # 重命名分支
```

### git checkout
```bash
git checkout <branch-name>         # 切换分支
git checkout -b <branch-name>      # 创建并切换到新分支
git checkout <commit-hash>         # 切换到特定提交
git checkout -- <file>             # 撤销工作区文件的更改
```

### git switch（Git 2.23+ 新语法）
```bash
git switch <branch-name>           # 切换分支
git switch -c <branch-name>        # 创建并切换到新分支
git switch -                       # 切换到上一个分支
```

### git merge
```bash
git merge <branch-name>            # 合并指定分支到当前分支
git merge --no-ff <branch-name>    # 非快进合并
git merge --squash <branch-name>   # 压缩合并
```

### git rebase
```bash
git rebase <branch-name>           # 变基到指定分支
git rebase -i <commit-hash>        # 交互式变基
git rebase --continue              # 继续变基
git rebase --abort                 # 取消变基
```

## 4. 远程仓库操作

### git remote
```bash
git remote                         # 查看远程仓库
git remote -v                      # 查看远程仓库详细信息
git remote add <name> <url>        # 添加远程仓库
git remote remove <name>           # 删除远程仓库
git remote rename <old> <new>      # 重命名远程仓库
```

### git fetch
```bash
git fetch                          # 获取所有远程分支的更新
git fetch <remote>                 # 获取指定远程仓库的更新
git fetch <remote> <branch>        # 获取指定分支的更新
```

### git pull
```bash
git pull                           # 拉取并合并
git pull <remote> <branch>         # 从指定远程分支拉取
git pull --rebase                  # 使用变基方式拉取
```

### git push
```bash
git push                           # 推送到默认远程分支
git push <remote> <branch>         # 推送到指定远程分支
git push -u <remote> <branch>      # 推送并设置上游分支
git push --tags                    # 推送标签
git push --force                   # 强制推送（危险操作）
```

## 分支工作流示例

### 功能开发流程详解

#### 🔍 完整流程分析
```bash
# 1. 从主分支创建功能分支
git checkout main                    # 步骤1：切换到主分支
git pull origin main                # 步骤2：获取最新更新
git checkout -b feature/user-login  # 步骤3：创建并切换到功能分支

# 2. 开发功能并提交
git add .
git commit -m "添加用户登录功能"

# 3. 推送功能分支
git push -u origin feature/user-login

# 4. 合并到主分支
git checkout main
git merge feature/user-login
git push origin main

# 5. 删除功能分支
git branch -d feature/user-login
git push origin --delete feature/user-login
```

#### 📋 步骤1-3详细解释

##### **为什么需要三个步骤？**

```
开始状态：可能在任何分支
          ↓
步骤1: git checkout main
          ↓
确保在主分支：main ← 您在这里
          ↓
步骤2: git pull origin main
          ↓
同步最新代码：main (已更新) ← 您在这里
          ↓
步骤3: git checkout -b feature/user-login
          ↓
创建新分支：feature/user-login ← 您在这里
```

##### **步骤详解：**

**🎯 步骤1：`git checkout main`**
- **作用**：切换到主分支
- **为什么需要**：确保从正确的分支开始
- **场景**：您可能正在其他功能分支上工作

```bash
# 假设您当前在其他分支
git branch --show-current  # 可能显示：feature/old-feature

# 切换到主分支
git checkout main
git branch --show-current  # 现在显示：main
```

**🔄 步骤2：`git pull origin main`**
- **作用**：拉取远程主分支的最新更新
- **为什么需要**：确保基于最新代码创建分支
- **重要性**：避免基于过时的代码开发

```bash
# 获取远程最新更新
git pull origin main
# 输出可能显示：
# Already up to date. 或
# Updating abc123..def456
```

**🌿 步骤3：`git checkout -b feature/user-login`**
- **作用**：创建并切换到新功能分支
- **`-b` 参数**：创建(create)并切换(checkout)
- **结果**：基于当前main分支创建新分支

```bash
# 等价于以下两个命令：
git branch feature/user-login      # 创建分支
git checkout feature/user-login    # 切换到分支

# 或者使用新语法：
git switch -c feature/user-login   # Git 2.23+ 推荐语法
```

#### 🔍 为什么不能合并步骤？

❌ **错误做法1：跳过步骤1**
```bash
# 如果您当前在 feature/old-feature 分支
git pull origin main                    # 错误！拉取到错误分支
git checkout -b feature/user-login     # 基于错误分支创建
```

❌ **错误做法2：跳过步骤2**
```bash
git checkout main                       # 切换到主分支
git checkout -b feature/user-login     # 基于可能过时的代码创建
```

✅ **正确做法：三步法**
```bash
git checkout main                       # 确保在正确分支
git pull origin main                   # 确保代码最新
git checkout -b feature/user-login     # 基于最新代码创建
```

#### 🎨 替代方案和简化

##### **现代Git语法（推荐）**
```bash
# 使用 git switch（Git 2.23+）
git switch main                         # 切换到主分支
git pull origin main                   # 拉取最新更新
git switch -c feature/user-login       # 创建并切换分支
```

##### **一步创建远程分支**
```bash
# 如果远程已有该分支
git checkout -b feature/user-login origin/feature/user-login
```

##### **批量操作脚本**
```bash
# 创建别名简化操作
git config --global alias.new-feature '!f() { git checkout main && git pull origin main && git checkout -b $1; }; f'

# 使用别名
git new-feature feature/user-login
```

#### 🔄 分支生命周期图解

```
main分支:     A---B---C---D---E
                   ↑         ↑
                 步骤1-2    合并点
                   ↓
功能分支:          F---G---H
                 ↑         ↑
               步骤3      推送
             创建分支    完成开发
```

#### ⚡ 实践建议

1. **养成习惯**：始终使用三步法创建功能分支
2. **检查状态**：每步后使用 `git status` 确认状态
3. **分支命名**：使用有意义的分支名（如 `feature/功能描述`）
4. **定期同步**：开发过程中定期从main分支拉取更新
