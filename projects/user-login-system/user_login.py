"""
用户登录模块
实现用户身份验证功能
"""

class UserLogin:
    def __init__(self):
        # 合并解决：采用更严格的密码要求（10位长度+特殊字符）
        self.min_password_length = 10
        self.require_special_chars = True
        self.special_chars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
        self.users = {
            'admin': 'password123',
            'user1': 'mypassword',
            'developer': 'dev123'
        }
    
    def authenticate(self, username, password):
        """
        用户身份验证
        
        Args:
            username (str): 用户名
            password (str): 密码
            
        Returns:
            dict: 包含认证结果的字典
        """
        # 合并解决：综合两个分支的密码验证逻辑
        if len(password) < self.min_password_length:
            return {
                'success': False,
                'message': f'密码长度不能少于{self.min_password_length}位',
                'user': None
            }
        
        if self.require_special_chars and not any(c in self.special_chars for c in password):
            return {
                'success': False,
                'message': '密码必须包含特殊字符',
                'user': None
            }
            
        if username in self.users:
            if self.users[username] == password:
                return {
                    'success': True,
                    'message': f'用户 {username} 登录成功',
                    'user': username
                }
            else:
                return {
                    'success': False,
                    'message': '密码错误',
                    'user': None
                }
        else:
            return {
                'success': False,
                'message': '用户不存在',
                'user': None
            }
    
    def login(self, username, password):
        """
        登录方法
        """
        print(f"尝试登录用户: {username}")
        result = self.authenticate(username, password)
        print(result['message'])
        return result

def main():
    """
    测试用户登录功能
    """
    print("=== 用户登录系统测试 ===")
    
    login_system = UserLogin()
    
    # 测试用例
    test_cases = [
        ('admin', 'password123'),  # 正确的用户名和密码
        ('user1', 'wrongpassword'),  # 错误的密码
        ('nonexistent', 'anypassword'),  # 不存在的用户
        ('developer', 'dev123')  # 另一个正确的登录
    ]
    
    for username, password in test_cases:
        print(f"\n--- 测试登录: {username} ---")
        result = login_system.login(username, password)
        if result['success']:
            print(f"✅ 登录成功！欢迎，{result['user']}")
        else:
            print(f"❌ 登录失败：{result['message']}")

if __name__ == "__main__":
    main()
