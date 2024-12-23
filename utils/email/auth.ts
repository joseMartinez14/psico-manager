import FirebaseAdmin from "@/app/firebase/admin";
import { getAuth } from "firebase/auth";
import * as admin from "firebase-admin";

export async function isAuthenticated(token: string): Promise<boolean> {
  FirebaseAdmin.initializeApp();

  return await admin
    .auth()
    .verifyIdToken(token)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}
