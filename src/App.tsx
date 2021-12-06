import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {InputWithButton} from "./components/InputWhithButton";
export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksType = {[key:string]:Array<TaskType>}

function App() {
    let tododlist_1 = v1()
    let tododlist_2 = v1()

    let [todolists, setTodolists] = useState <Array<TodolistType>>([
        {id: tododlist_1, title: "What to learn", filter: "all"},
        {id: tododlist_2, title: "What to buy", filter: "all"},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [tododlist_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [tododlist_2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    })
    function removeTask(id: string,todolistID:string) {
        setTasks({...tasks, [todolistID]:tasks[todolistID].filter(f=>f.id!==id)})
    }
    function onChangeTitleTodolist(newTitle: string,todolistID:string){
        setTodolists(todolists.map(m=>m.id===todolistID ? {...m, title:newTitle}:m))
    }

    function addTask(title: string,todolistID:string) {

        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]:[task,...tasks[todolistID]]})

    }

    function changeStatus(taskId: string, isDone: boolean,todolistID:string) {

        setTasks({...tasks,[todolistID]:tasks[todolistID].map( m => m.id===taskId ? {...m,isDone:isDone }:m)})
    }

    function onChangeTitle(taskId: string, title:string,todolistID:string){
        setTasks({...tasks,[todolistID]:tasks[todolistID].map(m=>m.id===taskId ? {...m,title:title}:m)})
    }

    function changeFilter(value: FilterValuesType, todolistID:string) {
        setTodolists(todolists.map(m=>m.id===todolistID ? {...m,filter:value}:m))
    }

    function removeTodolist(todolistID:string){
        setTodolists(todolists.filter(fl=>fl.id!==todolistID))
        delete tasks[todolistID]
        setTasks({...tasks})
    }

    function addTodolist(title:string){
        let todolist:TodolistType = {
            id:v1(),
            title:title,
            filter:'all'
        }
        setTodolists([todolist,...todolists])
        setTasks({...tasks,[todolist.id]:[]})
    }

    return (
        <div className="App">
            <InputWithButton callback={addTodolist} />
            {todolists.map(m => {
                let tasksForTodolist = tasks[m.id];

                if (m.filter === "active") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone === false);
                }
                if (m.filter === "completed") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone === true);
                }
                return <Todolist
                    key={m.id}
                    todolistID={m.id}
                    title={m.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={m.filter}
                    removeTodolist={removeTodolist}
                    onChangeTitle={onChangeTitle}
                    onChangeTitleTodolist={onChangeTitleTodolist}

                />
            })}

        </div>
    );
}

export default App;
