import { Message } from "@/model/User";
import { MsgResponse } from "./MsgResponse";

export interface ApiResponse {
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean;
    messages?: Array<MsgResponse>;
}