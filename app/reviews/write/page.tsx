import { redirect } from "next/navigation";

export default function ReviewWritePage() {
  redirect("/login?redirect=/reviews/write");
}
