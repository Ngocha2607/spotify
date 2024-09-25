import { Type } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSourceOptions, DataSource } from "typeorm";

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: configService.get<string>('dbHost'),
      port: configService.get<number>('dbPort'),
      username: configService.get<string>('username'),
      password: configService.get<string>('password'),
      database: configService.get<string>('dbName'),
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: false,
      migrations: ["dist/db/migrations/*{.ts,.js}"],
    }
  }
}
export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DB_NAME,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: false,
      migrations: ["dist/db/migrations/*{.ts,.js}"],
     
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;