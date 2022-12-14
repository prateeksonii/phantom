// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { userRouter } from "./userRouter";
import { contactRouter } from "./contactRouter";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("user.", userRouter)
  .merge("contact.", contactRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
