import { Connection, getConnection, Repository } from 'typeorm'
import { Album } from '../entitys/Album'

export class AlbumController {
    private connection: Connection
    private albumRepository: Repository<Album>
    constructor() {
        this.connection = getConnection()
        this.albumRepository = this.connection.getRepository(Album)
    }

    public async getAll() {
        const albums: Album[] = await this.albumRepository.find()
        return albums
    }

    public async getOne(id: number) {
        if (!id) {
            throw new Error(`id is required`)
        }
        const album: Album = await this.albumRepository.findOneOrFail(id)
        return album
    }

    public async post(album) {
        if (!album) {
            throw new Error(`album is required`)
        }
        if (!album.name) {
            throw new Error(`name attribute is missing`)
        }
        const createdAlbum: Album = await this.albumRepository.save(album)
        return createdAlbum
    }

    public async patch(id: number, album) {
        if (!id) {
            throw new Error(`id is required`)
        }
        if (!album) {
            throw new Error(`album is required`)
        }
        const oneAlbum: Album = await this.albumRepository.findOneOrFail(id)
        oneAlbum.name = album.name || oneAlbum.name
        const updatedAlbum = await this.albumRepository.save(oneAlbum)
        return updatedAlbum
    }

    public async remove(id: number) {
        if (!id) {
            throw new Error(`id is required`)
        }
        const albumToRemove: Album = await this.albumRepository.findOneOrFail(id)
        const result = await this.albumRepository.remove(albumToRemove)
        console.log('resultado', result)
        return result
    }
}
