import { Controller, Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'src/common/constants/connection';
import { Song } from './entity/song.entity';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/entity/artist.entity';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}
  //local DB
  async create(songDTO: CreateSongDto): Promise<Song> {
    // save song in the database
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.releasedDate = songDTO.releasedDate;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;

    const artists = await this.artistRepository.findBy({id: In(songDTO.artists)});
    song.artists = artists;
    return await this.songRepository.save(song);
  }

  async finAll(): Promise<Song[]> {
    // fetch the songs from the database
    //  Errors come while fetching the data from DB
    // throw new Error('Error while fetching the data from DB');
    return await this.songRepository.find();
  }

  async findOne(id: number): Promise<Song> {
    return await this.songRepository.findOneBy({ id });
  }

  async update(id: number, songDTO: CreateSongDto): Promise<UpdateResult> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.releasedDate = songDTO.releasedDate;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    return await this.songRepository.update({ id }, song);
  }
  async delete(id: number): Promise<DeleteResult> {
    return this.songRepository.delete({ id });
  }
  async pagination(options: IPaginationOptions): Promise<Pagination<Song>> {
   const queryBuilder = this.songRepository.createQueryBuilder('song');
   queryBuilder.orderBy(`song.releasedDate`, 'DESC');
      return paginate<Song>(queryBuilder, options);
  }
}
