import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {InputWithButton} from "./components/InputWhithButton";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
	AddTodolistAC,
	ChangeTodolistFilterAC,
	ChangeTodolistTitleAC, initialState,
	RemoveTodolistAC,
	todolistsReducer
} from "./reducer/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducer/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}
export type TasksType = { [key: string]: Array<TaskType> }

function AppWithRedux() {

	const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolist)
const tasks = useSelector<AppRootStateType, TasksType>(state=> state.task)
	const dispatch = useDispatch()


	function removeTask(id: string, todolistID: string) {
		// setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== id)})
		const action = removeTaskAC(id, todolistID)
		dispatch(action)
	}

	function addTask(title: string, todolistID: string) {
		// let task = {id: v1(), title: title, isDone: false};
		// setTasks({...tasks, [todolistID]: [task, ...tasks[todolistID]]})
		const action = addTaskAC(title, todolistID)
		dispatch(action)

	}

	function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
		// setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId ? {...m, isDone: isDone} : m)})
		const action = changeTaskStatusAC(taskId, isDone, todolistID)
		dispatch(action)
	}

	function onChangeTitle(taskId: string, title: string, todolistID: string) {
		// setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId ? {...m, title: title} : m)})
		const action = changeTaskTitleAC(taskId, title, todolistID)
		dispatch(action)
	}

	function changeFilter(value: FilterValuesType, todolistID: string) {
		// setTodolists(todolists.map(m => m.id === todolistID ? {...m, filter: value} : m))
		const action = ChangeTodolistFilterAC(value, todolistID)
		dispatch(action)
	}

	function removeTodolist(todolistID: string) {
		// setTodolists(todolists.filter(fl => fl.id !== todolistID))
		// delete tasks[todolistID]
		// setTasks({...tasks})
		const action = RemoveTodolistAC(todolistID)
		dispatch(action)
	}

	function onChangeTitleTodolist(todolistID: string, newTitle: string) {
		// setTodolists(todolists.map(m => m.id === todolistID ? {...m, title: newTitle} : m))
		const action = ChangeTodolistTitleAC(todolistID, newTitle)
		dispatch(action)
	}

	function addTodolist(title: string) {
		// 	const newTodolistID = v1()
		// 	let todolist: TodolistType = {
		// 		id: newTodolistID,
		// 		title: title,
		// 		filter: 'all'
		// 	}
		// 	setTodolists([todolist, ...todolists])
		// 	setTasks({...tasks, [todolist.id]: []})
		const action = AddTodolistAC(title)
		dispatch(action)

	}

	return (
		<div className="App">

			<AppBar position="static">
				<Toolbar style={{justifyContent: "space-between"}}>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<Menu/>
					</IconButton>
					<Typography variant="h6">
						TodoList
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container style={{padding: "30px 0"}}>
					<InputWithButton isLabel={true} callback={addTodolist}/>
				</Grid>
				<Grid container spacing={4}>

					{todolists.map(m => {
						let tasksForTodolist = tasks[m.id];

						if (m.filter === "active") {
							tasksForTodolist = tasks[m.id].filter(t => t.isDone );
						}
						if (m.filter === "completed") {
							tasksForTodolist = tasks[m.id].filter(t => !t.isDone);
						}
						return <Grid item key={m.id}>
							<Paper elevation={5} style={{padding: "20px"}}>
								<Todolist
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
							</Paper>
						</Grid>
					})}

				</Grid>
			</Container>
		</div>
	);
}

export default AppWithRedux;
