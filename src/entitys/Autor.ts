import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Photo } from './Photo'

@Entity()
export class Autor {

    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public name: string

    @OneToMany(() => Photo, ( photo ) => photo.autor, {
        cascade: true
    })
    public photos: Photo[]
}
