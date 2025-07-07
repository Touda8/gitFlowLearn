# Git 进阶技巧

## 5. 撤销和修改操作

### git reset
```bash
# 软重置（保留工作区和暂存区更改）
git reset --soft <commit>

# 混合重置（保留工作区更改，清空暂存区）
git reset --mixed <commit>  # 默认模式
git reset <commit>

# 硬重置（清空工作区和暂存区）
git reset --hard <commit>

# 重置到上一个提交
git reset HEAD~1

# 重置暂存区的文件
git reset HEAD <file>
```

### git revert
```bash
# 反转指定提交（创建新提交来撤销）
git revert <commit>

# 反转合并提交
git revert -m 1 <merge-commit>

# 反转多个提交
git revert <commit1>..<commit2>
```

### git stash
```bash
# 暂存当前更改
git stash
git stash save "暂存信息"

# 查看暂存列表
git stash list

# 应用最近的暂存
git stash apply
git stash apply stash@{0}

# 应用并删除暂存
git stash pop

# 删除暂存
git stash drop stash@{0}
git stash clear  # 清空所有暂存
```

### git clean
```bash
# 查看将要删除的文件
git clean -n

# 删除未跟踪的文件
git clean -f

# 删除未跟踪的文件和目录
git clean -fd

# 交互式清理
git clean -i
```

## 6. 标签管理

### 创建标签
```bash
# 轻量标签
git tag v1.0.0

# 注释标签
git tag -a v1.0.0 -m "版本 1.0.0"

# 对特定提交打标签
git tag -a v1.0.0 <commit-hash> -m "版本 1.0.0"
```

### 查看标签
```bash
# 列出所有标签
git tag

# 列出特定模式的标签
git tag -l "v1.*"

# 查看标签详细信息
git show v1.0.0
```

### 推送标签
```bash
# 推送单个标签
git push origin v1.0.0

# 推送所有标签
git push origin --tags
```

### 删除标签
```bash
# 删除本地标签
git tag -d v1.0.0

# 删除远程标签
git push origin --delete v1.0.0
```

## 7. 查看和比较

### git show
```bash
# 显示最新提交
git show

# 显示特定提交
git show <commit-hash>

# 显示特定文件的特定提交
git show <commit>:<file>
```

### git blame
```bash
# 显示文件每行的最后修改信息
git blame <file>

# 显示特定行范围
git blame -L 10,20 <file>
```

### 高级 diff 操作
```bash
# 比较两个分支
git diff main..feature-branch

# 比较工作区和特定提交
git diff <commit>

# 只显示文件名
git diff --name-only

# 显示统计信息
git diff --stat
```

### 高级 log 操作
```bash
# 图形化显示分支历史
git log --graph --oneline --all

# 显示每个提交的文件变化
git log --name-status

# 按作者过滤
git log --author="John"

# 按日期过滤
git log --since="2023-01-01" --until="2023-12-31"

# 按提交信息过滤
git log --grep="bug fix"

# 显示文件的提交历史
git log -- <file>

# 美化的图形化日志
git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```

## 8. 交互式操作

### git add -i
```bash
# 交互式添加文件
git add -i
```
选项说明：
- `1` 或 `status` - 查看状态
- `2` 或 `update` - 更新文件到暂存区
- `3` 或 `revert` - 从暂存区移除文件
- `4` 或 `add untracked` - 添加未跟踪文件
- `5` 或 `patch` - 选择性添加文件的部分内容

### git rebase -i
```bash
# 交互式变基最近的 3 个提交
git rebase -i HEAD~3
```
交互式变基选项：
- `pick` - 使用提交
- `reword` - 使用提交但修改提交信息
- `edit` - 使用提交但暂停以便修改
- `squash` - 将提交合并到前一个提交
- `fixup` - 类似 squash，但丢弃提交信息
- `drop` - 删除提交

### git commit --amend
```bash
# 修改最后一次提交的信息
git commit --amend -m "新的提交信息"

# 将暂存区的更改添加到最后一次提交
git add <file>
git commit --amend --no-edit
```

## 9. Git 别名配置

### 设置别名
```bash
# 常用别名
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit

# 高级别名
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'

# 美化日志别名
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

## 10. 性能优化

### 大文件处理
```bash
# 使用 Git LFS 处理大文件
git lfs install
git lfs track "*.psd"
git add .gitattributes
```

### 仓库维护
```bash
# 垃圾回收
git gc

# 优化仓库
git gc --aggressive

# 检查仓库完整性
git fsck

# 清理不可达的对象
git prune
```
