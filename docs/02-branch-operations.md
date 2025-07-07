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

### 功能开发流程
```bash
# 1. 从主分支创建功能分支
git checkout main
git pull origin main
git checkout -b feature/user-login

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
