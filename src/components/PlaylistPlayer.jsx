import { Button } from "@chakra-ui/react"

import { FaPlay, FaRandom } from "react-icons/fa"
import { HiOutlineDownload } from "react-icons/hi"
import { FiUserPlus } from "react-icons/fi"
import { IoIosMore } from "react-icons/io"
import { usePlayerContext } from "../context/PlayerContext"
import { usePlayer } from "../hooks/player/usePlayer"



export const PlaylistPlayer = ({ uri }) => {

    const {contextPlayer} = usePlayerContext()
    const {toggleShuffle} = usePlayer()
    const {play} = usePlayer()

    const handleClick = (uri) => {
        const device_id = localStorage.getItem('device_id')
        if (device_id) {
            play(uri)
        }
    }

    return (
        <>
            <section style={{
                width: '100%',
                height: '90px',
                display: 'flex',
                alignItems: 'center'
            }}>
                <Button onClick={() => { handleClick(uri) }}
                    marginLeft='40px'
                    w='55px'
                    h='55px'
                    borderRadius='full'
                    backgroundColor='#1FDF64'
                    padding='5px'
                >
                    <FaPlay />
                </Button>
                <FaRandom onClick={()=>{toggleShuffle()}}style={{
                    color: contextPlayer.shuffle_state ? '#1ED760' : 'white',
                    marginLeft: '30px',
                    width: '25px',
                    height: '25px',
                    cursor: 'pointer'
                }} />
                <HiOutlineDownload style={{
                    color: 'white',
                    marginLeft: '30px',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer'
                }} />
                <FiUserPlus style={{
                    color: 'white',
                    marginLeft: '30px',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer'
                }} />
                <IoIosMore style={{
                    color: 'white',
                    marginLeft: '30px',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer'
                }} />
            </section>
        </>
    )
}
