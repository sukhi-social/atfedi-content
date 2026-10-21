## What ActivityPub cares about

You can pick a server. Once you pick one, you can still talk with people on other servers. That is as far as ActivityPub promises. It does not promise that a server stays open, that a post always arrives, or that a deleted post disappears everywhere.

[icon:footprints] Basics · [icon:server] Mastodon, Misskey and others · [icon:book-open] Words from the people who made it

### I was lost at first too

I ran away from Twitter and went to Misskey. But I could not tell where to go. I was worried that I could not talk with anyone if I picked a small place, and I could not see how it differed from the social network I had used before.

I am not the only one who came this way. In a 2023 survey of 1,343 people who moved to Mastodon, the top reason was "an alternative to Twitter" (70.9%). Still, people with strong feelings about the changes at Twitter may have been more likely to answer, so it cannot be called a picture of Mastodon as a whole. [Read a summary of the survey](https://medium.com/cuinfoscience/an-exploration-of-the-twitter-to-mastodon-migration-21c15c4336f2)

Then I read what the people who made ActivityPub said, and thought, "huh." And the people who actually build things there are often kind people. Why is that? This page started from that question.

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

There are also codes of conduct. They write down what people should do anyway. Because it is obvious, it is said out loud in advance. The W3C code aims for everyone who takes part to be treated fairly and with respect, and says complaints are taken seriously and get a response. I also heard from people who run communities that it is hard when some people still do not keep to it.

### What the makers said

Evan Prodromou, who made ActivityPub, said this in a 2024 interview.

> "We need to be able to use the power of choice to be able to find the platforms that work for us."

He means we need the power of choice to find platforms that suit us (the translation is mine). He also said this.

> "I don't have to be in charge of the entire social web in order to be in charge of my part of the social web."

He means you can take care of your own part of the social web without being in charge of all of it. [Read the interview](https://vivaldi.com/blog/better-web/evan-prodromou-social-web-foundation-for-a-better-web/)

Christine Lemmer-Webber, in a 2018 post (not in the ActivityPub spec), asked what if we looked at the "depth of our relationships" rather than how many people we connect to. The same post says that users today are not protected enough from spam and harassment. [Read the post](https://dustycloud.org/blog/spritely/)

### Why do there seem to be so many good people?

This is only what I have seen. There is no study of people's character here. These are thoughts that came to me while reading.

- The process does not move unless people cooperate. Changing the spec needs at least two independent implementations, and anyone can submit an extension proposal (a FEP), but it is discussed for at least 60 days.
- There are norms, and dissent stays readable in the same place. The debate over the SocialHub values policy can still be read, objections included.
- There is a stream of people who care about free software. Prodromou says a 2007 FSF meeting led him to want network services that users can run and handle themselves. [Read the oral history](https://git.medlab.host/dhorn/Protocol-oral-history-project/src/branch/main/content/interviews/prodromou-distributed_social_networks.md)
- Things get handed over instead of held alone. The care of activitypub.rocks moved from Christine Lemmer-Webber to a W3C community group, and Mastodon moved to a nonprofit board.

### When you pick a server

I think what differs between servers is less the technology than the people there and their promises. Before you join, read the rules and code of conduct on the server's about page. If it does not suit you, you can move. The steps are in [Moving servers](/basics/moving).

:::cards
- [icon:scale] **W3C Code of Conduct** — A promise that everyone is treated fairly and with respect — [Read](https://www.w3.org/policies/code-of-conduct/)
- [icon:handshake] **Mastodon Server Covenant** — Four things listed servers agree to keep — [Read](https://joinmastodon.org/covenant)
- [icon:file-text] **ActivityPub spec** — The original text of what it does not promise — [Read](https://www.w3.org/TR/activitypub/)
- [icon:map] **joinfediverse.kr** — For choosing a new home — [Look around](https://joinfediverse.kr)
- [icon:arrow-right] **Moving servers** — When you move to another server — [Read](/basics/moving)
:::
