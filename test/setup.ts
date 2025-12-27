import { TwitterAPIIOClient } from "../src/client";

export const SAMPLE_USERNAME = "VitalikButerin";
export const SAMPLE_TARGET_USERNAME = "ethereum";
export const SAMPLE_USER_ID = "295218901";
export const SAMPLE_USER_ID_2 = "2312333412";
export const SAMPLE_LIST_ID = "952969346518720512";
export const SAMPLE_COMMUNITY_ID = "1472105760389668865";
export const SAMPLE_SPACE_ID = "1gqGvyLYggnKB";
export const SAMPLE_TWEET_IDS: string[] = ["2004124313679548708", "1907121732860911954", "1986088424026120672"];
export const SAMPLE_TWEET_ID = "2004124313679548708";
export const SAMPLE_ARTICLE_ID = "1765884209527394325";
export const SAMPLE_WOEID = 753692;
export const SAMPLE_SINCE_TIME = Date.now() - 7 * 24 * 60 * 60 * 1000;
export const SAMPLE_UNTIL_TIME = Date.now();

export const client: TwitterAPIIOClient = new TwitterAPIIOClient({
    apiKey: process.env.VITE_TWITTERAPI_IO_API_KEY!,
});

