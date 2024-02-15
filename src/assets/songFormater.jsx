


export function MillisecondsToPercentage(progressMs, totalMs){
      if (progressMs === 0) return 0;
      return (progressMs / totalMs) * 100;
    
}

export function percentageToMilliseconds(percentage, totalMs){
      if (percentage === 0) return 0
      return Math.round((percentage/100) * totalMs)
}

export function millisecodsToMinutes(ms){
      const tiempoTotalEnSegundos = ms / 1000;

      const minutos = Math.floor(tiempoTotalEnSegundos / 60);
      const segundos = Math.floor(tiempoTotalEnSegundos % 60);
      
      const segundosFormateados = segundos < 10 ? `0${segundos}` : segundos;

      return `${minutos}:${segundosFormateados}`;
}

