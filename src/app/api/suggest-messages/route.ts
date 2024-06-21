import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        const prompt = "Create a list of three open-ended and engaging quetions formatted as a single stirng. Each quetion should be separated by '||'. These questions are for an anonymous social mesaging platform,like Qooh.me, and should be suitable for a diverse audience. Avoid personal of sensetive topics,focusing on universal themes that encourage positive interactions.For exmaple , your output should be structured like this : 'What's a hobby you've recently started? || If you could have dinner with any historical figure, who would it be? || What's a book you've read recently that you'd recommend?'. Ensure the quetions are intriguing ,foster curiosity,and contribute to a positive and welcoming conversational environment.";

        const result = await streamText({
            model: openai('gpt-4-turbo'),
            prompt,
        });

        return result.toAIStreamResponse();
    } catch (error) {
        // if (error) {

        // } else {
        console.log("An unexpexted error occured", error);
        throw error;
        // }
    }
}