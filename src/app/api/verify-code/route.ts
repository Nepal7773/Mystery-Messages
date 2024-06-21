import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { messageSchema } from "@/schemas/messageSchema";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, code } = await request.json();

        const decodedUsername = decodeURIComponent(username);

        const user = await UserModel.findOne({ username: decodedUsername });

        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeNotExipired = new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeValid && isCodeNotExipired) {
            user.isVerified = true;
            await user.save();
            return Response.json({
                success: true,
                message: "User Verified"
            }, { status: 200 });
        } else if (!isCodeNotExipired) {
            return Response.json({
                success: false,
                message: "Code Expired ,please signup again to get new code"
            }, { status: 400 });
        } else {
            return Response.json({
                success: false,
                message: "Invalid Code"
            }, { status: 400 });
        }

    } catch (error) {
        console.error("Error Verifying user", error);
        return Response.json({
            success: false,
            message: "Error Verifying user"
        }, { status: 500 });
    }
}