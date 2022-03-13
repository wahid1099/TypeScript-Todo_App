import { Todo } from "./TodoMain";


const AddingLocalStorage = (todo: Todo) => {

    const ExistsTodo = localStorage.getItem('TodoList')
    
    if(ExistsTodo){
        const todos: Todo[] = JSON.parse(ExistsTodo);
        const TodoList = [...todos, todo]
        const newTodoList = JSON.stringify(TodoList)
        localStorage.setItem('TodoList', newTodoList)
        
    }
    else{
        const TodoList: Todo[] = [todo]
        const newTodoList = JSON.stringify(TodoList)
        localStorage.setItem('TodoList', newTodoList)
    }
}
const GetLocalStorageTodoList = () => {
    const TodoExists = localStorage.getItem('TodoList');
    return TodoExists ? JSON.parse(TodoExists) : null
}
const TodoRemoveHandler = (id: number) => {
    const ExistsTodo = localStorage.getItem('TodoList');
    console.log('this is id', id)
    if(ExistsTodo)
    {
       const  TodoList: Todo[] = JSON.parse(ExistsTodo)
        if(TodoList)
        {
            const FilterList = TodoList.filter(item => item.id !== id)
            const newTodoList = JSON.stringify(FilterList)
            localStorage.setItem('TodoList', newTodoList)
        }
        else{
           
            
        }
    }
    else{
       
    }
}
export {AddingLocalStorage, GetLocalStorageTodoList, TodoRemoveHandler};