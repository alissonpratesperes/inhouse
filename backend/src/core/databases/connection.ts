import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    username: "root",
    password: "Root!@#010.",
    database: "inhouse",
    entities: [path.join(__dirname, "../../**", "*.{entity,view}.{ts,js}")],
    migrations: [path.join(__dirname, "./migrations", "*.{js,ts}")]
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;