## When you can't see someone or a post from another server

Your server only shows people and posts it already knows about. Paste the address (URL) of their profile or post into your own server's search box, and your server will fetch it and show it to you.

[icon:footprints] Basics · [icon:server] Mastodon, Misskey, and more · [icon:search] You can try this now

### Paste the address into search

If you open someone's profile or post on another server in your browser, that server sees you as a visitor who isn't logged in. From there you can't follow or reply.

1. Copy the address (URL) from the browser's address bar. A profile address works, and so does the address of a single post.
2. Log in to your own server (or app) and paste it into the search box.
3. Open the result, then follow or reply.

This is the method Mastodon's guide describes. Search is for logged-in users only.

### When a post or reply doesn't show up right away

Your server shows only the posts it knows about. That's why this happens:

- [icon:clock] Fetching replies can take a while. Try again after a moment. Refreshing over and over won't make it fetch again for some time.
- [icon:lock] Followers-only posts, private mentions, and posts from servers that require authorization aren't fetched. If someone on your server already follows the author, you may still see them.
- [icon:settings] Fetching replies has to be turned on by your server's admins.

This is how Mastodon works. Misskey varies by server and version, so if something is missing there, asking your admins is the quickest way.

### What shows up in your timelines

Timelines show posts your server knows about. Mostly, those are posts from accounts that people on your server follow.

- On Mastodon, choose "Other servers" in Live feeds to see the public posts your server knows about. You can also filter down to posts from your own server.
- Misskey has four timelines: Home, Local, Social, and Global. Home is people you follow, Local is people on your server, Social is both, and Global is public posts from the servers yours is federated with. Servers can turn some of them off.

If you follow only a few people, your timeline will be quiet. Nothing is broken. Following people and hashtags you like will fill it.

### You can't search every post at once

There's no place that searches the whole fediverse. Mastodon has no single shared list that everyone sees, so you can't browse all public posts. Full-text search only works if your server's admins have set it up, and it covers only your own posts, favourites, bookmarks, and posts that mention you.

If there's a topic you want to follow, try opening its hashtag.

### Questions

How search and fetching work depends on your server's settings. Asking your server's admins is the quickest way. If you're not sure who to ask, use the contact at the bottom of atfedi.de. Small things are fine.

:::cards
- [icon:book-open] **Mastodon's own guide** — finding people and posts on other servers — [Read the guide](https://docs.joinmastodon.org/user/network/)
- [icon:book-open] **Misskey Hub** — the kinds of timelines — [Read the guide](https://misskey-hub.net/en/docs/for-users/features/timeline/)
- [icon:arrow-right] **The fediverse and ActivityPub** — how servers connect — [Read](/basics/activitypub)
:::
