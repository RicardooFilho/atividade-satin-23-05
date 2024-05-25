const taskKey = '@tasks'

// Função para adicionar tarefa
function addTask(event) {
  event.preventDefault() // Evita o recarregamento da página
  const taskId = new Date().getTime()
  const taskList = document.querySelector('#taskList')

  const form = document.querySelector('#taskForm')
  const formData = new FormData(form)

  const taskTitle = formData.get('title')
  const taskDescription = formData.get('description')

  const li = document.createElement('li')

  li.id = taskId
  li.innerHTML = `
      <button onclick="openModal(event)">✏️</button>
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
  `

  taskList.appendChild(li)

  // Salvar tarefas no localStorage
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  tasks.push({ title: taskTitle, description: taskDescription })
  localStorage.setItem(taskKey, JSON.stringify(tasks))

  form.reset()
}

function openModal(event) {

  const task = event.target.parentElement
  const taskTitle = task.querySelector('h2').innerText
  const taskDescription = task.querySelector('p').innerText

  const body = document.querySelector('body');
  const dialog = document.createElement('dialog');
  
  const form = document.createElement('form');
  const inputTitle = document.createElement('input');
  const textareaDescription = document.createElement('textarea');
  const editButton = document.createElement('button');
  const cancelButton = document.createElement('button');
  cancelButton.onclick = () => dialog.close;

  inputTitle.type = "text";
  inputTitle.name = "title";
  inputTitle.id = "title";
  inputTitle.placeholder = "Informe o novo título da tarefa";
  inputTitle.value = taskTitle;

  textareaDescription.name = "description";
  textareaDescription.id = "description";
  textareaDescription.placeholder = "Informe a nova descrição da tarefa";
  textareaDescription.value = taskDescription;

  cancelButton.textContent = "Cancelar";
  editButton.textContent = "Editar";

  form.appendChild(inputTitle);
  form.appendChild(textareaDescription);
  form.appendChild(editButton);
  form.appendChild(cancelButton);
  dialog.appendChild(form);
  body.append(dialog);

  dialog.showModal();
}


// Carregar tarefas do localStorage ao recarregar a página
window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  const taskList = document.querySelector('#taskList')
  taskList.innerHTML = tasks
    .map((task) => `<li><button title="Editar tarefa" onClick="openModal(event)">✏️</button><h2>${task.title}</h2><p>${task.description}</p></li>`)
    .join('')
})
