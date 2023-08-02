/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv'
import { UserEntity } from 'src/users/entities/user.entity';
import { Initial1690892702352 } from './migrations/1690892702352-initial';
import { UpdateTblUser1690966612061 } from './migrations/1690966612061-updateTbl_user';
config()
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_DATABASE,
  entities: [UserEntity],
  migrations: [Initial1690892702352, UpdateTblUser1690966612061],
  logging: false,
  synchronize:  true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
