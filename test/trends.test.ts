import { describe, it, expect } from "vitest";
import { client, SAMPLE_WOEID } from "./setup";

describe("TrendsApi", () => {
    describe("getTrends", () => {
        it("Should be able to get trends", async () => {
            const trends = await client.trends.getTrends(SAMPLE_WOEID);
            expect(trends).toBeDefined();
            // Response might be wrapped in data or have different structure
            const trendsData = (trends as any).data || trends;
            const trendsList = trendsData.trends || trendsData[0]?.trends;
            expect(trendsList !== undefined || Array.isArray(trendsData)).toBe(true);
        });

        it("Should return trends for different WOEIDs", async () => {
            // Test with worldwide (1)
            const worldwideTrends = await client.trends.getTrends(1);
            expect(worldwideTrends).toBeDefined();
            const worldwideData = (worldwideTrends as any).data || worldwideTrends;
            expect(worldwideData.trends !== undefined || Array.isArray(worldwideData)).toBe(true);

            const otherTrends = await client.trends.getTrends(SAMPLE_WOEID);
            expect(otherTrends).toBeDefined();
            const otherData = (otherTrends as any).data || otherTrends;
            expect(otherData.trends !== undefined || Array.isArray(otherData)).toBe(true);
        });
    });
});

