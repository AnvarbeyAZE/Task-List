// Define UI
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const body = document.body;

//Load listeners
loadEventListeners();

function loadEventListeners(){
  //Dom Load event
  document.addEventListener('DOMContentLoaded',getTasks);

  form.addEventListener('submit',addTask);

  //We can add listenner on body , or we can add it on ul
  body.addEventListener('click',removeTask);

  clearBtn.addEventListener('click',removeAll);

  filter.addEventListener('keydown',filter_fn);

}
//Add task on event listenner
function addTask(e){
    if(taskInput.value ==='')
      alert('Add the Task');
    else{


      //Create li element and append it to ul
      const li = document.createElement('li');
      li.className='collection-item';
      console.log(taskInput.value);
      li.appendChild(document.createTextNode(taskInput.value));
      const link = document.createElement('a');
      link.className = 'delete-item secondary-content';
      link.innerHTML = '<i class="fa fa-remove"></i>';
      li.appendChild(link);
      taskList.appendChild(li);



      ///Store task to local storage
      storeTasktoLocalStorage(taskInput.value);
       //clear by the end of action*/
      taskInput.value ='';
    }





    // prevent redirect
    e.preventDefault();
}
// Search function
function filter_fn(e){
  let text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const item = task.firstChild.textContent;
      if(
        item.toLowerCase().indexOf(text) != -1
      ){
        task.style.display = 'block';
      }else{
        task.style.display ='none';
      }


    }
  );


}
//Clear all tasks
function removeAll(e){

 while(
   taskList.firstChild
 ){
   taskList.removeChild(taskList.firstChild);
 }
 //clear from the storage
 localStorage.clear();

}


function removeTask(e){
  if (e.target.parentElement.classList.contains('delete-item')){
    //consloe.log(e.target);
    if(confirm('Are you sure?')){

      //Remove Task from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);

    e.target.parentElement.parentElement.remove();
  }



  }


}

function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task,index){
    if(taskItem.textContent === task){
      tasks.splice(index,1);
    }
  });
  localStorage.setItem('tasks',JSON.stringify(tasks));

}



function storeTasktoLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

/// get task from local storage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }


  tasks.forEach(function(task){
        //Create li element and append it to ul from array
        const li = document.createElement('li');
        li.className='collection-item';
        console.log(taskInput.value);
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);

  });
}
