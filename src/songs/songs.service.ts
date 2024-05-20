import { Controller, Inject, Injectable, Scope } from '@nestjs/common';
import { Connection } from 'src/common/constants/connection';

@Injectable({
   scope: Scope.TRANSIENT
})
export class SongsService {

   constructor(
      @Inject("CONNECTION")
      connection: Connection
   ) {
      console.log("connection string", connection.CONNECTION_STRING);
   }
   //local DB 
   private readonly songs = [];
   create(song) {
    // save song in the database
    this.songs.push(song);
    return this.songs;
   }

   finAll() {
    // fetch the songs from the database
   //  Errors come while fetching the data from DB
      // throw new Error('Error while fetching the data from DB');
    return this.songs;
   }

}
