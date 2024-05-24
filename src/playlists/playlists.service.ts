import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Song } from 'src/songs/entity/song.entity';
import { User } from 'src/users/entity/user.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { Playlist } from './entity/playlists.entity';

@Injectable()
export class PlaylistsService {

    constructor(
        @InjectRepository(Playlist)
        private playListRepository: Repository<Playlist>,
        @InjectRepository(Song)
        private songRepository: Repository<Song>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(playListDTO: CreatePlaylistDto): Promise<Playlist> {
        const playList = new Playlist();
        playList.name = playListDTO.name;
        playList.user = await this.userRepository.findOneBy({id: playListDTO.user});
        playList.songs = await this.songRepository.findBy({id: In(playListDTO.songs)});
        return await this.playListRepository.save(playList);
    }
}
