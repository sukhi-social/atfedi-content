## ActivityPubが大事にしていること

サーバーは選んで大丈夫です。選んでも、ほかのサーバーにいる人と話せます。ActivityPubが約束するのは、そこまでです。サーバーがいつも開いているか、書いたものが必ず届くか、消したものがすべての場所で消えるかは、約束していません。

[icon:footprints] 基本 · [icon:server] Mastodon、Misskeyなど · [icon:book-open] 作った人たちの言葉

### わたしも最初は迷いました

わたしはTwitterから逃げてきて、Misskeyに行きました。でも、どこを選べばいいのかわかりませんでした。人が少ない場所を選んでも話せるのか不安でしたし、もともと使っていたSNSと何が違うのかも、よくわかりませんでした。

同じ道で来た人は、少なくないようです。2023年にMastodonへ来た1,343人に聞いた調査で、来た理由の1位は「Twitterの代わり」でした(70.9%)。ただ、Twitterの変化に思いの強かった人が多く答えた可能性があるので、Mastodon全体の姿とは言えません。[調査の要約を読む](https://medium.com/cuinfoscience/an-exploration-of-the-twitter-to-mastodon-migration-21c15c4336f2)

そのうち、ActivityPubを作った人たちの言葉を読んで「へー」と思いました。そして、実際に開発している方々には、人柄のいい人によく会います。どうしてでしょう? この文章は、そこから始まりました。

### 約束すること、約束しないこと

W3Cがまとめたソーシャルウェブのプロトコルの文書には、利用者が「複数のサーバー」にデータを置け、ほかの場所で動くアプリも使えると書かれています。サーバーを選べること、サーバーが違っても話せることは、設計の目的です。

ActivityPubの仕様には、約束しないことも書かれています。

- [icon:plug-zap] 相手のサーバーがずっと開いている保証: ネットワーク上の相手がずっと届くままである保証はない、と書かれています。
- [icon:send] 送った投稿が必ず届く保証: 送信に失敗したときの再送は「推奨」にとどまります。
- [icon:trash-2] 消した投稿がほかのサーバーでも消える保証: 別のサーバーにある投稿の削除を強制できる仕組みは、プロトコルにないと書かれています。
- [icon:at-sign] サーバーを離れてもアドレスが変わらない保証: アカウントのIDは、最初に作ったサーバーに属するアドレスです。サーバーを移るときは「引っ越しました」と知らせて、フォロワーについてきてもらいます。くわしい手順は[サーバーの引っ越し](/basics/moving)にあります。

### サーバーが代わりに約束すること

だから、サーバーごとに別々の約束をします。joinmastodon.orgのサーバー選択に載るMastodonのサーバーは、四つを約束します。

- [icon:shield-check] 人種差別、性差別、同性愛嫌悪、トランスジェンダー嫌悪に対する、積極的な運営
- [icon:database-backup] 毎日のバックアップ
- [icon:key-round] 緊急時にサーバーへ入れる人が、運営者のほかにもう一人いること
- [icon:calendar-clock] 閉じる3か月以上前の告知

行動規範もあります。規範には、人として当たり前のことが書かれています。当たり前だからこそ、先に言葉にしておくのです。W3Cの行動規範は、参加する全員が公平に、敬意をもって扱われることを目指し、苦情は真剣に扱われて返事がある、と書いています。運営する方々からは、それでも守られないことがあってつらい、という話を聞きました。

### 作った人たちは、こう言っていました

ActivityPubを作ったEvan Prodromouは、2024年のインタビューでこう話しました。

> "We need to be able to use the power of choice to be able to find the platforms that work for us."

自分たちに合うプラットフォームを見つけるには、選ぶ力が必要だ、という意味です(訳はわたしです)。こうも話しています。

> "I don't have to be in charge of the entire social web in order to be in charge of my part of the social web."

ソーシャルウェブ全体を担わなくても、自分の分のソーシャルウェブは自分で担える、という意味です。[インタビューを読む](https://vivaldi.com/blog/better-web/evan-prodromou-social-web-foundation-for-a-better-web/)

Christine Lemmer-Webberは、ActivityPubの仕様ではなく2018年の文章で、何人とつながるかより「関係の深さ」に目を向けたらどうだろう、と問いかけました。同じ文章に、いまの連合は、スパムや嫌がらせから利用者を十分に守れていない、とも書いています。[文章を読む](https://dustycloud.org/blog/spritely/)

### どうして、いい人が多く見えるのでしょう

わたしが見た範囲の話です。人柄を調べた資料はなく、読みながら浮かんだ考えです。

- 協力しないと進まない手続きです。仕様を直すには、独立した実装が二つ以上必要で、拡張の提案(FEP)は誰でも出せますが、最低60日は議論します。
- 規範があり、反対意見も同じ場所に残ります。SocialHubの価値観ポリシーの議論には、反対の意見がいまも読める形で残っています。
- 自由なソフトウェアを大切にする人たちが集まってきた流れがあります。Prodromouは、2007年のFSFの集まりがきっかけで、利用者が自分で運営し、扱えるネットワークサービスを作りたくなった、と話しています。[オーラルヒストリーを読む](https://git.medlab.host/dhorn/Protocol-oral-history-project/src/branch/main/content/interviews/prodromou-distributed_social_networks.md)
- ひとりで抱えず、手渡します。activitypub.rocksの管理は、Christine Lemmer-Webberから、W3Cのコミュニティグループへ移りました。Mastodonは、非営利の理事会による運営へ移りました。

### サーバーを選ぶとき

サーバーごとに違うのは、技術よりも、そこにいる人と約束だと、わたしは思います。入る前に、サーバー紹介ページのルールと行動規範を読んでみてください。合わなければ、移れます。手順は[サーバーの引っ越し](/basics/moving)にあります。

:::cards
- [icon:scale] **W3Cの行動規範** — 全員が公平に、敬意をもって扱われるための約束 — [読む](https://www.w3.org/policies/code-of-conduct/)
- [icon:handshake] **Mastodonのサーバーの約束** — 載るサーバーが守ると決めた四つ — [読む](https://joinmastodon.org/covenant)
- [icon:file-text] **ActivityPubの仕様** — 約束しないことの原文 — [読む](https://www.w3.org/TR/activitypub/)
- [icon:map] **joinfediverse.kr** — 新しい住まいを選ぶとき — [のぞく](https://joinfediverse.kr)
- [icon:arrow-right] **サーバーの引っ越し** — 別のサーバーへ移るとき — [読む](/basics/moving)
:::
