import { DataSourceOptions, DataSource } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      // password: 'Ha!23456',
      database: 'spotify',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: false,
      migrations: ["dist/db/migrations/*{.ts,.js}"],
     
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;