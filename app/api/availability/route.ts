import api from "@/app/config";
import { cookies } from "next/headers";

export async function POST() {
  const data = {
    data: {
      Datetime: "2024-10-12T15:00:00Z", // Replace with your desired DateTime
      AvailabilityStatus: "Available", // Replace with your desired AvailabilityStatus
    },
  };

  console.log("---------");
  console.log(JSON.stringify(data));

  const res = await api.post("availabilities", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  //console.log(res);

  return Response.json({});
}

export async function DELETE(req: Request) {
  const cookieStore = await cookies();

  const { searchParams } = new URL(req.url);
  const avail_id = searchParams.get("ID");

  const token = cookieStore.get("psicoStrapiToken");
  if (!token) {
    return Response.json({ error: "User not logged in" }, { status: 403 });
  }

  const strapi_res = await api.delete(`availabilities/${avail_id}`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (strapi_res.status == 204) {
    return Response.json({ error: "Se borro exitosamente" }, { status: 204 });
  }
  return Response.json(
    { error: "Error al eliminar la disponibilidad" },
    { status: 500 }
  );
}

// import { NextRequest, NextResponse } from "next/server";

// // Define the expected structure of the request body
// interface RequestBody {
//   name: string;
//   age: number;
// }

// interface Params {
//   params: {
//     month: string;
//   };
// }

// // Custom Error Class for Handling Invalid Requests
// class BadRequestError extends Error {
//   constructor(message: string) {
//     super(message);
//     this.name = "BadRequestError";
//   }
// }

// // POST Handler with Error Handling
// export async function POST(request: NextRequest, { params }: Params) {
//   try {
//     const { month } = params;

//     // Parse the request body and ensure it matches the expected type
//     const body: RequestBody = await request.json();

//     // Check if the body has the required fields
//     if (
//       !body.name ||
//       typeof body.name !== "string" ||
//       typeof body.age !== "number"
//     ) {
//       throw new BadRequestError(
//         "Invalid request body: Missing or incorrect fields"
//       );
//     }

//     // Return success response if the body is valid
//     return NextResponse.json({
//       message: `Data received for month: ${month}`,
//       data: body,
//     });
//   } catch (error) {
//     // Handle invalid request body or other errors
//     if (error instanceof BadRequestError) {
//       return NextResponse.json({ error: error.message }, { status: 400 });
//     }

//     // Handle unexpected errors
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
