import React, {useCallback, useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {InputWithButton} from "./components/InputWhithButton";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
	AddTodolistAC,
	ChangeTodolistFilterAC,
	ChangeTodolistTitleAC,
	FilterValuesType,
	RemoveTodolistAC,
	todolistsReducer
} from "./reducer/todolists-reducer";
import {
	addTaskAC,
	addTaskTC,
	updateTaskAC,
	changeTaskTitleAC,
	removeTaskAC,
	tasksReducer
} from "./reducer/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/TodolistApi";


export type TasksType = { [key: string]: Array<TaskType> }

function AppWithReducer() {
	let tododlist_1 = v1()
	let tododlist_2 = v1()

	let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
		{id: tododlist_1, title: "What to learn", filter: "all",addedDate: '',
			order: 0},
		{id: tododlist_2, title: "What to buy", filter: "all", addedDate: '',
			order: 0},
	])

	let [tasks, dispatchTasks] = useReducer(tasksReducer, {
		[tododlist_1]: [
			{id: v1(), title: "HTML&CSS",status:TaskStatuses.Completed,todoListId:'tododlist_1',
				startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
			{id: v1(), title: "JS", status:TaskStatuses.Completed,todoListId:'tododlist_1',
				startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
			{id: v1(), title: "ReactJS", status:TaskStatuses.New,todoListId:'tododlist_1',
				startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
			{id: v1(), title: "Rest API", status:TaskStatuses.New,todoListId:'tododlist_1',
				startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
			{id: v1(), title: "GraphQL", status:TaskStatuses.New,todoListId:'tododlist_1',
				startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
		],
		[tododlist_2]: [
			{id: v1(), title: "Milk", status:TaskStatuses.Completed,todoListId:'tododlist_2',
				startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
			{id: v1(), title: "JS", status:TaskStatuses.Completed,todoListId:'tododlist_2',
				startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
			{id: v1(), title: "ReactJS", status:TaskStatuses.New,todoListId:'tododlist_2',
				startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
			{id: v1(), title: "Book", status:TaskStatuses.New,todoListId:'tododlist_2',
				startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
			{id: v1(), title: "GraphQL", status:TaskStatuses.New,todoListId:'tododlist_2',
				startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
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
		const action = addTaskTC(title, todolistID)
		dispatchTasks(addTaskAC({id: v1(), title: title,status:TaskStatuses.New,todoListId: todolistID,
			startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},))

	},[dispatchTasks])

	function changeStatus(taskId: string, status:TaskStatuses, todolistID: string) {
		// setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId ? {...m, isDone: isDone} : m)})
		const action = updateTaskAC(taskId, {status}, todolistID)
		dispatchTasks(action)
	}

	function onChangeTitle(taskId: string, title: string, todolistID: string) {
		// setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId ? {...m, title: title} : m)})
		const action = updateTaskAC(taskId, {title}, todolistID)
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
		const action = AddTodolistAC({
			title,
			order:0,
			id:v1(),
			addedDate:''
		})
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
							tasksForTodolist = tasks[m.id].filter(t => t.status === TaskStatuses.New);
						}
						if (m.filter === "completed") {
							tasksForTodolist = tasks[m.id].filter(t => t.status === TaskStatuses.Completed);
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
