## What is ActivityPub?

ActivityPub is an agreement that lets people on different servers talk to each other. Mastodon, Misskey and others follow it, so you can follow people and reply across servers. It does not promise that a server stays open, that a post always arrives, or that a deleted post disappears everywhere.

[icon:footprints] Basics · [icon:server] Mastodon, Misskey and others · [icon:book-open] Promises and limits

### In one line

Most social networks run on one company's servers. In the fediverse there are many servers, and each one passes posts to the others using the same agreement. That agreement is called ActivityPub.

That is why you can pick a server. Whichever one you sign up on, you can still talk with people on other servers.

### How do they talk?

Your account lives on a server. The spec says an account has a place where it sends posts (an outbox) and a place where it receives them (an inbox). When you post, your server sends the post to the inboxes on the servers where your followers are. Replies and likes come back the same way.

An account address looks like `@name@server`. The server name is in it because the account belongs to that server.

### What it promises, and what it does not

The Social Web Protocols document from the W3C says users can keep their data on "any number of" servers and use apps hosted elsewhere. Being able to choose a server, and to talk across servers, is the goal of the design.

The ActivityPub spec also says what it does not promise.

- [icon:plug-zap] That the other server stays open: it says there is no guarantee that actors on the network will remain reachable.
- [icon:send] That a post you send always arrives: retrying after a failed delivery is only "recommended".
- [icon:trash-2] That a deleted post is deleted on other servers: it says nothing in the protocol can enforce deleting a post that sits on another server.
- [icon:at-sign] That your address stays the same when you leave a server: an account's ID is an address that belongs to the server where it was made. When you move, you announce "I moved" and your followers follow. The steps are in [Moving servers](/basics/moving).

### What servers promise instead

So each server makes its own promises. Mastodon servers listed on the server picker at joinmastodon.org promise four things.

- [icon:shield-check] Active moderation against racism, sexism, homophobia and transphobia
- [icon:database-backup] Daily backups
- [icon:key-round] One more person besides the admin who can get into the server in an emergency
- [icon:calendar-clock] At least three months' notice before closing

Rules and codes of conduct differ from server to server too. You can read them on the server's about page.

### Who made it, and who keeps it going?

ActivityPub was settled at the W3C, the web standards body, and became a recommendation in 2018. Today a W3C working group (the Social Web Working Group) maintains it. Changing the spec needs at least two independent implementations, and anyone can submit an extension proposal (a FEP).

### If you are new

You do not need to think too long about which server to pick. Read the rules on its about page, and if it does not suit you, you can move. The steps are in [Moving servers](/basics/moving).

:::cards
- [icon:file-text] **ActivityPub spec** — The original text of what it promises and does not — [Read](https://www.w3.org/TR/activitypub/)
- [icon:book-open] **Social Web Protocols** — A document on what kind of web the agreement is for — [Read](https://www.w3.org/TR/social-web-protocols/)
- [icon:handshake] **Mastodon Server Covenant** — Four things listed servers agree to keep — [Read](https://joinmastodon.org/covenant)
- [icon:map] **joinfediverse.kr** — For choosing a new home — [Look around](https://joinfediverse.kr)
- [icon:arrow-right] **Moving servers** — When you move to another server — [Read](/basics/moving)
:::
