import {addTaskAC, updateTaskAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {TasksType} from '../App';
import {AddTodolistAC, RemoveTodolistAC} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/TodolistApi";

let startState: TasksType

beforeEach(() => {
	startState = {
		"tododlist_1": [
			{id: v1(), title: "HTML&CSS",status:TaskStatuses.Completed,todoListId:'tododlist_1',
				startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
			{id: v1(), title: "JS", status:TaskStatuses.Completed,todoListId:'tododlist_1',
				startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
			{id: v1(), title: "ReactJS", status:TaskStatuses.New,todoListId:'tododlist_1',
				startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
		],
		"tododlist_2": [
			{id: v1(), title: "Milk", status:TaskStatuses.Completed,todoListId:'tododlist_2',
				startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
			{id: v1(), title: "JS", status:TaskStatuses.Completed,todoListId:'tododlist_2',
				startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
			{id: v1(), title: "ReactJS", status:TaskStatuses.New,todoListId:'tododlist_2',
				startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''}
		]
	};
})

test('correct task should be deleted from correct array', () => {
	const action = removeTaskAC("2", "todolistId2");
	const endState = tasksReducer(startState, action)

	expect(endState).toEqual({
		"todolistId1": [
			{id: "1", title: "CSS", isDone: false},
			{id: "2", title: "JS", isDone: true},
			{id: "3", title: "React", isDone: false}
		],
		"todolistId2": [
			{id: "1", title: "bread", isDone: false},
			{id: "3", title: "tea", isDone: false}
		]
	});

});
test('correct task should be added to correct array', () => {
	const action = addTaskAC("juce", "todolistId2");
	const endState = tasksReducer(startState, action)

	expect(endState["todolistId1"].length).toBe(3);
	expect(endState["todolistId2"].length).toBe(4);
	expect(endState["todolistId2"][0].id).toBeDefined();
	expect(endState["todolistId2"][0].title).toBe('juce');
	expect(endState["todolistId2"][0].isDone).toBe(false);
})
test('status of specified task should be changed', () => {
	const action = updateTaskAC("2", false, "todolistId2");
	const endState = tasksReducer(startState, action)

	expect(endState["todolistId2"][1].isDone).toBe(false);
	expect(endState["todolistId1"][1].isDone).toBe(true);
});
test('title of specified task should be changed', () => {
	const action = changeTaskTitleAC("2", 'bay', "todolistId2");
	const endState = tasksReducer(startState, action)

	expect(endState["todolistId2"][1].title).toBe('bay');
	expect(endState["todolistId1"][1].title).toBe('JS');
});
test('new array should be added when new todolist is added', () => {
	const action = AddTodolistAC("new todolist");
	const endState = tasksReducer(startState, action)
	const keys = Object.keys(endState);
	const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
	if (!newKey) {
		throw Error("new key should be added")
	}

	expect(keys.length).toBe(3);
	expect(endState[newKey]).toEqual([]);
})
test('property with todolistId should be deleted', () => {
	const action = RemoveTodolistAC("todolistId2");
	const endState = tasksReducer(startState, action)
	const keys = Object.keys(endState);

	expect(keys.length).toBe(1);
	expect(endState["todolistId2"]).not.toBeDefined();
});

