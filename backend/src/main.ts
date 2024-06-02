import { NestFactory } from '@nestjs/core';
import {AppModule} from "./modules/app/app.module";

async function start() {
  const PORT: number = Number(process.env.PORT) || 4000;

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(PORT, () => {
    console.log(`server -> http://localhost:${PORT}`)
  });
  
}
start();

