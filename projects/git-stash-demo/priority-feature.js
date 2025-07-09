// 任务优先级功能 - 正在开发中

// 优先级映射
const PRIORITY_CONFIG = {
    low: {
        label: '低优先级',
        color: '#95a5a6',
        order: 1
    },
    medium: {
        label: '中优先级', 
        color: '#f39c12',
        order: 2
    },
    high: {
        label: '高优先级',
        color: '#e74c3c',
        order: 3
    }
};

// 扩展TaskManager类的优先级功能
TaskManager.prototype.sortTasksByPriority = function() {
    this.tasks.sort((a, b) => {
        const priorityA = PRIORITY_CONFIG[a.priority] || PRIORITY_CONFIG.medium;
        const priorityB = PRIORITY_CONFIG[b.priority] || PRIORITY_CONFIG.medium;
        return priorityB.order - priorityA.order; // 高优先级在前
    });
};

TaskManager.prototype.renderTasksWithPriority = function() {
    this.sortTasksByPriority();
    
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    this.tasks.forEach(task => {
        const li = document.createElement('li');
        const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium;
        
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <span class="priority-badge" style="background-color: ${priority.color}">
                ${priority.label}
            </span>
            <div class="task-actions">
                <button onclick="taskManager.toggleTask(${task.id})" class="toggle-btn">
                    ${task.completed ? '取消完成' : '完成'}
                </button>
                <button onclick="taskManager.deleteTask(${task.id})" class="delete-btn">删除</button>
            </div>
        `;
        taskList.appendChild(li);
    });
};

// 注意：这个文件还没有完成，正在开发中...
// TODO: 
// 1. 完善优先级样式
// 2. 添加拖拽排序功能
// 3. 添加优先级过滤器
