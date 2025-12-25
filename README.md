# TwitterAPI.io TypeScript Client

A TypeScript client library for the [TwitterAPI.io](https://docs.twitterapi.io) API.

## Installation

```bash
npm install twitterapi-io
```

## Usage

```typescript
import { TwitterAPIIOClient } from 'twitterapi-io';

const client = new TwitterAPIIOClient({
  apiKey: 'your-api-key'
});
```

## Supported Endpoints

### ✅ User Endpoint

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| Get User Profile About | `GET /twitter/user_about` | ✅ Supported | `client.users.getUserProfileAbout(userName)` |
| Get User Info | `GET /twitter/user/info` | ✅ Supported | `client.users.getUserInfo(userName)` |
| Get User Last Tweets | `GET /twitter/user/latest_tweets` | ✅ Supported | `client.users.getUserLatestTweets(userId?, userName?, cursor?, pageSize?, includeReplies?)` |
| Get User Followers | `GET /twitter/user/followers` | ✅ Supported | `client.users.getUserFollowers(userName, cursor?, pageSize?)` |
| Get User Followings | `GET /twitter/user/followings` | ✅ Supported | `client.users.getUserFollowings(userName, cursor?, pageSize?)` |
| Get User Mentions | `GET /twitter/user/mentions` | ✅ Supported | `client.users.getUserMentions(username, sinceTime, untilTime, cursor?)` |
| Check Follow Relationship | `GET /twitter/user/check_follow_relationship` | ✅ Supported | `client.users.checkFollowRelationship(sourceUserName, targetUserName)` |
| Search user by keyword | `GET /twitter/user/search` | ✅ Supported | `client.users.searchUserByKeyword(query, cursor?)` |
| Get User Verified Followers | `GET /twitter/user/verifiedFollowers` | ✅ Supported | `client.users.getUserVerifiedFollowers(userId, cursor?)` |
| Batch Get User Info By UserIds | `GET /twitter/user/batch` | ❌ Not Supported | - |

### ✅ List Endpoint

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| Get List Followers | `GET /twitter/list/followers` | ✅ Supported | `client.list.getListFollowers(listId, cursor?)` |
| Get List Members | `GET /twitter/list/members` | ✅ Supported | `client.list.getListMembers(listId, cursor?)` |

### ✅ My Endpoint

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| Get My Account Info | `GET /oapi/my/info` | ✅ Supported | `client.myEndpoint.getMyAccountInfo()` |

### ✅ Communities Endpoint

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| Get Community Info By Id | `GET /twitter/community/info` | ✅ Supported | `client.communities.getCommunityInfo(communityId)` |
| Get Community Members | `GET /twitter/community/members` | ✅ Supported | `client.communities.getCommunityMembers(communityId, cursor?)` |
| Get Community Moderators | `GET /twitter/community/moderators` | ✅ Supported | `client.communities.getCommunityModerators(communityId, cursor?)` |
| Get Community Tweets | `GET /twitter/community/tweets` | ✅ Supported | `client.communities.getCommunityTweets(communityId, cursor?)` |
| Search Tweets From All Community | `GET /twitter/community/search` | ✅ Supported | `client.communities.searchCommunityTweets(query, queryType?, cursor?)` |

### ✅ Trend Endpoint

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| Get Trends | `GET /twitter/trends` | ✅ Supported | `client.trends.getTrends(woeid)` |

### ✅ Spaces Endpoint

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| Get Space Detail | `GET /twitter/space/detail` | ✅ Supported | `client.spaces.getSpaceDetail(spaceId)` |

### ✅ Tweet Endpoint

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| Get Tweets by IDs | `GET /twitter/tweet/by_ids` | ✅ Supported | `client.tweets.getTweetsByIds(tweetIds)` |
| Get Tweet Replies | `GET /twitter/tweet/replies` | ✅ Supported | `client.tweets.getTweetReplies(tweetId, cursor?)` |
| Get Tweet Quotations | `GET /twitter/tweet/quotations` | ✅ Supported | `client.tweets.getTweetQuotations(tweetId, cursor?)` |
| Get Tweet Retweeters | `GET /twitter/tweet/retweeters` | ✅ Supported | `client.tweets.getTweetRetweeters(tweetId, cursor?)` |
| Get Tweet Thread Context | `GET /twitter/tweet/thread_context` | ✅ Supported | `client.tweets.getTweetThreadContext(tweetId)` |
| Get Article | `GET /twitter/article` | ✅ Supported | `client.tweets.getArticle(articleId)` |
| Advanced Search | `GET /twitter/search` | ✅ Supported | `client.tweets.searchTweets(query, queryType?, cursor?)` |

## Not Supported Endpoints

The following endpoint categories are **not yet implemented**:

### ❌ Post & Action Endpoint V2

- `POST /oapi/login` - Log in
- `POST /oapi/upload/media` - Upload media
- `POST /oapi/tweet/create` - Create tweet v2
- `GET /oapi/dm/history` - Get History Messages By UserID
- `POST /oapi/dm/send` - Send DM V2
- `POST /oapi/tweet/retweet` - Retweet Tweet
- `POST /oapi/tweet/delete` - Delete Tweet
- `POST /oapi/user/follow` - Follow User
- `POST /oapi/user/unfollow` - Unfollow User
- `POST /oapi/tweet/like` - Like Tweet
- `POST /oapi/tweet/unlike` - Unlike Tweet
- `POST /oapi/community/create` - Create Community V2
- `POST /oapi/community/delete` - Delete Community V2
- `POST /oapi/community/join` - Join Community v2
- `POST /oapi/community/leave` - Leave Community V2

### ❌ Webhook/Websocket Filter Rule

- `POST /oapi/webhook/filter/add` - Add Webhook/Websocket Tweet Filter Rule
- `GET /oapi/webhook/filter/all` - Get ALL test Webhook/Websocket Tweet Filter Rules
- `POST /oapi/webhook/filter/update` - Update Webhook/Websocket Tweet Filter Rule
- `DELETE /oapi/webhook/filter/delete` - Delete Webhook/Websocket Tweet Filter Rule

### ❌ Stream Endpoint

- `POST /oapi/stream/add` - Add a twitter user to monitor his tweets
- `POST /oapi/stream/remove` - Remove a user from monitor list

### ❌ Deprecated Endpoints

The following endpoints are marked as deprecated in the API documentation and are not implemented:

- Login Endpoint (deprecated)
  - `POST /oapi/login/step1` - Login Step 1: by email or username
  - `POST /oapi/login/step2` - Login Step 2: by 2fa code

- Tweet Action Endpoint (deprecated)
  - `POST /oapi/tweet/upload_image` - Upload Image
  - `POST /oapi/tweet/post` - Post/reply/quote a tweet
  - `POST /oapi/tweet/like` - Like a tweet
  - `POST /oapi/tweet/retweet` - Retweet a tweet

## Implementation Status Summary

- **Fully Supported**: 26 endpoints (9 User endpoints + 2 List endpoints + 1 My endpoint + 5 Communities endpoints + 1 Trend endpoint + 1 Spaces endpoint + 7 Tweet endpoints)
- **Not Implemented**: ~16+ endpoints across multiple categories

## Contributing

Contributions are welcome! If you'd like to add support for additional endpoints, please refer to the existing implementation patterns in the `src/resources/` directory.

## API Documentation

For detailed API documentation, visit: [https://docs.twitterapi.io](https://docs.twitterapi.io)

