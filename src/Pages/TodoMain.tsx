import { Button, Center, FormLabel, Input, Text, Textarea } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { AddingLocalStorage, GetLocalStorageTodoList, TodoRemoveHandler } from './AddingLocalStorage';

export interface Todo {
    id: number,
    title: string,
    description: string
}

const TodoMain: React.FC = () => {
    const [todo, setTodo] = useState({
      title: '',
      description: ''
  });
  const [reloaditem, setReloadItem] = useState <number> (0)
  const [todoItems, setTodoItems] = useState<Todo[]>([])
    const todoarr: Todo[] = []

    const TodoHandler = (e: any) => {
        e.preventDefault();
        const id = Math.floor((Math.random() * 100) + 1)
        const newtodo: Todo = {...todo, id}
        
        setReloadItem(id)

        AddingLocalStorage(newtodo)
        e.target.reset()
    }
     useEffect(() => {
        const items = GetLocalStorageTodoList();
        if(items){
          setTodoItems([...items])
        }
        else{
          return 
        }
     }, [reloaditem]);
    const ClickHandler = (id: number) => {
      TodoRemoveHandler(id)      
      setReloadItem(id)
      console.log('from handlehr', id)
    }
     console.log('todoItems',todoItems)
  return (
    <div style={{width: '100%'}}>
    <Text className='main_title' textAlign="center" fontWeight='bold' fontSize='5xl' color='tomato'>MY TODO APPS</Text>
        <Center>
            <div className='create_section' style={{width: '50%'}}>
                <Text className='add_title' textAlign="center" fontWeight='bold' fontSize='3xl' >Add Your Todo Task</Text>
              <form onSubmit={TodoHandler}>
              <FormLabel  fontWeight='bold' className='formlabel'>Task Title</FormLabel>
                <Input onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => {
                    const title = e.target.value
                    setTodo({...todo, title})
                }} className='inputs' placeholder='WRITE YOUR TODO TITLE' size='md' />
                <FormLabel  fontWeight='bold' className='formlabel'>Task Description</FormLabel>
                <Textarea onBlur={(e) => {
                    const description = e.target.value
                    setTodo({...todo, description})
                }} className='text_area' placeholder='WRITE YOUR TASK DESCRIPTION' />
                <Button type="submit" className='Buttons' colorScheme='teal' size='sm'>ADD</Button>
              </form>
            </div>
        </Center>
        <Text className='main_title' textAlign="center" fontWeight='bold' fontSize='5xl' color='green'>Todo List</Text>
           <div className='view_section'>
                {
                  todoItems?.map(item => 
                  <div key={item.id} className='todo_colam'>
                     <Text className='main_title' textAlign="center" fontWeight='bold' fontSize='22px'>{item?.title}</Text>
                     <Text className='main_title' textAlign="center" fontWeight='bold' fontSize='18px'>{item?.description}</Text>
                     <Center><Button onClick={() => ClickHandler(item.id)} className='delete_buttons' colorScheme='red' size='sm'>DELETE</Button></Center>
                  </div>)
                }
          </div>
      
    </div>
  )
}

export default TodoMain
