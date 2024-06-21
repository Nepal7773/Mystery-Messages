import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not Authenticated"
        }, { status: 401 })
    }

    const userId = user._id;
    const { acceptMessages } = await request.json();

    try {
        const upadtedUser = await UserModel.findByIdAndUpdate(userId, { isAcceptingMessages: acceptMessages }, { new: true });

        if (!upadtedUser) {
            return Response.json({
                success: false,
                message: "failed to update user status to accept messages"
            }, { status: 401 })
        }
        return Response.json({
            success: true,
            message: "Messages acceptance status updated successfully",
            upadtedUser
        }, { status: 200 })

    } catch (error) {
        console.log("failed to update user status to accept messages", error)
        return Response.json({
            success: false,
            message: "failed to update user status to accept messages"
        }, { status: 500 })
    }
}

export async function GET(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not Authenticated"
        }, { status: 401 })
    }

    const userId = user._id;
    try {
        const founUser = await UserModel.findById(userId);
        if (!founUser) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }

        return Response.json({
            success: true,
            message: "Message acceptance status",
            isAcceptingMessages: founUser.isAcceptingMessages
        }, { status: 200 })

    } catch (error) {
        console.log("Error is getting message acceptance status", error)
        return Response.json({
            success: false,
            message: "Error is getting message acceptance status"
        }, { status: 500 })
    }
}
