// src/hooks.server.ts
import type { Handle } from "@sveltejs/kit";
import connectDB from "$lib/db";

let isConnected = false;

export const handle: Handle = async ({ event, resolve }) => {
  if (!isConnected) {
    await connectDB();
    console.log("CONNECTED FROM HOOKS");

    isConnected = true;
  }

  return resolve(event);
};
