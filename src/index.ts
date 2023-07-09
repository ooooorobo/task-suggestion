require('dotenv').config()
import {suggestTasks} from "./model/suggest";

suggestTasks('메인 목표: 위대한 개발자, 서브 목표: 공부').then(tasks => console.log(tasks));
