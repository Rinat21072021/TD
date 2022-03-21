import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {InputWithButton} from "./components/InputWhithButton";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
	AddTodolistAC, addTodolistTC,
	ChangeTodolistFilterAC,
	ChangeTodolistTitleAC, changeTodolistTitleTC,
	FilterValuesType, getTodosAC, getTodosTC,
	RemoveTodolistAC, removeTodosTC,
	TodolistDomainType
} from "./reducer/todolists-reducer";
import {
	addTaskTC,
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC,
	removeTaskTC,
	TasksType
} from "./reducer/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {TaskStatuses} from "./api/TodolistApi";


export const AppWithRedux = React.memo(() => {

	useEffect(() => {
		dispatch(getTodosTC())
	}, [])

	const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolist)
	const tasks = useSelector<AppRootStateType, TasksType>(state => state.task)
	const dispatch = useDispatch()


	const removeTask = useCallback((id: string, todolistID: string) => {
		debugger
		dispatch(removeTaskTC(todolistID, id))
	}, [])

	const addTask = useCallback((title: string, todolistID: string) => {
		debugger
		dispatch(addTaskTC(title, todolistID))

	}, [])

	const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistID: string) => {
		const action = changeTaskStatusAC(taskId, status, todolistID)
		dispatch(action)
	}, [])

	const onChangeTitle = useCallback((taskId: string, title: string, todolistID: string) => {
		// setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId ? {...m, title: title} : m)})
		const action = changeTaskTitleAC(taskId, title, todolistID)
		dispatch(action)
	}, [])

	const changeFilter = useCallback((value: FilterValuesType, todolistID: string) => {
		// setTodolists(todolists.map(m => m.id === todolistID ? {...m, filter: value} : m))
		const action = ChangeTodolistFilterAC(value, todolistID)
		dispatch(action)
	}, [])

	const removeTodolist = useCallback((todolistID: string) => {
		// setTodolists(todolists.filter(fl => fl.id !== todolistID))
		// delete tasks[todolistID]
		// setTasks({...tasks})

		dispatch(removeTodosTC(todolistID))
	}, [])

	const onChangeTitleTodolist = useCallback((newTitle: string, todolistID: string) => {
		// const action = ChangeTodolistTitleAC(newTitle, todolistID)
		dispatch(changeTodolistTitleTC(todolistID,newTitle))
	}, [dispatch])

	const addTodolist = useCallback((title: string) => {
		dispatch(addTodolistTC(title))
	}, [dispatch])

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
							tasksForTodolist = tasks[m.id].filter(t => t.status === TaskStatuses.Completed);
						}
						if (m.filter === "completed") {
							tasksForTodolist = tasks[m.id].filter(t => t.status === TaskStatuses.New);
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
})

export default AppWithRedux;
