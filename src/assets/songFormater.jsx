


export function songFormater(progressMs, totalMs){
      if (progressMs === 0) return 0;
      return Math.round((progressMs / totalMs) * 100);
    
}


