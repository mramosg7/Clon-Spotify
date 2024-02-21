
import { usePlayerContext } from "../../context/PlayerContext";
import {fetchToggleShuffle, fetchSetRepeatMode, fetchPlayArtist, fetchPlay, fetchPlayTopTraks } from "../../services/spotify/playerService";
import { useAuthUser } from "../auth/useAuthUser";





export const usePlayer = ()=>{
    
    const {getAccessToken} = useAuthUser()
    const {contextPlayer} = usePlayerContext()


    const toggleShuffle = ()=>{
        getAccessToken().then((tk)=>{
            fetchToggleShuffle(tk,!contextPlayer.shuffle_state,contextPlayer.device.id)
        })
    }

    const setRepeatMode=(state)=>{
        getAccessToken().then((tk)=>{
            fetchSetRepeatMode(tk, contextPlayer.device.id, state)
        })
     
    }

    const playArtist = (uri)=>{
        getAccessToken().then(tk=>{
            fetchPlayArtist(tk,contextPlayer.device.id,uri)
        })
    }

    const play = (uri, position = 0)=>{
        getAccessToken().then(tk=>{
            fetchPlay(tk, contextPlayer.device.id,position,uri)
        })
    }

    const playCustom = (tracks, position)=>{
        getAccessToken().then(tk=>{
            fetchPlayTopTraks(tk,contextPlayer.device.id, position, tracks )
        })
    }

    return {
        setRepeatMode,
        toggleShuffle,
        playArtist,
        play,
        playCustom
    }
}