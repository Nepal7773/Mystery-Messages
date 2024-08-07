import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
import { NextRequest } from "next/server";

const UsernameQuerySchema = z.object({
    username: usernameValidation,
})

export async function GET(request: NextRequest) {
    const queryParam = {
        username: request.nextUrl.searchParams.get('username') || ''
    }
    try {
        //validate with zod
        const result = UsernameQuerySchema.safeParse(queryParam);
        // console.log(result); // remove after checking
        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];
            return Response.json({
                success: false,
                message: usernameErrors?.length > 0 ? usernameErrors.join(", ") : "Invalid query Params"
            }, { status: 400 });
        }
        await dbConnect();

        const { username } = result.data;
        const exitingVerifiedUser = await UserModel.findOne({ username, isVerified: true })

        if (exitingVerifiedUser) {
            return Response.json({
                success: false,
                message: "Username already exists"
            }, { status: 400 });
        }

        return Response.json({
            success: true,
            message: "Username is unique"
        }, { status: 200 });

    } catch (error) {
        console.error("Error checking Username", error);
        return Response.json({
            success: false,
            message: "Error checking Username"
        }, { status: 500 });
    }
}