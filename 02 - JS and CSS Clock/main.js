const agujaSegundos = document.querySelector(".segundero");
const agujaMinutos = document.querySelector(".minutos");
const agujaHoras = document.querySelector(".horas");

function setDate() {
	const now = new Date();
	const segundos = now.getSeconds();
	const segundosAGrados = (segundos / 60) * 360 + 180;
	agujaSegundos.style.transform = `rotate(${segundosAGrados}deg)`;

	const minutos = now.getMinutes();
	const minutosAGrados = (minutos / 60) * 360 + 180;
	agujaMinutos.style.transform = `rotate(${minutosAGrados}deg)`;

	const horas = now.getHours();
	const horasAGrados = (horas / 60) * 360 + -120;
	agujaHoras.style.transform = `rotate(${horasAGrados}deg)`;
}
setInterval(setDate, 1000);
