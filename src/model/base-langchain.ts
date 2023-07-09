import {z} from 'zod';
import {OpenAI} from "langchain/llms/openai";
import {OutputFixingParser, StructuredOutputParser} from "langchain/output_parsers";
import {PromptTemplate} from "langchain/prompts";
import {template} from "./template";
import {ChatOpenAI} from "langchain/chat_models/openai";

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        tasks: z.array(z.string()).describe('generated tasks')
    })
)

const formatInstructions = parser.getFormatInstructions()

const prompt = new PromptTemplate({
    template: `${template}\n{goal}\n{format_instructions}`,
    inputVariables: ['goal'],
    partialVariables: {format_instructions: formatInstructions},
})

export const createSuggestions = async (goal: string) => {
    const model = new OpenAI({temperature: 0.6})
    const input = await prompt.format({
        goal: `goal: ${goal}`
    })
    const response = await model.call(input);
    try {
        const {tasks} = (await parser.parse(response));
        return tasks;
    } catch (e) {

        console.error(e, 'try to fix this output');
        const fixParser = OutputFixingParser.fromLLM(
            new ChatOpenAI({temperature: 0}),
            parser
        );

        try {
            const {tasks} = await fixParser.parse(response);
            return tasks
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}
