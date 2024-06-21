import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();
    // console.log("first")
    const { username, content } = await request.json();
    try {
        // console.log("second")
        const user = await UserModel.findOne({ username });
        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }

        // is user accepting messages
        if (!user.isAcceptingMessages) {
            return Response.json({
                success: false,
                message: "user is not accepting messages"
            }, { status: 403 })
        }

        const newMessage = { content, createdAt: new Date() };
        user.messages.push(newMessage as Message)
        await user.save();

        return Response.json({
            success: true,
            message: "Message sent successfully"
        }, { status: 200 })

    } catch (error) {
        console.log("Error adding msg", error);
        return Response.json({
            success: false,
            message: "Internal server Error"
        }, { status: 500 })
    }
}