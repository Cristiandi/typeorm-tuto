import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Photo} from './Photo'

@Entity()
export class PhotoMetadata {

    @PrimaryGeneratedColumn()
    public id: number

    @Column('int')
    public height: number

    @Column('int')
    public width: number

    @Column()
    public orientation: string

    @Column()
    public compressed: boolean

    @Column()
    public comment: string

    @OneToOne(() => Photo, ( photo ) => photo.metadata)
    @JoinColumn()
    public photo: Photo
}
