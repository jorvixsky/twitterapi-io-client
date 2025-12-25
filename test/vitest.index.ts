import { describe, it, expect, beforeAll } from "vitest";
import { TwitterAPIIOClient } from "../src/client";

describe("Environment", () => {
    it("Should have TWITTERAPI_IO_API_KEY", () => {
        expect(process.env.VITE_TWITTERAPI_IO_API_KEY).toBeDefined();
    });
});

describe("Client", () => {
    it("Should throw an error if API key is invalid", async () => {
        const client = new TwitterAPIIOClient({
            apiKey: "invalid",
        });
        await expect(client.myEndpoint.getMyAccountInfo()).rejects.toThrow();
    });
    it("Should be able to get my account info", async () => {
        const client = new TwitterAPIIOClient({
            apiKey: process.env.VITE_TWITTERAPI_IO_API_KEY!,
        });
        const myAccountInfo = await client.myEndpoint.getMyAccountInfo();
        expect(myAccountInfo).toBeDefined();
        expect(myAccountInfo.recharge_credits).toBeDefined();
        expect(myAccountInfo.total_bonus_credits).toBeDefined();
    });
});

let client: TwitterAPIIOClient = new TwitterAPIIOClient({
    apiKey: process.env.VITE_TWITTERAPI_IO_API_KEY!,
});

const SAMPLE_USERNAME = "jorvixsky";
const SAMPLE_TARGET_USERNAME = "ethereum";
const SAMPLE_USER_ID = "1864954440";
const SAMPLE_LIST_ID = "952969346518720512";
const SAMPLE_COMMUNITY_ID = "1472105760389668865";
const SAMPLE_SPACE_ID = "1gqGvyLYggnKB";
const SAMPLE_TWEET_IDS: string[] = ["2004124313679548708", "1907121732860911954", "1986088424026120672"];
const SAMPLE_TWEET_ID = "2004124313679548708";
const SAMPLE_ARTICLE_ID = "1765884209527394325";
const SAMPLE_WOEID = 753692;
const SAMPLE_SINCE_TIME = Date.now() - 7 * 24 * 60 * 60 * 1000;
const SAMPLE_UNTIL_TIME = Date.now();

describe("UsersApi", () => {
    describe("getUserProfileAbout", () => {
        it("Should be able to get user profile about", async () => {
            const userProfileAbout = await client.users.getUserProfileAbout(SAMPLE_USERNAME);
            expect(userProfileAbout).toBeDefined();
            expect(userProfileAbout.data).toBeDefined();
            expect(userProfileAbout.data.id).toBeDefined();
            expect(userProfileAbout.data.userName).toBeDefined();
        });
    });

    describe("getUserInfo", () => {
        it("Should be able to get user info", async () => {
            const userInfo = await client.users.getUserInfo(SAMPLE_USERNAME);
            expect(userInfo).toBeDefined();
            expect(userInfo.id).toBeDefined();
            expect(userInfo.userName).toBeDefined();
            expect(userInfo.name).toBeDefined();
        });
    });

    describe("getUserLatestTweets", () => {
        it("Should be able to get user latest tweets by userId", async () => {
            const userLatestTweets = await client.users.getUserLatestTweets(SAMPLE_USER_ID, undefined, undefined, 100, true);
            expect(userLatestTweets).toBeDefined();
            expect(userLatestTweets.tweets).toBeDefined();
            expect(Array.isArray(userLatestTweets.tweets)).toBe(true);
            expect(userLatestTweets.has_next_page).toBeDefined();
            expect(userLatestTweets.next_cursor).toBeDefined();
        });

        it("Should be able to get user latest tweets by userName", async () => {
            const userLatestTweets = await client.users.getUserLatestTweets(undefined, SAMPLE_USERNAME, undefined, 50, false);
            expect(userLatestTweets).toBeDefined();
            expect(userLatestTweets.tweets).toBeDefined();
        });

        it("Should trigger error if both userId and userName are not provided", async () => {
            await expect(client.users.getUserLatestTweets(undefined, undefined, undefined, 100, true)).rejects.toThrow("Either userId or userName is required");
        });

        it("Should support pagination with cursor", async () => {
            const firstPage = await client.users.getUserLatestTweets(SAMPLE_USER_ID);
            if (firstPage.has_next_page && firstPage.next_cursor) {
                const secondPage = await client.users.getUserLatestTweets(SAMPLE_USER_ID, undefined, firstPage.next_cursor);
                expect(secondPage).toBeDefined();
                expect(secondPage.tweets).toBeDefined();
            }
        });
    });

    describe("getUserFollowers", () => {
        it("Should be able to get user followers", async () => {
            const userFollowers = await client.users.getUserFollowers(SAMPLE_USERNAME);
            expect(userFollowers).toBeDefined();
            expect(userFollowers.followers).toBeDefined();
            expect(Array.isArray(userFollowers.followers)).toBe(true);
            expect(userFollowers.has_next_page).toBeDefined();
            expect(userFollowers.next_cursor).toBeDefined();
        });

        it("Should support pagination with cursor", async () => {
            const firstPage = await client.users.getUserFollowers(SAMPLE_USERNAME);
            if (firstPage.has_next_page && firstPage.next_cursor) {
                const secondPage = await client.users.getUserFollowers(SAMPLE_USERNAME, firstPage.next_cursor);
                expect(secondPage).toBeDefined();
            }
        });

        it("Should support custom page size", async () => {
            const followers = await client.users.getUserFollowers(SAMPLE_USERNAME, undefined, 50);
            expect(followers).toBeDefined();
        });
    });

    describe("getUserFollowings", () => {
        it("Should be able to get user followings", async () => {
            const userFollowings = await client.users.getUserFollowings(SAMPLE_USERNAME);
            expect(userFollowings).toBeDefined();
            expect(userFollowings.followings).toBeDefined();
            expect(Array.isArray(userFollowings.followings)).toBe(true);
            expect(userFollowings.has_next_page).toBeDefined();
            expect(userFollowings.next_cursor).toBeDefined();
        });

        it("Should support pagination with cursor", async () => {
            const firstPage = await client.users.getUserFollowings(SAMPLE_USERNAME);
            if (firstPage.has_next_page && firstPage.next_cursor) {
                const secondPage = await client.users.getUserFollowings(SAMPLE_USERNAME, firstPage.next_cursor);
                expect(secondPage).toBeDefined();
            }
        });
    });

    describe("getUserMentions", () => {
        it("Should be able to get user mentions", async () => {
            const userMentions = await client.users.getUserMentions(SAMPLE_USERNAME, SAMPLE_SINCE_TIME, SAMPLE_UNTIL_TIME);
            expect(userMentions).toBeDefined();
            expect(userMentions.tweets).toBeDefined();
            expect(Array.isArray(userMentions.tweets)).toBe(true);
            expect(userMentions.has_next_page).toBeDefined();
            expect(userMentions.next_cursor).toBeDefined();
        });

        it("Should support pagination with cursor", async () => {
            const firstPage = await client.users.getUserMentions(SAMPLE_USERNAME, SAMPLE_SINCE_TIME, SAMPLE_UNTIL_TIME);
            if (firstPage.has_next_page && firstPage.next_cursor) {
                const secondPage = await client.users.getUserMentions(SAMPLE_USERNAME, SAMPLE_SINCE_TIME, SAMPLE_UNTIL_TIME, firstPage.next_cursor);
                expect(secondPage).toBeDefined();
            }
        });
    });

    describe("checkFollowRelationship", () => {
        it("Should be able to check follow relationship", async () => {
            const sourceUserName = SAMPLE_USERNAME;
            const targetUserName = SAMPLE_TARGET_USERNAME;
            if (targetUserName) {
                const relationship = await client.users.checkFollowRelationship(sourceUserName, targetUserName);
                expect(relationship).toBeDefined();
                expect(relationship.data).toBeDefined();
                expect(typeof relationship.data.following).toBe("boolean");
                expect(typeof relationship.data.followed_by).toBe("boolean");
            }
        });
    });

    describe("searchUserByKeyword", () => {
        it("Should be able to search users by keyword", async () => {
            const searchResults = await client.users.searchUserByKeyword("twitter");
            expect(searchResults).toBeDefined();
            expect(searchResults.users).toBeDefined();
            expect(Array.isArray(searchResults.users)).toBe(true);
            expect(searchResults.has_next_page).toBeDefined();
            expect(searchResults.next_cursor).toBeDefined();
        });

        it("Should support pagination with cursor", async () => {
            const firstPage = await client.users.searchUserByKeyword("twitter");
            if (firstPage.has_next_page && firstPage.next_cursor) {
                const secondPage = await client.users.searchUserByKeyword("twitter", firstPage.next_cursor);
                expect(secondPage).toBeDefined();
            }
        });
    });

    describe("getUserVerifiedFollowers", () => {
        it("Should be able to get user verified followers", async () => {
            const verifiedFollowers = await client.users.getUserVerifiedFollowers(SAMPLE_USER_ID);
            expect(verifiedFollowers).toBeDefined();
            expect(verifiedFollowers.followers).toBeDefined();
            expect(Array.isArray(verifiedFollowers.followers)).toBe(true);
        });

        it("Should support pagination with cursor", async () => {
            const firstPage = await client.users.getUserVerifiedFollowers(SAMPLE_USER_ID);
            if (firstPage.followers.length > 0) {
                // Note: This endpoint may not return cursor, adjust based on actual API response
                const secondPage = await client.users.getUserVerifiedFollowers(SAMPLE_USER_ID, "");
                expect(secondPage).toBeDefined();
            }
        });
    });
});

describe("ListApi", () => {
    describe("getListFollowers", () => {
        it("Should be able to get list followers", async () => {
            if (!SAMPLE_LIST_ID) {
                return;
            }
            const listFollowers = await client.list.getListFollowers(SAMPLE_LIST_ID);
            expect(listFollowers).toBeDefined();
            expect(listFollowers.followers).toBeDefined();
            expect(Array.isArray(listFollowers.followers)).toBe(true);
            expect(listFollowers.has_next_page).toBeDefined();
            expect(listFollowers.next_cursor).toBeDefined();
        });

        it("Should support pagination with cursor", async () => {
            if (!SAMPLE_LIST_ID) {
                return;
            }
            const firstPage = await client.list.getListFollowers(SAMPLE_LIST_ID);
            if (firstPage.has_next_page && firstPage.next_cursor) {
                const secondPage = await client.list.getListFollowers(SAMPLE_LIST_ID, firstPage.next_cursor);
                expect(secondPage).toBeDefined();
            }
        });
    });

    describe("getListMembers", () => {
        it("Should be able to get list members", async () => {
            if (!SAMPLE_LIST_ID) {
                return;
            }
            const listMembers = await client.list.getListMembers(SAMPLE_LIST_ID);
            expect(listMembers).toBeDefined();
            expect(listMembers.members).toBeDefined();
            expect(Array.isArray(listMembers.members)).toBe(true);
            expect(listMembers.has_next_page).toBeDefined();
            expect(listMembers.next_cursor).toBeDefined();
        });

        it("Should support pagination with cursor", async () => {
            if (!SAMPLE_LIST_ID) {
                return;
            }
            const firstPage = await client.list.getListMembers(SAMPLE_LIST_ID);
            if (firstPage.has_next_page && firstPage.next_cursor) {
                const secondPage = await client.list.getListMembers(SAMPLE_LIST_ID, firstPage.next_cursor);
                expect(secondPage).toBeDefined();
            }
        });
    });
});

describe("CommunitiesApi", () => {
    describe("getCommunityInfo", () => {
        it("Should be able to get community info", async () => {
            if (!SAMPLE_COMMUNITY_ID) {
                return;
            }
            const communityInfo = await client.communities.getCommunityInfo(SAMPLE_COMMUNITY_ID);
            expect(communityInfo).toBeDefined();
            expect(communityInfo.id).toBeDefined();
            expect(communityInfo.name).toBeDefined();
            expect(communityInfo.status).toBeDefined();
        });
    });

    describe("getCommunityMembers", () => {
        it("Should be able to get community members", async () => {
            if (!SAMPLE_COMMUNITY_ID) {
                return;
            }
            const communityMembers = await client.communities.getCommunityMembers(SAMPLE_COMMUNITY_ID);
            expect(communityMembers).toBeDefined();
            expect(communityMembers.members).toBeDefined();
            expect(Array.isArray(communityMembers.members)).toBe(true);
            expect(communityMembers.has_next_page).toBeDefined();
            expect(communityMembers.next_cursor).toBeDefined();
        });

        it("Should support pagination with cursor", async () => {
            if (!SAMPLE_COMMUNITY_ID) {
                return;
            }
            const firstPage = await client.communities.getCommunityMembers(SAMPLE_COMMUNITY_ID);
            if (firstPage.has_next_page && firstPage.next_cursor) {
                const secondPage = await client.communities.getCommunityMembers(SAMPLE_COMMUNITY_ID, firstPage.next_cursor);
                expect(secondPage).toBeDefined();
            }
        });
    });

    describe("getCommunityModerators", () => {
        it("Should be able to get community moderators", async () => {
            if (!SAMPLE_COMMUNITY_ID) {
                return;
            }
            const communityModerators = await client.communities.getCommunityModerators(SAMPLE_COMMUNITY_ID);
            expect(communityModerators).toBeDefined();
            expect(communityModerators.moderators).toBeDefined();
            expect(Array.isArray(communityModerators.moderators)).toBe(true);
            expect(communityModerators.has_next_page).toBeDefined();
            expect(communityModerators.next_cursor).toBeDefined();
        });

        it("Should support pagination with cursor", async () => {
            if (!SAMPLE_COMMUNITY_ID) {
                return;
            }
            const firstPage = await client.communities.getCommunityModerators(SAMPLE_COMMUNITY_ID);
            if (firstPage.has_next_page && firstPage.next_cursor) {
                const secondPage = await client.communities.getCommunityModerators(SAMPLE_COMMUNITY_ID, firstPage.next_cursor);
                expect(secondPage).toBeDefined();
            }
        });
    });

    describe("getCommunityTweets", () => {
        it("Should be able to get community tweets", async () => {
            if (!SAMPLE_COMMUNITY_ID) {
                return;
            }
            const communityTweets = await client.communities.getCommunityTweets(SAMPLE_COMMUNITY_ID);
            expect(communityTweets).toBeDefined();
            expect(communityTweets.tweets).toBeDefined();
            expect(Array.isArray(communityTweets.tweets)).toBe(true);
            expect(communityTweets.has_next_page).toBeDefined();
            expect(communityTweets.next_cursor).toBeDefined();
        });

        it("Should support pagination with cursor", async () => {
            if (!SAMPLE_COMMUNITY_ID) {
                return;
            }
            const firstPage = await client.communities.getCommunityTweets(SAMPLE_COMMUNITY_ID);
            if (firstPage.has_next_page && firstPage.next_cursor) {
                const secondPage = await client.communities.getCommunityTweets(SAMPLE_COMMUNITY_ID, firstPage.next_cursor);
                expect(secondPage).toBeDefined();
            }
        });
    });

    describe("searchCommunityTweets", () => {
        it("Should be able to search community tweets with default queryType", async () => {
            const searchResults = await client.communities.searchCommunityTweets("test");
            expect(searchResults).toBeDefined();
            expect(searchResults.tweets).toBeDefined();
            expect(Array.isArray(searchResults.tweets)).toBe(true);
            expect(searchResults.has_next_page).toBeDefined();
            expect(searchResults.next_cursor).toBeDefined();
        });

        it("Should be able to search community tweets with 'latest' queryType", async () => {
            const searchResults = await client.communities.searchCommunityTweets("test", "latest");
            expect(searchResults).toBeDefined();
            expect(searchResults.tweets).toBeDefined();
        });

        it("Should be able to search community tweets with 'top' queryType", async () => {
            const searchResults = await client.communities.searchCommunityTweets("test", "top");
            expect(searchResults).toBeDefined();
            expect(searchResults.tweets).toBeDefined();
        });

        it("Should support pagination with cursor", async () => {
            const firstPage = await client.communities.searchCommunityTweets("test");
            if (firstPage.has_next_page && firstPage.next_cursor) {
                const secondPage = await client.communities.searchCommunityTweets("test", "latest", firstPage.next_cursor);
                expect(secondPage).toBeDefined();
            }
        });
    });
});

describe("TrendsApi", () => {
    describe("getTrends", () => {
        it("Should be able to get trends", async () => {
            const trends = await client.trends.getTrends(SAMPLE_WOEID);
            expect(trends).toBeDefined();
            expect(trends.trends).toBeDefined();
            expect(Array.isArray(trends.trends)).toBe(true);
            expect(trends.as_of).toBeDefined();
            expect(trends.created_at).toBeDefined();
            expect(trends.locations).toBeDefined();
            expect(Array.isArray(trends.locations)).toBe(true);
        });

        it("Should return trends for different WOEIDs", async () => {
            // Test with worldwide (1)
            const worldwideTrends = await client.trends.getTrends(1);
            expect(worldwideTrends).toBeDefined();
            expect(worldwideTrends.trends).toBeDefined();

            const otherTrends = await client.trends.getTrends(SAMPLE_WOEID);
            expect(otherTrends).toBeDefined();
            expect(otherTrends.trends).toBeDefined();
            expect(Array.isArray(otherTrends.trends)).toBe(true);
            expect(otherTrends.as_of).toBeDefined();
            expect(otherTrends.created_at).toBeDefined();
            expect(otherTrends.locations).toBeDefined();
            expect(Array.isArray(otherTrends.locations)).toBe(true);
        });
    });
});

describe("SpacesApi", () => {
    describe("getSpaceDetail", () => {
        it("Should be able to get space detail", async () => {
            if (!SAMPLE_SPACE_ID) {
                return;
            }
            const spaceDetail = await client.spaces.getSpaceDetail(SAMPLE_SPACE_ID);
            expect(spaceDetail).toBeDefined();
            expect(spaceDetail.id).toBeDefined();
            expect(spaceDetail.state).toBeDefined();
            expect(spaceDetail.status).toBeDefined();
        });
    });
});

describe("TweetsApi", () => {
    describe("getTweetsByIds", () => {
        it("Should be able to get tweets by IDs", async () => {
            if (SAMPLE_TWEET_IDS.length === 0) {
                return;
            }
            const tweets = await client.tweets.getTweetsByIds(SAMPLE_TWEET_IDS);
            expect(tweets).toBeDefined();
            expect(tweets.tweets).toBeDefined();
            expect(Array.isArray(tweets.tweets)).toBe(true);
            expect(tweets.status).toBeDefined();
        });

        it("Should handle multiple tweet IDs", async () => {
            if (SAMPLE_TWEET_IDS.length < 2) {
                return;
            }
            const tweets = await client.tweets.getTweetsByIds(SAMPLE_TWEET_IDS.slice(0, 2));
            expect(tweets).toBeDefined();
            expect(tweets.tweets).toBeDefined();
        });
    });

    describe("getTweetReplies", () => {
        it("Should be able to get tweet replies", async () => {
            if (!SAMPLE_TWEET_ID) {
                return;
            }
            const replies = await client.tweets.getTweetReplies(SAMPLE_TWEET_ID);
            expect(replies).toBeDefined();
            expect(replies.tweets).toBeDefined();
            expect(Array.isArray(replies.tweets)).toBe(true);
            expect(replies.has_next_page).toBeDefined();
            expect(replies.next_cursor).toBeDefined();
        });

        it("Should support pagination with cursor", async () => {
            if (!SAMPLE_TWEET_ID) {
                return;
            }
            const firstPage = await client.tweets.getTweetReplies(SAMPLE_TWEET_ID);
            if (firstPage.has_next_page && firstPage.next_cursor) {
                const secondPage = await client.tweets.getTweetReplies(SAMPLE_TWEET_ID, firstPage.next_cursor);
                expect(secondPage).toBeDefined();
            }
        });
    });

    describe("getTweetQuotations", () => {
        it("Should be able to get tweet quotations", async () => {
            if (!SAMPLE_TWEET_ID) {
                return;
            }
            const quotations = await client.tweets.getTweetQuotations(SAMPLE_TWEET_ID);
            expect(quotations).toBeDefined();
            expect(quotations.tweets).toBeDefined();
            expect(Array.isArray(quotations.tweets)).toBe(true);
            expect(quotations.has_next_page).toBeDefined();
            expect(quotations.next_cursor).toBeDefined();
        });

        it("Should support pagination with cursor", async () => {
            if (!SAMPLE_TWEET_ID) {
                return;
            }
            const firstPage = await client.tweets.getTweetQuotations(SAMPLE_TWEET_ID);
            if (firstPage.has_next_page && firstPage.next_cursor) {
                const secondPage = await client.tweets.getTweetQuotations(SAMPLE_TWEET_ID, firstPage.next_cursor);
                expect(secondPage).toBeDefined();
            }
        });
    });

    describe("getTweetRetweeters", () => {
        it("Should be able to get tweet retweeters", async () => {
            if (!SAMPLE_TWEET_ID) {
                return;
            }
            const retweeters = await client.tweets.getTweetRetweeters(SAMPLE_TWEET_ID);
            expect(retweeters).toBeDefined();
            expect(retweeters.retweeters).toBeDefined();
            expect(Array.isArray(retweeters.retweeters)).toBe(true);
            expect(retweeters.has_next_page).toBeDefined();
            expect(retweeters.next_cursor).toBeDefined();
        });

        it("Should support pagination with cursor", async () => {
            if (!SAMPLE_TWEET_ID) {
                return;
            }
            const firstPage = await client.tweets.getTweetRetweeters(SAMPLE_TWEET_ID);
            if (firstPage.has_next_page && firstPage.next_cursor) {
                const secondPage = await client.tweets.getTweetRetweeters(SAMPLE_TWEET_ID, firstPage.next_cursor);
                expect(secondPage).toBeDefined();
            }
        });
    });

    describe("getTweetThreadContext", () => {
        it("Should be able to get tweet thread context", async () => {
            if (!SAMPLE_TWEET_ID) {
                return;
            }
            const threadContext = await client.tweets.getTweetThreadContext(SAMPLE_TWEET_ID);
            expect(threadContext).toBeDefined();
            expect(threadContext.tweets).toBeDefined();
            expect(Array.isArray(threadContext.tweets)).toBe(true);
            expect(threadContext.status).toBeDefined();
        });
    });

    describe("getArticle", () => {
        it("Should be able to get article", async () => {
            if (!SAMPLE_ARTICLE_ID) {

                return;
            }
            const article = await client.tweets.getArticle(SAMPLE_ARTICLE_ID);
            expect(article).toBeDefined();
            expect(article.article).toBeDefined();
            expect(article.article.id).toBeDefined();
            expect(article.article.url).toBeDefined();
            expect(article.status).toBeDefined();
        });
    });

    describe("searchTweets", () => {
        it("Should be able to search tweets with default queryType", async () => {
            const searchResults = await client.tweets.searchTweets("test");
            expect(searchResults).toBeDefined();
            expect(searchResults.tweets).toBeDefined();
            expect(Array.isArray(searchResults.tweets)).toBe(true);
            expect(searchResults.has_next_page).toBeDefined();
            expect(searchResults.next_cursor).toBeDefined();
        });

        it("Should be able to search tweets with 'latest' queryType", async () => {
            const searchResults = await client.tweets.searchTweets("test", "latest");
            expect(searchResults).toBeDefined();
            expect(searchResults.tweets).toBeDefined();
        });

        it("Should be able to search tweets with 'top' queryType", async () => {
            const searchResults = await client.tweets.searchTweets("test", "top");
            expect(searchResults).toBeDefined();
            expect(searchResults.tweets).toBeDefined();
        });

        it("Should support pagination with cursor", async () => {
            const firstPage = await client.tweets.searchTweets("test");
            if (firstPage.has_next_page && firstPage.next_cursor) {
                const secondPage = await client.tweets.searchTweets("test", "latest", firstPage.next_cursor);
                expect(secondPage).toBeDefined();
            }
        });
    });
});
