// import { openai } from '@ai-sdk/openai';
// import { streamText } from 'ai';
import { GoogleGenerativeAI } from "@google/generative-ai"
// Allow streaming responses up to 30 seconds
// export const maxDuration = 60;

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY ?? "");


export async function GET(req: Request) {
    try {

        // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Create a list of three open-ended and engaging quetions formatted as a single stirng. Each quetion should be separated by '||'. These questions are for an anonymous social mesaging platform,like Qooh.me, and should be suitable for a diverse audience. Avoid personal of sensetive topics,focusing on universal themes that encourage positive interactions.For exmaple , your output should be structured like this : 'What's a hobby you've recently started? || If you could have dinner with any historical figure, who would it be? || What's a book you've read recently that you'd recommend?'. Ensure the quetions are intriguing ,foster curiosity,and contribute to a positive and welcoming conversational environment.";

        const result = await model.generateContent(prompt);

        const response = await result.response;
        const text = response.text();
        console.log(text);
        return Response.json({
            success: true,
            message: text
        }, { status: 200 });
        // const result = await streamText({
        //     model: openai('gpt-4-turbo'),
        //     prompt,
        // });

        // return result.toAIStreamResponse();
    } catch (error) {
        // if (error) {

        // } else {
        console.log("An unexpexted error occured", error);
        throw error;
        // }
    }
}