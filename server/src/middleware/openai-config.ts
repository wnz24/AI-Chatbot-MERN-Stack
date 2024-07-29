import  Configuration  from "openai";

export const configureopenai = () => {
    return new Configuration({
        apiKey: process.env.OPENAI_KEY,
        // project: process.env.OPENAI_PROJECT,
    });
};
