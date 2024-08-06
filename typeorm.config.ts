import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

const configSrevice = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configSrevice.get('DB_HOST'),
  port: +configSrevice.get('DB_PORT'),
  username: configSrevice.get('DB_USER'),
  database: configSrevice.get('DB_NAME'),
  password: configSrevice.get('DB_PASS'),
  entities: ['./src/**/*.entity{.ts, .js}'],
  migrations: ['./src/db/migrations/*{.ts, .js}'],
  synchronize: false,
};

export default new DataSource(dataSourceOptions);
