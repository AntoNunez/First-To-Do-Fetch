import React from "react";

//include images into your bundle
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Home() {
	let nameRef = useRef(null);
	const [task, setTask] = useState([]);
	const [todos, setTodos] = useState([]);
	const [urlApi] = useState(
		"https://assets.breatheco.de/apis/fake/todos/user/AntoNunez"
	);
	//POST//
	const getUser = url => {
		console.log(url);
		fetch(url, {
			method: "POST",
			body: JSON.stringify([]),
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				if (data.msg) {
				}
				getTodos(url);
			})
			.catch(error => console.log(error));
	};

	//GET//
	useEffect(() => {
		getTodos(urlApi);
	}, []);

	const getTodos = url => {
		fetch(url)
			.then(response => response.json())
			.then(data => {
				console.log(data);
				if (data.msg) {
					console.log(data.msg);
					getUser(url);
				} else {
					setTodos(data);
				}
			})

			.catch(error => console.log(error));
	};

	//ENTER//
	const AddTask = e => {
		if (e.key == "Enter" && nameRef.value !== "") {
			setTask(task.concat(nameRef.value));
			nameRef.value = "";
		}
	};

	// BUTTON//
	const AddTaskButton = e => {
		if (nameRef.value !== "") setTask(task.concat(nameRef.value));
		nameRef.value = "";
	};

	////DELETE////

	const deleteAll = () => {
		fetch(urlApi, {
			method: "DELETE",
			headers: {
				"content-type": "application/json"
			}
		})
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(error => console.log(error));
	};

	//DELETE TASK//

	const DeleteTask = index => {
		task.splice(index, 1);
		setTask([...task]);
	};

	////CLEAN TODOS/////
	const cleanTodos = () => {
		setTask([]);
		///
		deleteAll(urlApi);
	};

	return (
		<div className="container">
			<div className="card mt-5">
				<div className="card-body">
					<h5 className="card-title text-center">TODO </h5>
					<ul className="list-group list-group-flush">
						<div className="input-group mb-3 list-group list-group-flush">
							<input
								onKeyUp={AddTask}
								ref={r => (nameRef = r)}
								type="text"
								id="input"
								className="list-group-item"
								placeholder="Enter your new task "
							/>
							<div className="d-grid gap-2 col-6 mx-auto mt-2 input-group-append list-group list-group-flush">
								<button
									className="btn btn-outline-success"
									onClick={() => getUser(urlApi)}
									type="button"
									id="buttonUser">
									Create User
								</button>
								<button
									className="btn btn-outline-primary"
									onClick={AddTaskButton}
									type="button"
									id="buttonAdd">
									(+) Add Task
								</button>
							</div>
						</div>
						{!!task.length > 0 &&
							task.map((value, index) => {
								return (
									<li
										className="list-group-item d-flex justify-content-between"
										key={index}>
										{value}
										<button
											className="btn btn-danger"
											onClick={() => DeleteTask(index)}>
											<FontAwesomeIcon
												icon={faTrashCan}
											/>
										</button>
									</li>
								);
							})}
					</ul>
				</div>
				<div className="card-footer text-muted d-flex justify-content-between">
					{task.length} : Items Left
					<button
						className="btn btn-danger me-3"
						onClick={cleanTodos}>
						<FontAwesomeIcon icon={faTrashCan} />
					</button>
				</div>
			</div>
		</div>
	);
}
export default Home;
