import { describe, it, expect } from "vitest";
import { client, SAMPLE_LIST_ID } from "./setup";

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

