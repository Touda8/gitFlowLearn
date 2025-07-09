// 任务管理系统的主要JavaScript逻辑

class TaskManager {
    constructor() {
        this.tasks = [];
        this.taskIdCounter = 1;
        this.init();
    }
    
    init() {
        this.loadTasks();
        this.bindEvents();
        this.renderTasks();
    }
    
    bindEvents() {
        const taskForm = document.getElementById('taskForm');
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });
    }
    
    addTask() {
        const taskInput = document.getElementById('taskInput');
        const taskText = taskInput.value.trim();
        const prioritySelect = document.getElementById('prioritySelect');
        
        if (taskText) {
            const newTask = {
                id: this.taskIdCounter++,
                text: taskText,
                completed: false,
                priority: prioritySelect ? prioritySelect.value : 'medium',
                createdAt: new Date().toISOString()
            };
            
            this.tasks.push(newTask);
            this.saveTasks();
            this.renderTasks();
            taskInput.value = '';
        }
    }
    
    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
        this.renderTasks();
    }
    
    toggleTask(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
        }
    }
    
    renderTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        
        this.tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <button onclick="taskManager.toggleTask(${task.id})" class="toggle-btn">
                        ${task.completed ? '取消完成' : '完成'}
                    </button>
                    <button onclick="taskManager.deleteTask(${task.id})" class="delete-btn">删除</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }
    
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    
    loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
            this.taskIdCounter = Math.max(...this.tasks.map(t => t.id), 0) + 1;
        }
    }
}

// 初始化应用
const taskManager = new TaskManager();
