import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { Playlist } from './entity/playlists.entity';

@Controller('playlists')
export class PlayListController {

    constructor(private playlistsService: PlaylistsService){}

    @Post()
    create(
        @Body() playlistDto: CreatePlaylistDto
): Promise<Playlist> {
    return this.playlistsService.create(playlistDto);
}
}
