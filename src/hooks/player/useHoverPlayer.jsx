import { useRef, useState } from "react"


export const useHoverPlayer = () => {

    const [hoverCard, setHoverCard] = useState(null)
    const [buttonAnimation, setButtonAnimation] = useState('')
    const hoverTimeoutRef = useRef()
    
    const handleMouseEnter = (id) => {
    
        // Quitar timeouts pendientes al entrar a otra card
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current)
        }
    
        setHoverCard(id)
        setButtonAnimation('fadeInUp 0.5s ease forwards')
    }
    
    const handleMouseLeave = (id) => {
        setButtonAnimation('fadeOutDown 0.5s ease forwards')
      
        hoverTimeoutRef.current = setTimeout(() => {
            if (hoverCard === id) {
                setHoverCard(null)
            }
        
            hoverTimeoutRef.current = null
        }, 500)
    }

  return {
    hoverCard,
    buttonAnimation,
    handleMouseEnter,
    handleMouseLeave
  }
}

