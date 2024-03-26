let $=document
const inputElem=$.getElementById('itemInput')
const addButton=$.getElementById('addButton')
const clearButton=$.getElementById('clearButton')
const todoListElem=$.getElementById('todoList')
let todoArrays=[]

function addNewTodo(){
  
    console.log('addNewTodo');
    let newTodoTitle=inputElem.value
    // console.log(newTodoTitle);
    newTodoObj={ 
        id:todoArrays.length+1,
        title:newTodoTitle,
        complete:false
    }
    todoArrays.push(newTodoObj)
    setLocalStorage(todoArrays)
    todosGenerator(todoArrays)
    // console.log(todoArrays);
    inputElem.focus()
    inputElem.value=''
}

function setLocalStorage(todoList){
localStorage.setItem('todos',JSON.stringify(todoList))
}
function todosGenerator(todosList){
    let newTodoLiElem,newTodoLablElem,newTodoCompleteBtn,newTodoDeleteBtn
    todoListElem.innerHTML=''

    todosList.forEach(function(todo){
        newTodoLiElem=$.createElement('li')
        newTodoLiElem.className="completed well"

        newTodoLablElem=$.createElement('label')
        newTodoLablElem.innerHTML=todo.title

        newTodoCompleteBtn=$.createElement('button')
        newTodoCompleteBtn.className="btn btn-success"
        newTodoCompleteBtn.innerHTML='Complete'
        newTodoCompleteBtn.setAttribute('onclick','editTodo('+todo.id+')')

        newTodoDeleteBtn=$.createElement('button')
        newTodoDeleteBtn.className="btn btn-danger"
        newTodoDeleteBtn.innerHTML='Delete'
        newTodoDeleteBtn.setAttribute('onclick','removeTodo('+todo.id+')')
        if(todo.complete){
          newTodoLiElem.className="uncompleted well"
          newTodoCompleteBtn.innerHTML='uncomtable'
        }

        newTodoLiElem.append(newTodoLablElem,newTodoCompleteBtn,newTodoDeleteBtn)
    //    console.log(newTodoLiElem);
       todoListElem.append(newTodoLiElem)
    //    console.log(todoListElem);

    })
}
    function editTodo(todoId){
        let localStoragetodo=JSON.parse(localStorage.getItem('todos'))
        todoArrays=localStoragetodo
        // console.log(todoArrays);
        // console.log('complete');
        todoArrays.forEach(function(todo){
          
            if(todo.id===todoId){
               todo.complete=!todo.complete
            //    console.log( todo.complete);
            }
        })
setLocalStorage(todoArrays)
todosGenerator(todoArrays)
    }
    function removeTodo(todoId){
let localStoragetodo=JSON.parse(localStorage.getItem('todos'))
todoArrays=localStoragetodo
let mainIndex=todoArrays.findIndex(function(todo){
    return todo.id==todoId
})
todoArrays.splice(mainIndex,1)
setLocalStorage(todoArrays)
todosGenerator(todoArrays)
console.log('remove');
    

}
function getLocalStorage(){
   let localStorageTodo=JSON.parse(localStorage.getItem('todos'))
   console.log(localStorageTodo);
   if(localStorageTodo){
    todoArrays=localStorageTodo
   }else{
    todoArrays=[]
   }
   todosGenerator(todoArrays)
}
function cleartodos(){
    // console.log('clear');
todoArrays=[]
localStorage.removeItem('todos')
todosGenerator(todoArrays)

}

addButton.addEventListener('click',addNewTodo)
window.addEventListener('load',getLocalStorage)
clearButton.addEventListener('click',cleartodos)
inputElem.addEventListener('keydown',function(event){
    // console.log(event);
    if(event.code=="Enter")
  {
    addNewTodo()
  } 
})