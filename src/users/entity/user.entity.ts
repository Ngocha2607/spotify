import { Playlist } from "src/playlists/entity/playlists.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    email: string;
    @Column()
    password: string;

    @OneToMany(() => Playlist, (playlist) => playlist.user)
    playLists: Playlist[]
}