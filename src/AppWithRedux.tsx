import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {InputWithButton} from "./components/InputWhithButton";
import {
	AppBar,
	Button,
	Container,
	Grid,
	IconButton,
	LinearProgress,
	Paper,
	Toolbar,
	Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
	addTodolistTC,
	ChangeTodolistFilterAC,
	changeTodolistTitleTC,
	FilterValuesType,
	getTodosTC,
	removeTodosTC,
	TodolistDomainType
} from "./reducer/todolists-reducer";
import {addTaskTC, removeTaskTC, TasksType, updateTaskTC} from "./reducer/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {TaskStatuses} from "./api/TodolistApi";
import ErrorSnackbar from "./components/ErrorSnackbar";
import {RequestStatusType} from "./reducer/app-reducer";


export const AppWithRedux = React.memo(() => {
	const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolist)
	const tasks = useSelector<AppRootStateType, TasksType>(state => state.task)
	const dispatch = useDispatch()

	const removeTask = useCallback((id: string, todolistID: string) => {
		dispatch(removeTaskTC(todolistID, id))
	}, [])
	const addTask = useCallback((title: string, todolistID: string) => {
		dispatch(addTaskTC(title, todolistID))
	}, [])
	const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistID: string) => {
		dispatch(updateTaskTC(taskId, {status}, todolistID))
	}, [])
	const onChangeTitle = useCallback((taskId: string, title: string, todolistID: string) => {
		dispatch(updateTaskTC(taskId, {title}, todolistID))
	}, [])
	const changeFilter = useCallback((value: FilterValuesType, todolistID: string) => {
		const action = ChangeTodolistFilterAC(value, todolistID)
		dispatch(action)
	}, [])
	const removeTodolist = useCallback((todolistID: string) => {
		dispatch(removeTodosTC(todolistID))
	}, [])
	const onChangeTitleTodolist = useCallback((newTitle: string, todolistID: string) => {
		dispatch(changeTodolistTitleTC(todolistID,newTitle))
	}, [dispatch])
	const addTodolist = useCallback((title: string) => {
		dispatch(addTodolistTC(title))
	}, [dispatch])

	useEffect(() => {
		dispatch(getTodosTC())
	}, [])

	const status = useSelector<AppRootStateType, RequestStatusType>(state=>state.app.status)
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
			{status === "loading" && <LinearProgress color="secondary"/>}
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
									todolist={m}
									// todolistID={m.id}
									// title={m.title}
									tasks={tasksForTodolist}
									removeTask={removeTask}
									changeFilter={changeFilter}
									addTask={addTask}
									changeTaskStatus={changeStatus}
									// filter={m.filter}
									removeTodolist={removeTodolist}
									onChangeTitle={onChangeTitle}
									onChangeTitleTodolist={onChangeTitleTodolist}

								/>
							</Paper>
						</Grid>
					})}

				</Grid>
			</Container>
			<ErrorSnackbar/>
		</div>
	);
})

export default AppWithRedux;
