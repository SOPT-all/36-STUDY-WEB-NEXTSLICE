//actions/addItem.ts
"use server";

import { fakeDB } from "@/lib/db";

export async function addItem(newItem: string) {
  fakeDB.push(newItem);
  return fakeDB;
}
