import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { Photo } from './entity/Photo'
import { PhotoMetadata } from './entity/PhotoMetadata'

// tslint:disable-next-line:no-var-requires
const ormconfig =  require('../ormconfig.json')

const start = async () => {
    let connection
    try {
        connection = await createConnection(ormconfig)
    } catch (error) {
        throw error
    }

    /* CRUD a una entidad */
    /*
    // Guargar un registro
    const photo = new Photo()
    photo.name = 'Me and Bears'
    photo.description = 'I am near polar bears'
    photo.fileName = 'photo-with-bears.jpg'
    photo.views = 0
    photo.isPublished = false

    const photoRepository = connection.getRepository(Photo)

    const result: Photo = await photoRepository.save(photo)
    console.log('Foto guardada', result)

    // Consulta todos los registros
    const allPhotos: Photo[] = await photoRepository.find()
    console.log('Todas la fotos en la DB: ', allPhotos)

    // Consulta por atrbuto
    const meAndBearsPhoto: Photo = await photoRepository.findOne({ name: 'Me and Bears' })
    console.log('Una foto: ', meAndBearsPhoto)

    // Consulta todas los registros con where
    const allViewedPhotos: Photo[] = await photoRepository.find({ views: 1 })
    console.log('All viewed photos: ', allViewedPhotos)

    // Consulta y cuenta todos los registros
    const photosAndCount: [Photo[], number] = await photoRepository.findAndCount()
    console.log('All photos: ', photosAndCount[0])
    console.log('Photos count: ', photosAndCount[1])

    // Consulta por id y actualiza el registro
    const photoToUpdate = await photoRepository.findOne(allPhotos[allPhotos.length - 1].id)
    photoToUpdate.name = 'Me, my friends and polar bears'
    await photoRepository.save(photoToUpdate)

    // Consulta por id y elimina el registro
    const photoToRemove = await photoRepository.findOne(allPhotos[0].id)
    await photoRepository.remove(photoToRemove)
    */

    /* Relacion One to One sin Cascade */
    /*
    // Creo la foto

    let photo: Photo = new Photo()
    photo.name = 'Yo y los osos'
    photo.description = 'Yo estando cerca de los osos'
    photo.fileName = 'photo-with-bears.jpg'
    photo.isPublished = true

    // Creo los meta datos para la foto
    let metadata = new PhotoMetadata()
    metadata.height = 640
    metadata.width = 480
    metadata.compressed = true
    metadata.comment = 'cybershoot'
    metadata.orientation = 'portait'
    metadata.photo = photo // de esta manera conectamos la entidades

    // Obtengo los repositorios
    const photoRepository = connection.getRepository(Photo)
    const metadataRepository = connection.getRepository(PhotoMetadata)

    // Primero se crea la foto
    photo = await photoRepository.save(photo)
    console.log('Foto', photo)

    // Despues la meta-data para la foto
    metadata = await metadataRepository.save(metadata)
    console.log('Metadata', metadata)
    */

    /* Relacion One to One con Cascade */
    /*
    // Creo el objeto Photo
    const photo: Photo = new Photo()
    photo.name = 'Me and Bears'
    photo.description = 'I am near polar bears'
    photo.fileName = 'photo-with-bears.jpg'
    photo.isPublished = true

    // Creo el obejto PhotoMetaData
    const metadata: PhotoMetadata = new PhotoMetadata()
    metadata.height = 640
    metadata.width = 480
    metadata.compressed = true
    metadata.comment = 'cybershoot'
    metadata.orientation = 'portait'

    photo.metadata = metadata // De esta manera coneto las entidades

    // Obtengo el repositorio
    const photoRepository = connection.getRepository(Photo)

    // Guardo el objeto Photo y el objeto PhotoMetadata
    await photoRepository.save(photo)

    console.log('Ambos objetos han sido guardados')

    // Consulta los registros con las relaciones
    const photos = await photoRepository.find({ relations: ['metadata'] })
    console.log('Fotos', photos)

    // Consulta los registros con las relaciones con el QueryBuilder
    const photos1 = await connection
        .getRepository(Photo)
        .createQueryBuilder('photo')
        .innerJoinAndSelect('photo.metadata', 'metadata')
        .getMany()
    console.log('Fotos con Query Builder', photos1)
    */
    console.log(connection)
}

start()
