## ActivityPub이 소중히 여기는 것

서버는 골라도 돼요. 골라도 다른 서버에 있는 사람과 이야기할 수 있어요. ActivityPub이 약속하는 건 거기까지예요. 서버가 늘 열려 있는지, 글이 반드시 닿는지, 지운 글이 모든 곳에서 지워지는지는 약속하지 않아요.

[icon:footprints] 기본기 · [icon:server] 마스토돈, Misskey 등 · [icon:book-open] 만든 사람들의 말

### 저도 처음에는 헤맸어요

저는 트위터에서 도망쳐 나와 Misskey로 갔어요. 그런데 어디를 고르면 좋을지 알 수 없었어요. 사람이 적은 곳을 골라도 이야기할 수 있을지 불안했고, 원래 쓰던 SNS와 무엇이 다른지도 잘 몰랐어요.

같은 길로 온 사람은 적지 않은 것 같아요. 2023년에 마스토돈으로 온 사람 1,343명에게 물은 조사에서, 온 이유 1위는 "트위터의 대안"이었어요(70.9%). 다만 트위터의 변화에 생각이 강했던 사람이 많이 답했을 수 있어서, 마스토돈 전체의 모습이라고는 말할 수 없어요. [조사 요약 읽기](https://medium.com/cuinfoscience/an-exploration-of-the-twitter-to-mastodon-migration-21c15c4336f2)

그러다 ActivityPub을 만든 사람들의 말을 읽고 "오" 하고 생각했어요. 그리고 실제로 개발하는 분들 중에는 인품이 좋은 분을 자주 만났어요. 왜일까요? 이 글은 거기서 시작했어요.

### 약속하는 것, 약속하지 않는 것

W3C가 정리한 소셜 웹 프로토콜 문서에는, 사용자가 "여러 서버"에 데이터를 두고, 다른 곳에서 운영되는 앱도 쓸 수 있다고 적혀 있어요. 서버를 고를 수 있고, 서버가 달라도 이야기할 수 있다는 건 설계의 목적이에요.

ActivityPub 명세에는 약속하지 않는 것도 적혀 있어요.

- [icon:plug-zap] 상대 서버가 계속 열려 있다는 보장: 네트워크의 상대가 계속 닿을 수 있다는 보장은 없다고 적혀 있어요.
- [icon:send] 보낸 글이 반드시 닿는다는 보장: 전송에 실패하면 다시 보내는 것은 "권장"에 그쳐요.
- [icon:trash-2] 지운 글이 다른 서버에서도 지워진다는 보장: 다른 서버에 있는 글의 삭제를 강제할 수 있는 장치는 프로토콜에 없다고 적혀 있어요.
- [icon:at-sign] 서버를 떠나도 주소가 그대로라는 보장: 계정의 ID는 처음 만든 서버에 속한 주소예요. 서버를 옮길 때는 "옮겼어요"라고 알려서 팔로워가 따라와요. 자세한 순서는 [서버 이사](/basics/moving)에 있어요.

### 서버가 대신 약속하는 것

그래서 서버마다 따로 약속을 해요. joinmastodon.org의 서버 선택 화면에 실린 마스토돈 서버는 네 가지를 약속해요.

- [icon:shield-check] 인종차별, 성차별, 동성애 혐오, 트랜스젠더 혐오에 맞서는 적극적인 운영
- [icon:database-backup] 매일 백업
- [icon:key-round] 비상시에 서버에 들어갈 수 있는 사람이 운영자 말고 한 명 더 있기
- [icon:calendar-clock] 닫기 최소 3개월 전에 알리기

행동 규범도 있어요. 규범에는 사람으로서 당연한 일이 적혀 있어요. 당연한 일이라서, 미리 말로 해 두는 거예요. W3C의 행동 규범은 모두가 공평하고 존중받는 것을 목표로 하고, 고충은 진지하게 다루어져서 답을 받는다고 적혀 있어요. 운영하는 분들에게는, 그래도 지켜지지 않는 일이 생겨서 힘들다는 이야기를 들었어요.

### 만든 사람들은 이렇게 말했어요

ActivityPub을 만든 Evan Prodromou는 2024년 인터뷰에서 이렇게 말했어요.

> "We need to be able to use the power of choice to be able to find the platforms that work for us."

우리에게 맞는 플랫폼을 찾으려면 선택의 힘이 필요하다는 말이에요(번역은 제가 했어요). 또 이런 말도 했어요.

> "I don't have to be in charge of the entire social web in order to be in charge of my part of the social web."

소셜 웹 전체를 맡지 않아도, 제 몫의 소셜 웹은 제가 맡을 수 있다는 뜻이에요. [인터뷰 읽기](https://vivaldi.com/blog/better-web/evan-prodromou-social-web-foundation-for-a-better-web/)

Christine Lemmer-Webber는 ActivityPub 명세가 아니라 2018년에 쓴 글에서, 몇 명과 이어졌는지보다 "관계의 깊이"에 눈을 돌리면 어떨까 하고 물었어요. 같은 글에서 지금의 연합우주는 스팸과 괴롭힘으로부터 사용자를 충분히 지키지 못하고 있다고도 썼어요. [글 읽기](https://dustycloud.org/blog/spritely/)

### 왜 좋은 분이 많아 보일까요

제가 본 범위의 이야기예요. 인품을 조사한 자료는 없고, 읽으면서 떠오른 생각이에요.

- 협력하지 않으면 진행되지 않는 절차예요. 명세를 고치려면 서로 독립된 구현이 두 개 이상 있어야 하고, 확장 제안(FEP)은 누구나 낼 수 있지만 최소 60일 동안 논의해요.
- 규범이 있고, 반대 의견도 같은 곳에 남아요. SocialHub의 가치관 정책 논의에는 반대 의견이 지금도 읽을 수 있게 남아 있어요.
- 자유 소프트웨어를 소중히 하는 사람들이 모여 온 흐름이 있어요. Prodromou는 2007년 FSF 모임이 계기가 되어, 사용자가 직접 운영하고 다룰 수 있는 네트워크 서비스를 만들고 싶어졌다고 말했어요. [구술사 읽기](https://git.medlab.host/dhorn/Protocol-oral-history-project/src/branch/main/content/interviews/prodromou-distributed_social_networks.md)
- 혼자 떠안지 않고 넘겨요. activitypub.rocks의 관리는 Christine Lemmer-Webber에서 W3C의 공동체 그룹으로 넘어갔고, 마스토돈은 비영리 이사회 체제로 옮겨 갔어요.

### 서버를 고를 때

저는 서버마다 다른 건 기술보다 그곳에 있는 사람과 약속이라고 생각해요. 들어가기 전에 서버 소개 페이지의 규칙과 행동 규범을 읽어 보세요. 맞지 않으면 옮길 수 있어요. [서버 이사](/basics/moving)에 순서가 있어요.

:::cards
- [icon:scale] **W3C 행동 규범** — 모두가 공평하고 존중받기 위한 약속 — [읽기](https://www.w3.org/policies/code-of-conduct/)
- [icon:handshake] **마스토돈 서버 약속** — 실린 서버가 지키기로 한 네 가지 — [읽기](https://joinmastodon.org/covenant)
- [icon:file-text] **ActivityPub 명세** — 약속하지 않는 것의 원문 — [읽기](https://www.w3.org/TR/activitypub/)
- [icon:map] **joinfediverse.kr** — 새로 살 동네를 고를 때 — [둘러보기](https://joinfediverse.kr)
- [icon:arrow-right] **서버 이사** — 다른 서버로 옮길 때 — [읽기](/basics/moving)
:::
