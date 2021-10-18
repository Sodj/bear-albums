import React, { useState, useEffect } from 'react'
import {
    Box,
    Heading,
    SimpleGrid,
} from '@chakra-ui/react'
import { getAlbums, getUsers } from '../Lib/api'
import LoadMore from '../Components/LoadMore'
import Album from '../Components/Album'
import AlbumSkeleton from '../Components/AlbumSkeleton'
import ModeSwitch from '../Components/ModeSwitch'

export default function Albums() {

    useEffect(() => {
        init()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [loading, setLoading] = useState(true)
    const [albums, setAlbums] = useState([])
    const [users, setUsers] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const array_of_fifty = Array.from(Array(50).keys())
    const [page, setPage] = useState(1)

    // fetch the albums and their owners
    const init = async () => {
        setLoading(true)

        setAlbums(await getAlbums(page))

        setUsers(await getUsers())

        setLoading(false)
    }

    // get username from user_id
    const getUserName = (user_id) => {
        let user = users.filter(user => user.id === user_id)[0]
        if (user) return user.name
    }

    // show more albums
    const showMore =  async() => {
        setLoadingMore(true)

        let new_albums = await getAlbums(page + 1)

        // append the new albums to the existing ones
        if(new_albums.length){
            setAlbums([...albums, ...new_albums])
        }
        // the are no more albums
        else{
            setHasMore(false)
        }
        setPage(page + 1)

        setLoadingMore(false)
    }

    return (
        <Box bg="gray.50" _dark={{bg: "gray.900"}} minH="100vh" p="5">
            
            <ModeSwitch />

            <Heading fontSize="3xl" fontWeight="medium" pt="20px" px="40px" >
                Friendly bear albums
            </Heading>

            <SimpleGrid
                p="10"
                columns={{ sm: 1, md: 2, lg: 3, "2xl": 4 }}
                spacing="8"
                rounded="lg">

                {!loading ? 
                    albums.map((album) => <Album key={album.id} album={album} username={getUserName(album.userId)} />) :
                    array_of_fifty.map((e,i) => <AlbumSkeleton key={i} />)
                }
            </SimpleGrid>

            {hasMore && <LoadMore showMore={showMore} loadingMore={loadingMore} />}
        </Box>
    )
}