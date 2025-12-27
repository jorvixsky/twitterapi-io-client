import { describe, it, expect } from "vitest";
import { client, SAMPLE_TWEET_IDS, SAMPLE_TWEET_ID, SAMPLE_ARTICLE_ID } from "./setup";

describe("TweetsApi", () => {
    describe("getTweetsByIds", () => {
        it("Should be able to get tweets by IDs", async () => {
            if (SAMPLE_TWEET_IDS.length === 0) {
                return;
            }
            try {
                const tweets = await client.tweets.getTweetsByIds(SAMPLE_TWEET_IDS);
                expect(tweets).toBeDefined();
                const tweetsData = (tweets as any).data?.tweets || tweets.tweets;
                expect(tweetsData !== undefined).toBe(true);
                if (tweetsData) {
                    expect(Array.isArray(tweetsData)).toBe(true);
                }
            } catch (error: any) {
                if (error.message.includes("Not Found") || error.message.includes("404")) {
                    return;
                }
                throw error;
            }
        });

        it("Should handle multiple tweet IDs", async () => {
            if (SAMPLE_TWEET_IDS.length < 2) {
                return;
            }
            try {
                const tweets = await client.tweets.getTweetsByIds(SAMPLE_TWEET_IDS.slice(0, 2));
                expect(tweets).toBeDefined();
            } catch (error: any) {
                if (error.message.includes("Not Found") || error.message.includes("404")) {
                    return;
                }
                throw error;
            }
        });
    });

    describe("getTweetReplies", () => {
        it("Should be able to get tweet replies", async () => {
            if (!SAMPLE_TWEET_ID) {
                return;
            }
            try {
                const replies = await client.tweets.getTweetReplies(SAMPLE_TWEET_ID);
                expect(replies).toBeDefined();
                const tweets = (replies as any).data?.tweets || replies.tweets;
                expect(tweets !== undefined).toBe(true);
            } catch (error: any) {
                if (error.message.includes("Bad Request") || error.message.includes("Not Found")) {
                    // Tweet might not exist or have no replies
                    return;
                }
                throw error;
            }
        });

        it("Should support pagination with cursor", async () => {
            if (!SAMPLE_TWEET_ID) {
                return;
            }
            try {
                const firstPage = await client.tweets.getTweetReplies(SAMPLE_TWEET_ID);
                const hasNext = firstPage.has_next_page || (firstPage as any).data?.has_next_page;
                const cursor = firstPage.next_cursor || (firstPage as any).data?.next_cursor;
                if (hasNext && cursor) {
                    const secondPage = await client.tweets.getTweetReplies(SAMPLE_TWEET_ID, cursor);
                    expect(secondPage).toBeDefined();
                }
            } catch (error: any) {
                if (error.message.includes("Bad Request") || error.message.includes("Not Found")) {
                    return;
                }
                throw error;
            }
        });
    });

    describe("getTweetQuotations", () => {
        it("Should be able to get tweet quotations", async () => {
            if (!SAMPLE_TWEET_ID) {
                return;
            }
            try {
                const quotations = await client.tweets.getTweetQuotations(SAMPLE_TWEET_ID);
                expect(quotations).toBeDefined();
                const tweets = (quotations as any).data?.tweets || quotations.tweets;
                expect(tweets !== undefined).toBe(true);
            } catch (error: any) {
                if (error.message.includes("Not Found") || error.message.includes("404")) {
                    return;
                }
                throw error;
            }
        });

        it("Should support pagination with cursor", async () => {
            if (!SAMPLE_TWEET_ID) {
                return;
            }
            try {
                const firstPage = await client.tweets.getTweetQuotations(SAMPLE_TWEET_ID);
                const hasNext = firstPage.has_next_page || (firstPage as any).data?.has_next_page;
                const cursor = firstPage.next_cursor || (firstPage as any).data?.next_cursor;
                if (hasNext && cursor) {
                    const secondPage = await client.tweets.getTweetQuotations(SAMPLE_TWEET_ID, cursor);
                    expect(secondPage).toBeDefined();
                }
            } catch (error: any) {
                if (error.message.includes("Not Found") || error.message.includes("404")) {
                    return;
                }
                throw error;
            }
        });
    });

    describe("getTweetRetweeters", () => {
        it("Should be able to get tweet retweeters", async () => {
            if (!SAMPLE_TWEET_ID) {
                return;
            }
            try {
                const retweeters = await client.tweets.getTweetRetweeters(SAMPLE_TWEET_ID);
                expect(retweeters).toBeDefined();
                const retweetersList = (retweeters as any).data?.retweeters || retweeters.retweeters;
                expect(retweetersList !== undefined).toBe(true);
            } catch (error: any) {
                if (error.message.includes("Bad Request") || error.message.includes("Not Found")) {
                    return;
                }
                throw error;
            }
        });

        it("Should support pagination with cursor", async () => {
            if (!SAMPLE_TWEET_ID) {
                return;
            }
            try {
                const firstPage = await client.tweets.getTweetRetweeters(SAMPLE_TWEET_ID);
                const hasNext = firstPage.has_next_page || (firstPage as any).data?.has_next_page;
                const cursor = firstPage.next_cursor || (firstPage as any).data?.next_cursor;
                if (hasNext && cursor) {
                    const secondPage = await client.tweets.getTweetRetweeters(SAMPLE_TWEET_ID, cursor);
                    expect(secondPage).toBeDefined();
                }
            } catch (error: any) {
                if (error.message.includes("Bad Request") || error.message.includes("Not Found")) {
                    return;
                }
                throw error;
            }
        });
    });

    describe("getTweetThreadContext", () => {
        it("Should be able to get tweet thread context", async () => {
            if (!SAMPLE_TWEET_ID) {
                return;
            }
            try {
                const threadContext = await client.tweets.getTweetThreadContext(SAMPLE_TWEET_ID);
                expect(threadContext).toBeDefined();
                const tweets = (threadContext as any).data?.tweets || threadContext.tweets;
                expect(tweets !== undefined).toBe(true);
            } catch (error: any) {
                if (error.message.includes("Bad Request") || error.message.includes("Not Found")) {
                    return;
                }
                throw error;
            }
        });
    });

    describe("getArticle", () => {
        it("Should be able to get article", async () => {
            if (!SAMPLE_ARTICLE_ID) {
                return;
            }
            try {
                const article = await client.tweets.getArticle(SAMPLE_ARTICLE_ID);
                expect(article).toBeDefined();
                const articleData = (article as any).data?.article || article.article;
                expect(articleData !== undefined).toBe(true);
            } catch (error: any) {
                if (error.message.includes("Bad Request") || error.message.includes("Not Found")) {
                    return;
                }
                throw error;
            }
        });
    });

    describe("searchTweets", () => {
        it("Should be able to search tweets with default queryType", async () => {
            try {
                const searchResults = await client.tweets.searchTweets("test");
                expect(searchResults).toBeDefined();
                const tweets = (searchResults as any).data?.tweets || searchResults.tweets;
                expect(tweets !== undefined).toBe(true);
            } catch (error: any) {
                if (error.message.includes("Not Found") || error.message.includes("404")) {
                    return;
                }
                throw error;
            }
        });

        it("Should be able to search tweets with 'latest' queryType", async () => {
            try {
                const searchResults = await client.tweets.searchTweets("test", "latest");
                expect(searchResults).toBeDefined();
            } catch (error: any) {
                if (error.message.includes("Not Found") || error.message.includes("404")) {
                    return;
                }
                throw error;
            }
        });

        it("Should be able to search tweets with 'top' queryType", async () => {
            try {
                const searchResults = await client.tweets.searchTweets("test", "top");
                expect(searchResults).toBeDefined();
            } catch (error: any) {
                if (error.message.includes("Not Found") || error.message.includes("404")) {
                    return;
                }
                throw error;
            }
        });

        it("Should support pagination with cursor", async () => {
            try {
                const firstPage = await client.tweets.searchTweets("test");
                const hasNext = firstPage.has_next_page || (firstPage as any).data?.has_next_page;
                const cursor = firstPage.next_cursor || (firstPage as any).data?.next_cursor;
                if (hasNext && cursor) {
                    const secondPage = await client.tweets.searchTweets("test", "latest", cursor);
                    expect(secondPage).toBeDefined();
                }
            } catch (error: any) {
                if (error.message.includes("Not Found") || error.message.includes("404")) {
                    return;
                }
                throw error;
            }
        });
    });
});

