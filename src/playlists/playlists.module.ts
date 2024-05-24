import { Module } from '@nestjs/common';
import { PlayListController } from './playlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from 'src/songs/entity/song.entity';
import { User } from 'src/users/entity/user.entity';
import { PlaylistsService } from './playlists.service';
import { Playlist } from './entity/playlists.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Playlist, Song, User])],
    controllers: [PlayListController],
    providers: [PlaylistsService]
})
export class PlayListModule {}
