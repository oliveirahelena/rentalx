import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: process.env.NODE_ENV === "test" ? 5555 : 5432,
  username: "docker",
  password: "ignite",
  database: process.env.NODE_ENV === "test" ? "rentalx_test" : "rentalx",
  synchronize: false,
  logging: false,
  entities: ["src/modules/**/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  subscribers: [],
});

export function createConnection(
  host = process.env.NODE_ENV === "test" ? "localhost" : "db"
): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource;
