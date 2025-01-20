const mongoose = require('mongoose');
const inquirer = require('inquirer');
const Task = require('./taskModel');

mongoose.connect('mongodb+srv://PRIVATE:PRIVATE@cluster0.phlto.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  }).then(() => {
    console.log("Conectado ao MongoDB!");
    mainMenu();
  }).catch((error) => {
    console.error("Erro ao conectar ao MongoDB:", error);
  });
  
  async function mainMenu() {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: ['Adicionar tarefa', 'Listar tarefas', 'Atualizar tarefa', 'Remover tarefa', 'Sair'],
      },
    ]);
  
    switch (action) {
      case 'Adicionar tarefa':
        return addTask();
      case 'Listar tarefas':
        return listTasks();
      case 'Atualizar tarefa':
        return updateTask();
      case 'Remover tarefa':
        return removeTask();
      case 'Sair':
        console.log("Saindo...");
        mongoose.disconnect();
        process.exit();
    }
  }
  
  async function addTask() {
    const { title, description } = await inquirer.prompt([
      { type: 'input', name: 'title', message: 'Título da tarefa:' },
      { type: 'input', name: 'description', message: 'Descrição da tarefa (opcional):' },
    ]);
  
    await Task.create({ title, description });
    console.log("Tarefa adicionada com sucesso!");
    mainMenu();
  }
  
  async function listTasks() {
    const tasks = await Task.find();
    console.log("\n--- Tarefas ---");
    tasks.forEach(task => {
      console.log(`- [${task.status}] ${task.title} (${task._id})`);
      if (task.description) console.log(`  Descrição: ${task.description}`);
    });
    console.log("----------------\n");
    mainMenu();
  }
  
  async function updateTask() {
    const tasks = await Task.find();
    if (tasks.length === 0) {
      console.log("Nenhuma tarefa encontrada!");
      return mainMenu();
    }
  
    const { taskId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'taskId',
        message: 'Selecione a tarefa para atualizar:',
        choices: tasks.map(task => ({ name: task.title, value: task._id })),
      },
    ]);
  
    const { status } = await inquirer.prompt([
      { type: 'list', name: 'status', message: 'Novo status:', choices: ['pendente', 'concluída'] },
    ]);
  
    await Task.findByIdAndUpdate(taskId, { status });
    console.log("Tarefa atualizada com sucesso!");
    mainMenu();
  }
  
  async function removeTask() {
    const tasks = await Task.find();
    if (tasks.length === 0) {
      console.log("Nenhuma tarefa encontrada!");
      return mainMenu();
    }
  
    const { taskId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'taskId',
        message: 'Selecione a tarefa para remover:',
        choices: tasks.map(task => ({ name: task.title, value: task._id })),
      },
    ]);
  
    await Task.findByIdAndDelete(taskId);
    console.log("Tarefa removida com sucesso!");
    mainMenu();
  }
