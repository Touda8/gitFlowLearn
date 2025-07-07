# Git Stash 和 Rebase 详解

## Git Stash - 暂存工作区更改

### 什么是 Git Stash？
Git Stash 是一个强大的功能，允许您临时保存当前工作目录的更改，而不需要创建提交。这在以下场景中非常有用：
- 需要紧急切换分支处理其他问题
- 当前工作尚未完成，不想创建临时提交
- 需要拉取远程更新但本地有未提交的更改

### Git Stash 基本命令

#### 创建暂存
```bash
# 暂存所有更改（包括已跟踪文件的修改和暂存区的文件）
git stash

# 暂存时添加描述信息
git stash save "修复登录bug的临时工作"
git stash push -m "修复登录bug的临时工作"

# 暂存包括未跟踪的文件
git stash -u
git stash --include-untracked

# 暂存所有文件（包括被忽略的文件）
git stash -a
git stash --all

# 只暂存已暂存的更改（不包括工作区的修改）
git stash --staged
```

#### 查看暂存
```bash
# 查看暂存列表
git stash list

# 查看特定暂存的内容
git stash show
git stash show stash@{0}
git stash show -p stash@{0}  # 显示详细差异
```

#### 应用暂存
```bash
# 应用最新的暂存（不删除暂存）
git stash apply

# 应用特定的暂存
git stash apply stash@{2}

# 应用最新的暂存并删除暂存记录
git stash pop

# 应用特定暂存并删除
git stash pop stash@{1}
```

#### 删除暂存
```bash
# 删除最新的暂存
git stash drop

# 删除特定暂存
git stash drop stash@{1}

# 清空所有暂存
git stash clear
```

#### 从暂存创建分支
```bash
# 从暂存创建新分支（当暂存的更改与当前分支有冲突时很有用）
git stash branch <branch-name>
git stash branch feature/from-stash stash@{1}
```

### Git Stash 实际应用场景

#### 场景1：紧急切换分支
```bash
# 正在开发功能，突然需要修复紧急bug
echo "正在开发的新功能" >> feature.txt
git add feature.txt

# 暂存当前工作
git stash save "新功能开发中"

# 切换到主分支修复bug
git checkout main
git checkout -b hotfix/critical-bug
# 修复bug...
git add .
git commit -m "修复关键bug"
git checkout main
git merge hotfix/critical-bug

# 回到功能分支继续工作
git checkout feature-branch
git stash pop
```

#### 场景2：拉取远程更新
```bash
# 本地有未提交的更改，需要拉取远程更新
git status  # 显示有未提交的更改

# 暂存更改
git stash

# 拉取远程更新
git pull origin main

# 恢复暂存的更改
git stash pop
```

---

## Git Rebase - 变基操作

### 什么是 Git Rebase？
Git Rebase 是一种整合来自不同分支的修改的方法。它可以：
- 创建更线性、清晰的提交历史
- 整理和合并提交
- 将功能分支的更改"移动"到主分支的最新提交之上

### Rebase vs Merge
```
合并 (Merge):
A---B---C main
     \   \
      D---E---F feature
           \ /
            M

变基 (Rebase):
A---B---C---D'---E'---F' main
```

### Git Rebase 基本命令

#### 基本变基
```bash
# 将当前分支变基到指定分支
git rebase <target-branch>

# 将当前分支变基到主分支
git checkout feature-branch
git rebase main

# 将指定分支变基到当前分支
git rebase <source-branch> <target-branch>
```

#### 交互式变基
```bash
# 交互式变基最近的n个提交
git rebase -i HEAD~3
git rebase -i <commit-hash>

# 交互式变基到指定分支
git rebase -i main
```

#### 交互式变基选项
在交互式变基中，您可以使用以下命令：
- `pick` / `p` - 使用该提交
- `reword` / `r` - 使用该提交，但修改提交信息
- `edit` / `e` - 使用该提交，但停下来修改
- `squash` / `s` - 使用该提交，但合并到前一个提交中
- `fixup` / `f` - 类似squash，但丢弃该提交的日志信息
- `drop` / `d` - 删除该提交

#### 处理变基过程中的问题
```bash
# 如果遇到冲突，解决后继续
git add <resolved-files>
git rebase --continue

# 跳过当前补丁
git rebase --skip

# 中止变基，回到变基前的状态
git rebase --abort

# 编辑变基过程中的提交
git commit --amend
git rebase --continue
```

### Git Rebase 实际应用场景

#### 场景1：整理提交历史
```bash
# 假设有以下提交历史
git log --oneline
# abc123 修复拼写错误
# def456 添加新功能
# ghi789 临时提交
# jkl012 添加更多功能

# 使用交互式变基整理
git rebase -i HEAD~4

# 在编辑器中：
# pick jkl012 添加更多功能
# squash ghi789 临时提交
# pick def456 添加新功能
# fixup abc123 修复拼写错误
```

#### 场景2：将功能分支变基到最新主分支
```bash
# 在功能分支上
git checkout feature/user-auth

# 确保主分支是最新的
git checkout main
git pull origin main

# 将功能分支变基到最新主分支
git checkout feature/user-auth
git rebase main

# 如果有冲突，解决后继续
# git add <resolved-files>
# git rebase --continue

# 推送变基后的分支（需要强制推送）
git push --force-with-lease origin feature/user-auth
```

#### 场景3：修改历史提交
```bash
# 修改倒数第3个提交
git rebase -i HEAD~3

# 在编辑器中将要修改的提交标记为 'edit'
# 进行必要的修改
git add <files>
git commit --amend
git rebase --continue
```

### 使用 Rebase 的注意事项

#### ⚠️ 黄金法则
**永远不要对已经推送到公共仓库的提交进行变基！**

#### 安全使用指南
1. **仅对本地提交使用变基**
2. **团队协作时谨慎使用** - 确保团队了解变基的影响
3. **使用 `--force-with-lease`** 而不是 `--force` 进行强制推送
4. **保持备份** - 变基前创建备份分支

```bash
# 创建备份分支
git checkout -b backup/feature-branch

# 进行变基操作
git checkout feature-branch
git rebase main

# 如果出错，可以恢复
git checkout backup/feature-branch
```

### Rebase vs Merge 的选择

#### 使用 Rebase 的情况：
- 想要保持线性的提交历史
- 整理功能分支的提交
- 将本地更改应用到最新的主分支

#### 使用 Merge 的情况：
- 保留分支的上下文信息
- 团队协作中的正式集成
- 不想修改提交历史

### 高级 Rebase 技巧

#### 自动解决冲突策略
```bash
# 使用策略解决冲突
git rebase -X theirs main    # 发生冲突时优先使用目标分支的更改
git rebase -X ours main      # 发生冲突时优先使用当前分支的更改
```

#### 变基特定范围的提交
```bash
# 变基从commit1到commit2的提交到目标分支
git rebase --onto <target> <commit1> <commit2>
```

#### 保留合并提交的变基
```bash
# 保留合并提交进行变基
git rebase --preserve-merges main
git rebase --rebase-merges main  # Git 2.18+推荐语法
```
