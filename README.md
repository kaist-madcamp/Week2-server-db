# Ask Me Kaist 
카이스트에 대해 궁금했던 것을 해결할 수 있는 앱

## Team
> 김찬영, 정이든

# App (client)

### 1. Splash screen

<img src = "https://user-images.githubusercontent.com/80759746/125449070-23ac1f0c-1aac-49a0-ab3b-ac0cd2e4bbe0.jpg" width="300" height="500">

- 앱을 처음 실행하자마자 스플래시 화면으로 앱 이름을 사용자가 볼 수 있도록 구현함

<br />

### 2. Auth validation

| 로그인 화면                                                                                                                                  | 회원가입 화면                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src = "https://user-images.githubusercontent.com/80759746/125449321-6d1022a5-4495-428e-8035-1f2eda7c5055.jpg" width="300" height="500"> | <img src = "https://user-images.githubusercontent.com/80759746/125449318-e899e085-5535-4c1b-ac97-46e94a21e635.jpg" width="300" height="500"> |

| 로그인 에러 1                                                                                                                                | 로그인 에러 2                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src = "https://user-images.githubusercontent.com/80759746/125449295-48253ada-5032-40f1-9981-6868b62215d5.jpg" width="300" height="500"> | <img src = "https://user-images.githubusercontent.com/80759746/125449303-d1f62e12-17d2-4a77-ae6c-d42965861fb4.jpg" width="300" height="500"> |

- 이메일 형식을 갖추고, 6자리 이상의 비밀번호로 회원가입이 가능
- 직접 회원가입을 하지 않아도, 카카오톡 로그인으로 앱을 이용가능
- 카카오톡 auth API로 소셜 로그인 가능

<br />

### 3. Category

| 카테고리 1                                                                                                                                  | 카테고리 2                                                                                                                                  | 로그아웃                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| <img src ="https://user-images.githubusercontent.com/80759746/125449268-99e6dd7a-b47b-403a-b930-32c2064315ee.jpg" width="300" height="500"> | <img src ="https://user-images.githubusercontent.com/80759746/125449193-23a43c42-736e-4d13-8968-da662c5caa3c.jpg" width="300" height="500"> | <img src="https://user-images.githubusercontent.com/80759746/125449081-dcaacca5-238e-467a-a844-bfe1731dd0fe.jpg" width="300" height="500"> |

- 카이스트에 궁금한 것을 카테고리를 선택하여 관련 질문들을 볼 수 있음
- 카테고리는 '미용실, 헬스장, 카페, 음식점, 스터디, 기숙사' 6가지로 만들었음
- 오른쪽 상단 위에 있는 점을 누르면 사용자가 자신의 정보를 확인할 수 있음
- 왼쪽의 뒤로가기 버튼을 누르면 로그아웃을 할 수 있음

<br />

### 4. User profile

<img src ="https://user-images.githubusercontent.com/80759746/125449151-dbbb8de8-4fd5-442e-86d6-1a6a07684a97.jpg" width="300" height="500">

- 사용자는 자신이 좋아요를 누른 게시글의 수, 자신이 작성한 게시글의 수, 댓글의 수를 확인할 수 있음

<br />

### 5. 게시글 목록

| 게시글 목록                                                                                                                                 | 게시글 작성 화면                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src ="https://user-images.githubusercontent.com/80759746/125452054-209b9326-d057-4597-9a2f-40b7093a233f.jpg" width="300" height="500"> | <img src = "https://user-images.githubusercontent.com/80759746/125449163-c46e1472-4cb4-4e96-98e9-21542fbee6a1.jpg" width="300" height="500"> |

- 카테고리 별로 관련된 게시글을 확인할 수 있음
- 오른쪽 하단의 플러스 버튼을 누르면 게시글을 작성할 수 있음

<br />

### 6. 게시글 및 댓글

| 게시글 및 댓글                                                                                                                              | 수정 및 삭제                                                                                                                                | 댓글 작성                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| <img src ="https://user-images.githubusercontent.com/80759746/125449185-52018c01-67c8-4ed3-8657-4a9511d94c55.jpg" width="300" height="500"> | <img src ="https://user-images.githubusercontent.com/80759746/125449175-98c3a582-e7c8-460a-acf2-ebf81aee4764.jpg" width="300" height="500"> | <img src="https://user-images.githubusercontent.com/80759746/125449173-83690e10-d8df-49fa-afeb-ec0f1862ae0a.jpg" width="300" height="500"> |

- 게시글을 선택하면 자세한 내용과 작성자, 좋아요, 댓글을 확인할 수 있음
- 오른쪽 상단의 점을 누르면 자신의 게시글인 경우에만 수정 및 삭제 가능함
- 댓글 모양 아이콘을 선택하면 댓글을 작성할 수 있음
- 좋아요 모양 아이콘을 선택하면 좋아요를 누를 수 있고, 한번 더 누르면 좋아요가 취소됨
- 댓글을 선택하면 자신의 댓글인 경우에만 삭제 가능함

<br />

### 7. 질문 검색

 <img src="https://user-images.githubusercontent.com/80759746/125449134-e9cee36c-ac62-4e08-a42d-fe7749e22eb5.jpg" width="300" height="500">

# Server

## Tech
- Nestjs
- TypeScript
- Express
- Prisma (ORM)

<br />

## DB schema

Mysql database schema

<img width="505" alt="스크린샷 2021-07-14 오후 12 16 01" src="https://user-images.githubusercontent.com/58783348/125555606-d8cc6ba1-ed74-4230-802d-896261ddf4d2.png">

<br />

## REST API

[Auth](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/users/users.controller.ts#L11)

- [x] [Sign up (jwt)](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/users/users.service.ts#L15)
- [x] [Login](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/users/users.service.ts#L50)
- [x] [Kakao Login/Sign up](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/users/users.service.ts#L86)
- [x] [Find user by id](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/users/users.service.ts#L133)
- [x] [Me (나의 닉네임, 댓글수, 게시글수, 좋아요수 조회)](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/users/users.service.ts#L146)

[Category](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/categories/categories.controller.ts#L10)

- [x] [Create category](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/categories/categories.service.ts#L28)
- [x] [See all categories](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/categories/categories.service.ts#L12)

[Post](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/posts/posts.controller.ts#L35)

- [x] [Find Post by id](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/posts/posts.service.ts#L25)
- [x] [Find all posts by category](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/posts/posts.service.ts#L63)
- [x] [Create a post](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/posts/posts.service.ts#L129)
- [x] [Edit a post](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/posts/posts.service.ts#L208)
- [x] [Delete a post](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/posts/posts.service.ts#L170)
- [x] [Check whether post is mine](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/posts/posts.service.ts#L96)
- [x] [Upload a image (form data)](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/posts/posts.controller.ts#L91)
- [x] [See a image](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/posts/posts.controller.ts#L98)
- [x] [Like a post](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/posts/posts.service.ts#L254)

[Comment](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/posts/posts.controller.ts#L86)

- [x] [See Post's comments](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/posts/posts.service.ts#L435)
- [x] [Create a comment](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/posts/posts.service.ts#L318)
- [x] [Edit a comment](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/posts/posts.service.ts#L393)
- [x] [Delete a comment](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/posts/posts.service.ts#L353)

[Search](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/posts/posts.controller.ts#L122)

- [x] [Search post by title](https://github.com/kaist-madcamp/Week2-server-db/blob/master/server/src/posts/posts.service.ts#L471)

