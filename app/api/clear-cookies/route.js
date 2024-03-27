import { cookies } from "next/headers";

export async function POST(request) {
  // Clear the "email" cookie
  cookies().delete("email", { path: "/" });

  // Clear the "token" cookie
  cookies().delete("token", { path: "/" });

  return Response.json({ message: "Successfully logged out" });
}

export async function GET(request) {
  return Response.status(405).json({ message: "Method Not Allowed" });
}
