import {ChatCompletionRequestMessage, Configuration, OpenAIApi} from "openai";

const params = {
    verbose: true,
    temperature: 0.6,
    apiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo",
    maxConcurrency: 1,
    maxTokens: 1000,
    maxRetries: 1,
};

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

export const requestCompletion = async (messages: ChatCompletionRequestMessage[]): Promise<string> => {
    const openai = new OpenAIApi(configuration);
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            temperature: params.temperature,
            max_tokens: params.maxTokens,
            messages: messages,
        })

        return response.data.choices[0].message?.content ?? '';
    } catch(e) {
        console.error(e);
        return '';
    }
}
