import { GoogleGenerativeAI } from "@google/generative-ai";
const getNewsAccessKey = import.meta.env.VITE_GET_NEWS_ACCESS_KEY;
const aiAccessKey = import.meta.env.VITE_AI_ACCESS_KEY;

const url = `http://api.mediastack.com/v1/news`;

export function getNews() {
    const params = {
        languages: 'en',
        countries: 'us,il,ae',
        access_key: getNewsAccessKey ,
        keywords: "israel,palestine",
        limit: 10
    };
    const urlParams = new URLSearchParams(params).toString();
    return fetch(`${url}?${urlParams}`)
        .then(res => res.json())
        .then(res => {
            return res;
        });
}

const genAI = new GoogleGenerativeAI(aiAccessKey);



const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function processTitleMood(titles) {
    let prompt = `for each sentence of the following sentences, 
    give a score based on sentiment analysis, ranging from 0 to 10,
    0 being the most friendly, supportive and empathetic, while 10
    is the most aggressive and charged. return only a list of numbers,
    without any further explanations. make sure that the number of scores
    you return match the numbers of sentences. the sentences are: `;
    prompt += JSON.stringify(titles);
    const result = await model.generateContent(prompt);
    const answer = result.response.text();
    console.log('answer', answer);
    return JSON.parse(answer);
}

export async function changeMood(data) {
    const prompt = `i will give you a title and a news story. you need to 
    make them both calmer, more empathetic and more positive - without loosing
    any of the important existing facts.  the title is: ${data.title}.
    The description is: ${data.description}.
    Return the new value as a an object, with the format: {
        title: <new updated title here>,
        description: <new updated description here>
    }.
    return ONLY this object, without any additional text or explanations.
    dont and anything before or after the {} of the object. dont return markdown.`;
    const result = await model.generateContent(prompt);
    const answer = result.response.text().trim();
    return JSON.parse(answer);
}