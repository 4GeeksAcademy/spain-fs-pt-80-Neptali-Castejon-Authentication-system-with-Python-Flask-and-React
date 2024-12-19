const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			login: async formData => {
				try {
					const resp = await fetch('https://automatic-guacamole-xg5r7q46g6rf9qq4-3001.app.github.dev/api/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(formData)
					})
			
					if (!resp.ok) throw new Error('Error al autenticar usuario')
			
					const data = await resp.json()
					if (data.token) {
						setStore({ token: data.token })
						localStorage.setItem('token', data.token)
					} else {
						throw new Error('Token no recibido')
					}
			
				} catch (error) {
					console.error(error)
					alert('Ocurrió un problema al iniciar sesión. Por favor, intenta de nuevo.')
				}
			},
			register: async formData => {
				try {
					const resp = await fetch('https://automatic-guacamole-xg5r7q46g6rf9qq4-3001.app.github.dev/api/register', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(formData)
					})
			
					if (!resp.ok) throw new Error('Error al registrar usuario')
			
					const data = await resp.json()
					if (data.token) {
						setStore({ token: data.token })
						localStorage.setItem('token', data.token)
					} else {
						throw new Error('Token no recibido')
					}
			
				} catch (error) {
					console.error(error)
					alert('Ocurrió un problema al registrarte. Por favor, intenta de nuevo.')
				}
			},
		
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
