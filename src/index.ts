require('dotenv').config()
import {createSuggestions} from "./model/base-langchain";

createSuggestions('바른 몸과 마음').then(tasks => console.log(tasks));
