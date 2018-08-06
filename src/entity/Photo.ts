import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import { Album } from './Album'
import { Autor } from './Autor'
import { PhotoMetadata } from './PhotoMetadata'

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({
        length: 100
    })
    public name: string

    @Column('text')
    public description: string

    @Column()
    public fileName: string

    @Column('double', {
        default: 0
    })
    public views: number

    @Column()
    public isPublished: boolean

    // Con la opcion cascade se puede guardar la relacion desde este modelo
    @OneToOne(() => PhotoMetadata, ( photoMetadata ) => photoMetadata.photo, {
        cascade: true
    })
    public metadata: PhotoMetadata

    // Si en la entidad esta mani to one significa que esta entidad tendra la foranea
    @ManyToOne(() => Autor, ( autor ) => autor.photos)
    public autor: Autor

    @ManyToMany(() => Album, (album) => album.photos)
    public albums: Album
}
