export const getAlbums = async (page=1) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums?_page=${page}`)
        return await response.json()
    }
    catch (e) {
        return []
    }
}

export const getUsers = async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
        return await response.json()
    }
    catch (e) {
        return []
    }
}
export const getPhotos = async (album_id, page) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${album_id}&_page=${page}`)
        return await response.json()
    }
    catch (e) {
        return []
    }
}
