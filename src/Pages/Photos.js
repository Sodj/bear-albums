import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
    Box,
    Heading,
    SimpleGrid,
    Image,
    Switch,
    FormLabel,
    FormControl,
    Button,
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalFooter,
} from '@chakra-ui/react'
import { ArrowBackIcon, DownloadIcon } from '@chakra-ui/icons'

import { getPhotos } from '../Lib/api'
import Photo from "../Components/Photo"
import PhotoSkeleton from "../Components/PhotoSkeleton"
import LoadMore from "../Components/LoadMore"
import ModeSwitch from "../Components/ModeSwitch"

export default function Photos(props) {

    // get album id from params
    const album_id = props.match.params.id 

    useEffect(() => {
        init()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [loading, setLoading] = useState(true)
    const [kittens, setKittens] = useState(false)
    const [photos, setPhotos] = useState([])
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const array_of_fifty = Array.from(Array(50).keys())
    const [page, setPage] = useState(1)

    // fetch the photos of the selected album
    const init = async () => {
        setLoading(true)

        const response = await getPhotos(album_id)
        if (response) setPhotos(response)
        // associate a cute kitten to each photo :)
        response.forEach(photo => {
            photo.kitty = randomKitty()
        })
        
        setLoading(false)
    }

    // load more photos
    const showMore =  async() => {
        setLoadingMore(true)

        let new_photos = await getPhotos(page + 1)
        // append the new photos to the existing ones
        if(new_photos.length){
            setPhotos([...photos, ...new_photos])
            // associate a cute kitty to new photos ^^
            new_photos.forEach(photo => {
                photo.kitty = randomKitty()
            })
        }
        // the are no more photos
        else{
           setHasMore(false) 
        }
        setPage(page + 1)

        setLoadingMore(false)
    }

    // return random kitten image url
    const randomKitty = () => {
        let randomNumber = Math.round(Math.random() * 16) // from 1 to 16
        return "http://placekitten.com/600/600?image=" + randomNumber
    }

    // open photo in a popup
    const openPhoto = (url) => {
        setSelectedPhoto(url)
        setModalOpen(true)
    }

    // download the photo
    const download = (url) => {
        var elt = document.createElement("a");
        var blob = new Blob([url], {type: "image/jpg"});
        elt.href = URL.createObjectURL(blob);
        elt.download = "image.jpg";
        document.body.appendChild(elt)
        elt.click();
    }

    return (
        <Box bg="gray.50" _dark={{bg: "gray.900"}} minH="100vh" p="5">

            <ModeSwitch />

            <VStack px="40px" alignItems="left">
                <Link to="/albums">
                    <Button leftIcon={<ArrowBackIcon />} colorScheme="black" variant="outline">
                        Back
                    </Button>
                </Link>

                <Heading fontSize="3xl" fontWeight="medium">
                    Album photos
                </Heading>

                <FormControl pt="20px" display="flex">
                    <FormLabel htmlFor="kittens" verticalAlign="middle">
                        Show kittens instead?
                    </FormLabel>
                    <Switch id="kittens" size="lg" onChange={e => setKittens(!kittens)} />
                </FormControl>
            </VStack>

            <SimpleGrid
                p="10"
                columns={{ sm: 1, md: 2, lg: 4, "2xl": 6 }}
                spacing="8"
                rounded="lg">

                {!loading ? 
                    photos.map(photo => <Photo key={photo.id} photo={photo} kittens={kittens} openPhoto={openPhoto} />) :
                    array_of_fifty.map((e,i) => <PhotoSkeleton key={i} />)
                }
            </SimpleGrid>

            {hasMore && <LoadMore showMore={showMore} loadingMore={loadingMore} />}

            <Modal isOpen={modalOpen} onClose={e => setModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody my="4">
                        <Image src={selectedPhoto} rounded="md" />
                    </ModalBody>
                    <ModalFooter justifyContent="center">
                        <Button
                            leftIcon={<DownloadIcon />}
                            boxShadow="md"
                            size="md"
                            onClick={e => download(selectedPhoto)}>
                            Download
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}
