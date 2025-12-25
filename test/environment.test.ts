import { describe, it, expect } from "vitest";
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

