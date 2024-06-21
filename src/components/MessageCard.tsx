'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { X } from "lucide-react"
import { Message } from "@/model/User"
import { useToast } from "./ui/use-toast"
import { ApiResponse } from "@/types/ApiResponse"
import axios from "axios"
import { MsgResponse } from "@/types/MsgResponse"

type MessageCardProps = {
    message: MsgResponse,
    onMessageDelete: (messageId: string) => void
}

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {

    const { toast } = useToast();
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };

    const dateObj = new Date(message.createdAt)
    const formattedDate = dateObj.toLocaleString('en-IN', options)
    const handleDeleteComfirm = async () => {
        const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)

        toast({
            title: response.data.message,
        })

        onMessageDelete(message._id)
    }

    return (
        <Card>
            <CardHeader className="flex flex-col">
                <div className="flex flex-row justify-between">
                    <CardTitle>{message.content}</CardTitle>
                    <AlertDialog >
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" ><X className="w-5 h-5" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    Message.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteComfirm}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                <CardDescription>{formattedDate}</CardDescription>
            </CardHeader>
            <CardContent>
            </CardContent>
        </Card>

    )
}

export default MessageCard