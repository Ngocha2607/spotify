import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
   //local DB 
   private readonly songs = [];
   create(song) {
    // save song in the database
    this.songs.push(song);
    return this.songs;
   }

   finAll() {
    // fetch the songs from the database
    return this.songs;
   }
}
