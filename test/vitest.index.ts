import { describe, it, expect } from "vitest";
import { TwitterAPIIOClient } from "../src/client";

describe("Environment", () => {
    it("Should have TWITTERAPI_IO_API_KEY", () => {
        expect(process.env.VITE_TWITTERAPI_IO_API_KEY).toBeDefined()
    });
});

describe("Client", () => {
    it("Should throw an error if API key is invalid", async () => {
        const client = new TwitterAPIIOClient({
            apiKey: "invalid",
        });
        await expect(client.myEndpoint.getMyAccountInfo()).rejects.toThrow("Unauthorized");
    });
    it("Should be able to get my account info", async () => {
        const client = new TwitterAPIIOClient({
            apiKey: process.env.VITE_TWITTERAPI_IO_API_KEY!,
        });
        const myAccountInfo = await client.myEndpoint.getMyAccountInfo();
        expect(myAccountInfo).toBeDefined();
    });
});

let client: TwitterAPIIOClient = new TwitterAPIIOClient({
    apiKey: process.env.VITE_TWITTERAPI_IO_API_KEY!,
})

describe("UsersApi", () => {
    it("Should be able to get user profile about", async () => {
        const userProfileAbout = await client.users.getUserProfileAbout("jorvixsky");
        expect(userProfileAbout).toBeDefined();
    });
    it("Should be able to get user info", async () => {
        const userInfo = await client.users.getUserInfo("jorvixsky");
        expect(userInfo).toBeDefined();
    });
    it("Should be able to get user followers", async () => {
        const userFollowers = await client.users.getUserFollowers("jorvixsky");
        expect(userFollowers.followers.length).toBeGreaterThan(0);
    });
});