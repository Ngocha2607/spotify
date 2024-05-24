import { Artist } from "src/artists/entity/artist.entity";
import { Playlist } from "src/playlists/entity/playlists.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('songs')
export class Song {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    // @Column("varchar", {array: true})
    // artists: string[];
    @Column({type: 'date'})
    releasedDate: Date;
    @Column({type: 'time'})
    duration: Date;
    @Column({type: 'text'})
    lyrics: string;
    @ManyToMany(() => Artist, (artist) => artist.songs, {cascade: true})
    @JoinTable({name: "song_artists"})
    artists: Artist[];

    @ManyToOne(() => Playlist, (playlist) => playlist.songs)
    playList: Playlist
}