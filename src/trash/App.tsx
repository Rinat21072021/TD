import React, {useState} from 'react';
import '../App.css';
import {Todolist} from '../Todolist';
import {v1} from 'uuid';
import {InputWithButton} from "../components/InputWhithButton";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodolistDomainType} from "../reducer/todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/TodolistApi";

export type FilterValuesType = "all" | "active" | "completed";


export type TasksType = { [key: string]: Array<TaskType> }

function App() {
	let tododlist_1 = v1()
	let tododlist_2 = v1()

	let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
		{id: tododlist_1, title: "What to learn", filter: "all",addedDate: '',order: 0, entityStatus:'idle'},
		{id: tododlist_2, title: "What to buy", filter: "all",addedDate: '',order: 0, entityStatus:'idle'},
	])

	let [tasks, setTasks] = useState<TasksType>({
		[tododlist_1]: [
			{id: v1(), title: "HTML&CSS", status:TaskStatuses.Completed,todoListId:'tododlist_1',
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
			{id: v1(), title: "ReactJS",  status:TaskStatuses.New,todoListId:'tododlist_2',
				startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
			{id: v1(), title: "Book",  status:TaskStatuses.New,todoListId:'tododlist_2',
				startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
			{id: v1(), title: "GraphQL",  status:TaskStatuses.New,todoListId:'tododlist_2',
				startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
		]
	})

	function removeTask(id: string, todolistID: string) {
		setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== id)})
	}

	function addTask(title: string, todolistID: string) {
		let task = {id: v1(), title: title, status:TaskStatuses.New,todoListId:'tododlist_2',
			startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''};
		setTasks({...tasks, [todolistID]: [task, ...tasks[todolistID]]})

	}

	function changeStatus(taskId: string, status:TaskStatuses, todolistID: string) {

		setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId ? {...m, status} : m)})
	}

	function onChangeTitle(taskId: string, title: string, todolistID: string) {
		setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId ? {...m, title: title} : m)})
	}

	function changeFilter(value: FilterValuesType, todolistID: string) {
		setTodolists(todolists.map(m => m.id === todolistID ? {...m, filter: value} : m))
	}

	function removeTodolist(todolistID: string) {
		setTodolists(todolists.filter(fl => fl.id !== todolistID))
		delete tasks[todolistID]
		setTasks({...tasks})
	}
	function onChangeTitleTodolist(newTitle: string, todolistID: string) {
		setTodolists(todolists.map(m => m.id === todolistID ? {...m, title: newTitle} : m))
	}
	function addTodolist(title: string) {
		const newTodolistID=v1()
		let todolist: TodolistDomainType = {
			id: newTodolistID,
			title: title,
			filter: 'all',
			addedDate: '',
			order: 0,
			entityStatus:'idle'
		}
		setTodolists([todolist, ...todolists])
		setTasks({...tasks, [todolist.id]: []})
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
				<Grid container spacing={4} >

						{todolists.map(m => {
							let tasksForTodolist = tasks[m.id];

							if (m.filter === "active") {
								tasksForTodolist = tasks[m.id].filter(t => t.status === TaskStatuses.New);
							}
							if (m.filter === "completed") {
								tasksForTodolist = tasks[m.id].filter(t => t.status === TaskStatuses.Completed);
							}
							return <Grid item key={m.id}>
							<Paper elevation={5} style={{padding:"20px"}}>
							<Todolist
								todolist={m}
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
		</div>
	);
}

export default App;
