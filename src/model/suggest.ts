import {requestCompletion} from "./base";
import {ChatCompletionRequestMessage} from "openai";

const defaultMessages: ChatCompletionRequestMessage[] = [
    {role: 'system', content: '예시와 같은 형식으로 대답하세요. (예시: 규칙적인 운동 하기,균형잡힌 식사하기,충분한 수면 취하기) / (중요) 설명을 덧붙이지 말고, 앞에 숫자를 붙이지 마세요. .split(\',\')으로 문자열을 쪼갰을때 목표만 있는 문자열 배열이 될 수 있게 대답하세요. \\n을 포함하지 마세요. 다음에 주어질 문장은 만다라트 표에 들어갈 목표 중 하나입니다. 이 목표를 이루기 위해 추천할만한 하위 목표를 짦고 간결하지만 실천 가능하도록 각각 30자 이내로 3개까지 추천해 주세요'},
];

export const suggestTasks = async (goal: string): Promise<string[]> => {
    const response = await requestCompletion([...defaultMessages, {role: 'user', content: goal}]);
    return response.split(',').map(x => x.trim())
}
