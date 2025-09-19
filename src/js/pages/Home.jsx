import '../../styles/pages/home.css'

import { useEffect, useState } from "react";

const URL_BASE_TODO = "https://playground.4geeks.com/todo"

const Home = () => {


	const [writtingTodo, setWrittingTodo] = useState({
		label: "",
		done: "",
	})

	const [todo, setTodo] = useState([])

	const handleChange = (event) => {
		setWrittingTodo({
			[event.target.name]: event.target.value
		})
	}

	//esta funcion trae las tareas de la api (GET)
	const getAllTask = async () => {
		try {
			const response = await fetch(`${URL_BASE_TODO}/users/veronica`)
			const data = await response.json()
			if (response.ok) {
				setTodo(data.todos)
			} else if (response.status == 404) {
				createUser()
			} else {
				throw new Error("Error al crear el usuario")
			}
		} catch (error) {
			console.log(error)
		}
	}

	const createUser = async () => {
		try {
			const response = await fetch(`${URL_BASE_TODO}/users/veronica`, {
				method: "POST"
			})
		} catch (error) {
			console.log(error)
		}
	}


	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!writtingTodo.label.trim()) return;
		try {
			const response = await fetch(`${URL_BASE_TODO}/todos/veronica`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					label: writtingTodo.label,
					is_done: false
				})
			});
			if (response.ok) {
				getAllTask();
			}
		} catch (error) {
			console.log(error);
		}
		setWrittingTodo({
			label: "",
			done: "",
		});
	}

	const deleteTask = async (id) => {
		try {
			const response = await fetch(`${URL_BASE_TODO}/todos/${id}`, {
				method: "DELETE",
			})
			if (response.ok) {
				getAllTask();
			}
		} catch (error) {
			console.log(error)
			
		}
	}

	useEffect(() => {
		getAllTask()
	}, [])

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="titulo col-12 col-md-7 text-center">
					<p>todos</p>
				</div>
				<div className="col-12 col-md-7 bg-white p-3 hojita">
					<form
						onSubmit={handleSubmit}
					>
						<div className="input-group flex-nowrap">
							<input
								type="text"
								name="label"
								className="letters form-control border-0 no-focus"
								placeholder="What needs to be done?"
								value={writtingTodo.label}
								aria-label="Username"
								aria-describedby="addon-wrapping"
								onChange={handleChange}
							/>
						</div>
					</form>
					<div className="col-12 col-md-7 ps-1 mt-3 w-100">{
						todo.map((item) => (
							<div key={item.id} className="taskToDo border-bottom d-flex justify-content-between align-items-center ps-2">
								<div className="letters">{item.label}</div>
								<div className="">
									<button type="button"
										className="btn-close delete-btn color-black no-focus"
										onClick={() => deleteTask(item.id)}
										aria-label="Close"
									></button>
								</div>
							</div>
						))
					}
					</div>
					<div className="align-items-start ps-0 pt-2 ms-0">
						{todo.length === 0 ? `Theres nothing to do, add something` : `${todo.length} items left`}
					</div>

				</div>

			</div>
		</div>
	);
};

export default Home;