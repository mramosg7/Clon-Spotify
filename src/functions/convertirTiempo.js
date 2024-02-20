import { format } from "date-fns";
import esLocale from "date-fns/locale/es";

export const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    const fechaFormateada = format(date, "dd MMM yyyy", { locale: esLocale });
    return fechaFormateada;
};

export function convertirAMinutosYSegundos(tiempoTotal) {
    const tiempoTotalEnSegundos = tiempoTotal / 1000;

    const minutos = Math.floor(tiempoTotalEnSegundos / 60);
    const segundos = Math.floor(tiempoTotalEnSegundos % 60);

    // Formatea los minutos y segundos

    const segundosFormateados = segundos < 10 ? `0${segundos}` : segundos;

    return `${minutos}:${segundosFormateados}`;
}