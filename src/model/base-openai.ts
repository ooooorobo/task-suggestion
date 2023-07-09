import {ChatCompletionRequestMessage, Configuration, OpenAIApi} from "openai";
import {template} from "./template";

const params = {
    temperature: 0.8,
    apiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo",
    maxTokens: 1000,
};

const configuration = new Configuration({
    apiKey: params.apiKey,
})

const requestCompletion = async (messages: ChatCompletionRequestMessage[]): Promise<string> => {
    const openai = new OpenAIApi(configuration);
    try {
        const response = await openai.createChatCompletion({
            model: params.modelName,
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

const defaultMessages: ChatCompletionRequestMessage[] = [
    {role: 'system', content: `예시와 같은 형식으로 대답하세요. (예시: 규칙적인 운동 하기,균형잡힌 식사하기,충분한 수면 취하기) / (중요) 설명을 덧붙이지 말고, 앞에 숫자를 붙이지 마세요. .split(\',\')으로 문자열을 쪼갰을때 목표만 있는 문자열 배열이 될 수 있게 대답하세요. \\n을 포함하지 마세요. ${template}`},
];

export const suggestTasks = async (goal: string): Promise<string[]> => {
    const response = await requestCompletion([...defaultMessages, {role: 'user', content: goal}]);
    return response.split(',').map(x => x.trim())
}
