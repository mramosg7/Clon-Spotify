import { Button } from "@chakra-ui/react"
import { useAuthUser } from "../hooks/auth/useAuthUser"
import { fetchPlay } from "../services/spotify/playerService"
import { FaPlay, FaRandom } from "react-icons/fa"
import { HiOutlineDownload } from "react-icons/hi"
import { FiUserPlus } from "react-icons/fi"
import { IoIosMore } from "react-icons/io"



export const PlaylistPlayer = ({ uri }) => {

    const { getAccessToken } = useAuthUser()

    const handleClick = (uri) => {
        const device_id = localStorage.getItem('device_id')
        if (device_id) {
            getAccessToken().then((tk) => {
                fetchPlay(tk, device_id, 0, uri)
            })
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
                <FaRandom style={{
                    color: 'white',
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
