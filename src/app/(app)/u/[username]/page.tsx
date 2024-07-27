"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"
import axios, { AxiosError } from "axios"
import { useParams } from "next/navigation"
import { ApiResponse } from "@/types/ApiResponse"
import { Loader2 } from "lucide-react"

const FormSchema = z.object({
    content: z
        .string()
        .min(10, {
            message: "Message must be at least 10 characters.",
        })
        .max(160, {
            message: "Message must not be longer than 30 characters.",
        }),
})

const SendMsgPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams<{ username: string }>();
    const [messages, setMessages] = useState([])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const { register, watch, setValue } = form;

    const acceptMessages = watch('content');

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post(`/api/send-message`,
                {
                    username: params.username,
                    content: data.content
                }
            )

            // console.log(response);

            toast({
                title: "Success",
                description: response.data.message
            })
        } catch (error) {
            console.error("Error in send messages", error);
            const axiosError = error as AxiosError<ApiResponse>;
            let errroMessage = axiosError.response?.data.message || 'Error verify user';
            toast({
                title: 'Failed',
                description: errroMessage,
                variant: 'destructive'
            })
        } finally {
            setIsSubmitting(false);
        }
    }

    const suggestMessages = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/suggest-messages');

            console.log(response.data.message)
            setMessages(response.data.message.split('||'));
            console.log(messages)
            toast({
                title: "Success",
                description: 'Messages generated.'
            })
        } catch (error) {
            console.error("Error in send messages", error);
            const axiosError = error as AxiosError<ApiResponse>;
            let errroMessage = axiosError.response?.data.message || 'Error verify user';
            toast({
                title: 'Failed to generate messages',
                description: errroMessage,
                variant: 'destructive'
            })
        } finally {
            setIsLoading(false)
        }
    }

    const onMsgClick = (message: string) => {
        setValue('content', message);
    }

    return (
        <>
            <div className="flex flex-col items-center space-y-3">
                <h1 className="text-5xl font-bold mt-5">Public Profile Link</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Send Anonymous Message to @{params.username}</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write your anonymous message here"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isSubmitting} >
                            {
                                isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                                    </>
                                ) : ('Send it')
                            }</Button>
                    </form>
                </Form>
            </div>
            <div className="flex flex-col items-center space-y-3 mt-3">
                <Button onClick={suggestMessages} disabled={isLoading} >
                    {
                        isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                            </>
                        ) : ('Suggest Messages')
                    }
                </Button>
                <div className='m-2 grid grid-cols-1 gap-6'>
                    {
                        messages.length > 0 ? (
                            messages.map((message, index) => (
                                <button key={index} onClick={() => onMsgClick(message)} className="border border-gray-500 rounded-md p-4">{message}</button>
                            ))
                        ) : (
                            <p> No messages to display.</p>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default SendMsgPage;
