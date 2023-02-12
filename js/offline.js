const check_connection = async () => {
    const data_response = await fetch("index.html");
    if (!data_response.ok) {
        throw new Error(
			`Error al procesar la pagina web; codigo: ${
			data_response.statusText || data_response.status
			}`
		);
    }
}

let check_button = document.getElementById("check-button");
