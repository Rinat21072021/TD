import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {InputWithButton} from "./components/InputWhithButton";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
	AddTodolistAC,
	ChangeTodolistFilterAC,
	ChangeTodolistTitleAC,
	RemoveTodolistAC,
	todolistsReducer
} from "./reducer/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducer/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}
export type TasksType = { [key: string]: Array<TaskType> }

function AppWithReducer() {
	let tododlist_1 = v1()
	let tododlist_2 = v1()

	let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
		{id: tododlist_1, title: "What to learn", filter: "all"},
		{id: tododlist_2, title: "What to buy", filter: "all"},
	])

	let [tasks, dispatchTasks] = useReducer(tasksReducer, {
		[tododlist_1]: [
			{id: v1(), title: "HTML&CSS", isDone: true},
			{id: v1(), title: "JS", isDone: true},
			{id: v1(), title: "ReactJS", isDone: false},
			{id: v1(), title: "Rest API", isDone: false},
			{id: v1(), title: "GraphQL", isDone: false},
		],
		[tododlist_2]: [
			{id: v1(), title: "Milk", isDone: true},
			{id: v1(), title: "JS", isDone: true},
			{id: v1(), title: "ReactJS", isDone: false},
			{id: v1(), title: "Book", isDone: false},
			{id: v1(), title: "GraphQL", isDone: false},
		]
	})

	function removeTask(id: string, todolistID: string) {
		// setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== id)})
		const action = removeTaskAC(id, todolistID)
		dispatchTasks(action)
	}

	const addTask= useCallback((title: string, todolistID: string)=> {
		// let task = {id: v1(), title: title, isDone: false};
		// setTasks({...tasks, [todolistID]: [task, ...tasks[todolistID]]})
		const action = addTaskAC(title, todolistID)
		dispatchTasks(action)

	},[dispatchTasks])

	function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
		// setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId ? {...m, isDone: isDone} : m)})
		const action = changeTaskStatusAC(taskId, isDone, todolistID)
		dispatchTasks(action)
	}

	function onChangeTitle(taskId: string, title: string, todolistID: string) {
		// setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId ? {...m, title: title} : m)})
		const action = changeTaskTitleAC(taskId, title, todolistID)
		dispatchTasks(action)
	}

	function changeFilter(value: FilterValuesType, todolistID: string) {
		// setTodolists(todolists.map(m => m.id === todolistID ? {...m, filter: value} : m))
		const action = ChangeTodolistFilterAC(value, todolistID)
		dispatchTodolists(action)
	}

	function removeTodolist(todolistID: string) {
		// setTodolists(todolists.filter(fl => fl.id !== todolistID))
		// delete tasks[todolistID]
		// setTasks({...tasks})
		const action = RemoveTodolistAC(todolistID)
		dispatchTodolists(action)
		dispatchTasks(action)
	}

	function onChangeTitleTodolist(todolistID: string, newTitle: string) {
		// setTodolists(todolists.map(m => m.id === todolistID ? {...m, title: newTitle} : m))
		const action = ChangeTodolistTitleAC(todolistID, newTitle)
		dispatchTodolists(action)
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
		dispatchTodolists(action)
		dispatchTasks(action)
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
							tasksForTodolist = tasks[m.id].filter(t => t.isDone === false);
						}
						if (m.filter === "completed") {
							tasksForTodolist = tasks[m.id].filter(t => t.isDone === true);
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

export default AppWithReducer;
