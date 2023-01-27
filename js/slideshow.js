/* Slideshow(carrusel) de imagenes mostrando una resaltada en el centro y dos semi-transparente
 * a los lados. */
let prev_slide_index = 0;
let slide_index = 1;
let next_slide_index = 2;

let stand_by = setTimeout(funcAnimar, 1000);
let animacion;

/* Verifica que el indice de image no se vaya de los limites */
function checkIndex(index, length){
	if((index + 1) >= length){
		return 0;
	}
	return ++index;
}
/* Funcion que comienza la animacion */
function funcAnimar(){
	/* Obtiente todas las imagenes */
	let slides = document.getElementsByClassName('slide');
	/* Les remueve los id para cambiar los estilos */
	slides[prev_slide_index].removeAttribute('id');
	slides[slide_index].removeAttribute('id');
	slides[next_slide_index].removeAttribute('id');
	/* Establece las clases para mover a la izquierda */
	slides[prev_slide_index].setAttribute('class', 'slide slide-left left-out col-3');
	slides[slide_index].setAttribute('class', ' slide slide-left left-move1 col-3');
	slides[next_slide_index].setAttribute('class', 'slide slide-left left-move2 col-3');
	/* Casos especiales cuando tiene que volver a empezar.
	 * La antepenúltima, penúltima y última imagen tiene que tener
	 * clases especiales con efectos de animación especial para
	 * que se vean bien. Si no se hace así, entonces cuando vuelva
	 * a empezar por la primera imagen, las posiciones relativas
	 * hacen que se visualizen mal.*/
	let next_index = checkIndex(next_slide_index, slides.length);
	switch(next_index)
	{
		case 0:
			slides[prev_slide_index].setAttribute('class', 'slide slide-left zero-out col-3');
			slides[slide_index].setAttribute('class', 'slide slide-left one-left col-3');
			slides[next_slide_index].setAttribute('class', 'slide slide-left two-center col-3');
			break;
		case 1:
			slides[prev_slide_index].setAttribute('class', 'slide slide-left one-out col-3');
			slides[slide_index].setAttribute('class', 'slide slide-left two-left col-3');
			break;
		case 2:
			slides[prev_slide_index].setAttribute('class', 'slide slide-left two-out col-3');
			break;
		default:
			break;
	}
	/* Recalcula los indices de la 1°(semi-transparente), 2°(resaltada), 3°(semi-transparente) imagen */
	if((slide_index + 1) >= slides.length){
		slide_index = 0;
		prev_slide_index++;
		next_slide_index++;
	}
	else{
		slide_index++;
		prev_slide_index = checkIndex(prev_slide_index, slides.length);
		next_slide_index = checkIndex(next_slide_index, slides.length);
	}
	/* Casos especiales cuando tiene que volver a empezar después de
	 * recalcular los indices. Es similar al caso anterior, pero ésta
	 * vez es con las primeras tres imágenes que deben tener clases y
	 * efectos de animación especiales para una correcta visualización. */
	switch(next_slide_index)
	{
		case 0:
			slides[next_slide_index].setAttribute('class', 'slide slide-left zero-in col-3');
			break;
		case 1:
			slides[next_slide_index].setAttribute('class', 'slide slide-left one-in col-3');
			slides[slide_index].setAttribute('class', 'slide slide-left zero-center col-3');
			break;
		case 2:
			slides[next_slide_index].setAttribute('class', 'slide slide-left two-in col-3');
			slides[slide_index].setAttribute('class', 'slide slide-left one-center col-3');
			slides[prev_slide_index].setAttribute('class', 'slide slide-left zero-left col-3');
			break;
		default:
			slides[next_slide_index].setAttribute('class', 'slide slide-left left-in col-3');
			break;
	}
	/* Hace que los contenedores de imágenes no estén ocultos */
	slides[slide_index].setAttribute('id', 'actual');
	slides[slide_index].style.display = 'block';
	slides[prev_slide_index].setAttribute('id', 'side');
	slides[prev_slide_index].style.display = 'block';
	slides[next_slide_index].setAttribute('id', 'side');
	slides[next_slide_index].style.display = 'block';
	/* Reinicia el proceso de animación y llama a una función
	 * cuando se termina de animar. */
	clearTimeout(stand_by);
	animacion = setTimeout(funcStand, 1000);
}
/* Función que se llama cuando se detiene la animación */
function funcStand(){
	/* Obtiene todas las imágenes */
	let slides = document.getElementsByClassName('slide');
	/* Para todas las imágenes que no tienen id, ocultarlas */
	let i;
	for(i = 0; i < slides.length; i++){
		if(!slides[i].hasAttribute('id')){
			slides[i].style.display = 'none';
			slides[i].style.left = '0%';
		}
	}
	/* Establece clases iguales para las imágenes */
	slides[prev_slide_index].setAttribute('class', 'slide col-3');
	slides[slide_index].setAttribute('class', 'slide  col-3');
	slides[next_slide_index].setAttribute('class', 'slide col-3');
	
	/* Casos especiales cuando la última imágen visualizada es la
	 * primera, segunda ó tercera. Se mueve su posición relativa
	 * para una correcta visualización. */
	switch(next_slide_index)
	{
		case 0:
			slides[next_slide_index].style.left = '50%';
			slides[slide_index].style.left = '-25%';
			slides[prev_slide_index].style.left = '-25%';
			break;
		case 1:
			slides[slide_index].style.left = '25%';
			slides[next_slide_index].style.left = '25%';
			slides[prev_slide_index].style.left = '-50%';
			break;
		case 2:
			slides[next_slide_index].style.left = '0%';
			slides[slide_index].style.left = '0%';
			slides[prev_slide_index].style.left = '0%';
			break;
		default:
			break;
	}
	/* Reinicia el proceso de animación y llama a una función
	 * para comenzar a animar. */
	clearTimeout(animacion);
	stand_by = setTimeout(funcAnimar, 1000);
}
