import  Configuration  from "openai";

export const configureopenai = () => {
    return new Configuration({
        apiKey: process.env.OPENAI_KEY,
        organization: process.env.OPENAI_ORGANIZATION,
    });
};
