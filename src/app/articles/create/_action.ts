'use server';

import { addArticle } from "@/app/_service/kv";
import { redirect } from "next/navigation";


export async function onSubmit(column_id: string, formdata: FormData, html: string) {
  const title = formdata.get("title") as string;
  const meta = {
    column_id,
    title,
    content: html,
  }
  // await addArticle(columnId, { title, content });
  // redirect(`/columns/${columnId}`);
}