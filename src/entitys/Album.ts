import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Photo } from './Photo'

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public name: string

    @ManyToMany(() => Photo, ( photo ) => photo.albums)
    @JoinTable()
    public photos: Photo[]
}
