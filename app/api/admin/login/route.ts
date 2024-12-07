import api from "@/app/config";
import { cookies } from "next/headers";
import { setCookie } from "cookies-next";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const loginData = {
      identifier: data.email,
      password: data.password,
    };

    const res = await api.post("/auth/local", loginData);

    const cookieStore = await cookies();
    cookieStore.set("psicoStrapiToken", res.data.jwt);
    setCookie("psicoStrapiToken", res.data.jwt);

    return Response.json({ Message: "Login succesfull" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Wrong credentials" }, { status: 401 });
  }
}
