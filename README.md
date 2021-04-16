# Snippet Bank

- 간편하게 코드 조각을 저장하고 공유할 수 있는 블로그 형태의 웹 사이트입니다.
- 다크모드를 지원합니다.

Look Storybook [here](https://604fd3dc2409ed002109132e-iekvthwaui.chromatic.com/?path=/story/common-anchor--default)

## Tech Stack

Client

- React.js
- Next.js
- Redux-toolkit
- Emotion
- Storybook

Server

- Node.js
- Express.js
- Mysql
- Typeorm
- Passport.js
- Jsonwebtoken

## Pages

- state관리로 redux-toolkit을 이용하였습니다.

### landing

- 로그인과 회원가입을 유도하는 랜딩페이지 입니다.

### login

- formik을 사용한 로그인 페이지입니다.

### register

- formik을 사용한 회원가입 페이지입니다.

### main

- 작성된 snippet 포스트들을 볼 수 있는 메인 페이지입니다.
- 개별 포스트는 react-markdown을 이용해 렌더링됩니다.

### post

- 한 개의 포스트 글을 볼 수 있는 페이지입니다.
- react-markdown을 이용해 렌더링됩니다.

### new

- 포스트 글을 작성하는 페이지입니다.
- react-codemirror2를 이용하여 보기 쉬운 마크다운 편집 기능을 제공하며 작성되는 마크다운을 react-markdown을 이용해 실시간으로 프리뷰화면을 보여줍니다.

### manage

- 자신이 작성한 페이지들을 편집, 삭제하는 등의 관리를 도와주는 페이지입니다.

### edit

- 이미 작성된 포스트 글을 편집하는 페이지입니다.

## environments 설정

server/.env

```sh
PORT=
TOKEN_ISSUER=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_NAME=
```
