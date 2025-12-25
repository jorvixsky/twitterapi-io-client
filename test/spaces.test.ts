import { describe, it, expect } from "vitest";
import { client, SAMPLE_SPACE_ID } from "./setup";

describe("SpacesApi", () => {
    describe("getSpaceDetail", () => {
        it("Should be able to get space detail", async () => {
            if (!SAMPLE_SPACE_ID) {
                return;
            }
            try {
                const spaceDetail = await client.spaces.getSpaceDetail(SAMPLE_SPACE_ID);
                expect(spaceDetail).toBeDefined();
                const data = (spaceDetail as any).data || spaceDetail;
                expect(data.id !== undefined || data.space_id !== undefined).toBe(true);
                expect(data.status !== undefined).toBe(true);
            } catch (error: any) {
                if (error.message.includes("Not Found") || error.message.includes("404")) {
                    // Space might not exist or endpoint might not be available
                    return;
                }
                throw error;
            }
        });
    });
});

