"""
用户登录功能的单元测试
"""

import sys
import os

# 添加项目根目录到 Python 路径
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from user_login import UserLogin

def test_successful_login():
    """测试成功登录"""
    login_system = UserLogin()
    result = login_system.authenticate('admin', 'password123')
    
    assert result['success'] == True
    assert result['user'] == 'admin'
    assert '登录成功' in result['message']
    print("✅ 测试通过：成功登录")

def test_wrong_password():
    """测试密码错误"""
    login_system = UserLogin()
    result = login_system.authenticate('admin', 'wrongpassword')
    
    assert result['success'] == False
    assert result['user'] == None
    assert '密码错误' in result['message']
    print("✅ 测试通过：密码错误处理")

def test_nonexistent_user():
    """测试用户不存在"""
    login_system = UserLogin()
    result = login_system.authenticate('nonexistent', 'anypassword')
    
    assert result['success'] == False
    assert result['user'] == None
    assert '用户不存在' in result['message']
    print("✅ 测试通过：用户不存在处理")

def test_all_users():
    """测试所有预设用户"""
    login_system = UserLogin()
    expected_users = ['admin', 'user1', 'developer']
    
    for user in expected_users:
        # 这里我们只测试用户是否存在于系统中
        assert user in login_system.users
    
    print("✅ 测试通过：所有预设用户存在")

def run_all_tests():
    """运行所有测试"""
    print("=== 运行用户登录功能测试 ===\n")
    
    try:
        test_successful_login()
        test_wrong_password()
        test_nonexistent_user()
        test_all_users()
        
        print("\n🎉 所有测试通过！用户登录功能工作正常。")
        return True
        
    except AssertionError as e:
        print(f"\n❌ 测试失败：{e}")
        return False
    except Exception as e:
        print(f"\n💥 测试运行出错：{e}")
        return False

if __name__ == "__main__":
    run_all_tests()
