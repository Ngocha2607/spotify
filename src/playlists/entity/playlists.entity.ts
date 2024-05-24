import { Song } from "src/songs/entity/song.entity";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("playlists")
export class Playlist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // EACH PLAYLIST HAVE MULTI SONGS
    @OneToMany(() => Song, (song) => song.playList)
    songs: Song[];

    // MANY PLAYLISTS HAVE ONE USER
    @ManyToOne(() => User, (user) => user.playLists)
    user: User;
}