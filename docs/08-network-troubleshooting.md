# Git 网络连接问题解决指南

## 🚨 常见网络问题

当您遇到以下错误时：
```
fatal: unable to access 'https://github.com/...': Failed to connect to github.com port 443 after 21058 ms: Could not connect to server
```

这通常是由以下原因造成的：

## 🔍 问题诊断

### 1. 检查基础网络连接
```bash
ping github.com
```

### 2. 检查DNS解析
```bash
nslookup github.com
```

### 3. 检查Git配置
```bash
git config --list | grep -E "(http|proxy)"
```

## 🛠️ 解决方案

### 方案1：增加超时时间（推荐首选）
```bash
# 设置HTTP超时为5分钟
git config --global http.timeout 300

# 设置低速传输超时
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999

# 增加POST缓冲区大小
git config --global http.postBuffer 524288000
```

### 方案2：使用不同的DNS服务器
如果DNS解析有问题，可以：
1. 修改系统DNS为 8.8.8.8 或 114.114.114.114
2. 或者在 hosts 文件中添加GitHub IP

#### Windows hosts文件路径：
```
C:\Windows\System32\drivers\etc\hosts
```

添加以下内容：
```
140.82.112.3 github.com
140.82.114.9 codeload.github.com
```

### 方案3：代理设置（如果您使用代理）
```bash
# 设置HTTP代理
git config --global http.proxy http://proxy.server:port
git config --global https.proxy https://proxy.server:port

# 取消代理设置
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### 方案4：使用SSH连接（如果HTTPS持续失败）
```bash
# 生成SSH密钥（如果没有）
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# 将公钥添加到GitHub账户
cat ~/.ssh/id_rsa.pub

# 更改远程仓库URL为SSH
git remote set-url origin git@github.com:username/repository.git

# 测试SSH连接
ssh -T git@github.com
```

### 方案5：使用GitHub CLI（现代替代方案）
```bash
# 安装GitHub CLI
# Windows: winget install --id GitHub.cli

# 认证
gh auth login

# 克隆仓库
gh repo clone username/repository

# 使用gh进行推送和拉取
gh repo sync
```

### 方案6：临时解决方案 - 浅克隆
```bash
# 如果仓库很大，使用浅克隆
git clone --depth=1 https://github.com/username/repository.git

# 获取更多历史（可选）
git fetch --unshallow
```

## 🔧 网络优化配置

### 针对中国大陆用户的优化
```bash
# 使用国内镜像加速（如果可用）
git config --global url."https://gitclone.com/github.com".insteadOf "https://github.com"

# 或者使用其他镜像
git config --global url."https://github.com.cnpmjs.org".insteadOf "https://github.com"

# 恢复原始设置
git config --global --unset url."https://gitclone.com/github.com".insteadOf
```

### HTTP/2 和 SSL 设置
```bash
# 禁用HTTP/2（某些网络环境下有帮助）
git config --global http.version HTTP/1.1

# SSL设置
git config --global http.sslVerify true
git config --global http.sslVersion tlsv1.2
```

## 📊 连接测试脚本

创建一个测试脚本来诊断问题：

```bash
#!/bin/bash
echo "=== Git 网络连接诊断 ==="

echo "1. 测试基础网络连接..."
ping -c 4 github.com

echo "2. 测试HTTPS连接..."
curl -I https://github.com

echo "3. 测试SSH连接..."
ssh -T git@github.com

echo "4. 当前Git配置..."
git config --list | grep -E "(http|proxy|url)"

echo "5. DNS解析测试..."
nslookup github.com
```

## ⚡ 快速修复命令集

如果您遇到连接问题，可以快速执行以下命令：

```bash
# 重置所有网络相关配置
git config --global --unset http.proxy
git config --global --unset https.proxy
git config --global http.timeout 300
git config --global http.postBuffer 524288000
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999

# 尝试拉取
git pull origin main
```

## 🚨 紧急情况下的替代方案

### 1. 使用ZIP下载
如果Git连接完全无法使用：
1. 访问GitHub仓库页面
2. 点击"Code" → "Download ZIP"
3. 下载并解压到本地
4. 重新初始化Git仓库

### 2. 使用移动热点
有时候切换网络环境可以解决问题：
1. 使用手机热点
2. 尝试不同的WiFi网络
3. 使用VPN服务

### 3. 延迟操作
如果是临时网络问题：
1. 使用 `git stash` 保存当前工作
2. 稍后重试网络操作
3. 使用 `git stash pop` 恢复工作

## 🔍 深度诊断

如果问题持续存在，使用以下命令进行深度诊断：

```bash
# 详细的拉取过程
GIT_TRACE=1 GIT_CURL_VERBOSE=1 git pull origin main

# 检查网络路径
tracert github.com

# 检查端口连通性
telnet github.com 443
```

记住：网络问题通常是临时的，多尝试几次或稍后重试往往能解决问题。
