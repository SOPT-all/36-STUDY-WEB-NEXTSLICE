# 36-STUDY-WEB-NEXTSLICE
36기 웹 NEXT.js 스터디

<br/>

## 🗣 발표 및 PR 규칙

- 매주 `발표자(1~2명)`가 해당 주차 내용을 발표 + 실습 준비
  - 실습 코드는 미리 clone 받을 수 있도록 PR에 포함
- 모든 스터디원은 **아티클을 작성하고 PR**로 제출

---


### 브랜치 규칙

스터디 제출 시 아래와 같은 형식으로 브랜치를 생성하고, `main` 브랜치로 PR(Pull Request)을 보내주세요.

- 브랜치명: `주차/이름/주제`  
  예시:  
  - `week1/donghee/caching`  
  - `week3/kyoungho/server-component`  
  - `week5/inyoung/optimization`

#### ✅ 규칙 요약
- `주차`: `week1`, `week2`, `week3` … 등으로 작성
- `이름`: 본인의 이름 혹은 닉네임
- `주제`: 해당 발표나 학습 키워드 (간단 명료하게)

#### 📝 Pull Request 작성 시
- 제목 예시: `[Week1] 성하 - Routing (Page Router)`
  - 제목에서 주제는 아래 표에 있는 주제(tag)를 그대로 사용한다.
- 설명: 어떤 내용을 다뤘는지 간단히 작성해주세요
- 파일은 본인 디렉토리 아래에 정리 (예: `/Sungha/week1/app-router.md`)
---

### 폴더 구조

- **`docs/`**  
  각 스터디 멤버가 한 주간 공부한 내용이나 관련 아티클을 `.md` 파일 형식으로 업로드하는 폴더입니다. 이 폴더에는 스터디가 진행되는 동안 매주 멤버들이 작성한 문서들이 포함됩니다.
 
  본인 이름 폴더 하위에 weekn 폴더를 만들고, 주제.md 파일을 만들어주세요.
  ex) `/JinHyeok/week2/app-router.md`

- **`practice/`**  
  각 주차 별 실습을 준비한 사람이 해당 실습에 필요한 코드를 작성하는 곳입니다. 실습 코드와 관련된 자료들은 이 폴더에 저장되며, 실제로 실습을 통해 학습한 내용을 실습 코드 형태로 확인할 수 있습니다.
  - `week1/jinhyeok/sample`와 같이 발표자가 실습용 sample 브랜치를 만들어주세요.
  - practice 폴더 하위에 weekn 폴더를 만들고, 실습 파일을 생성해주세요. ex) `practice/week1/sample1(프로젝트)`

  
### 파일명 규칙

- 파일명은 `소문자(kebab-case)`를 사용합니다.  
  예시: `app-router.md`, `server-component.md`

---


| 날짜       | Week   | Tags         | Keyword                                                                                      | 발표자          |
|----------------|--------|--------------|----------------------------------------------------------------------------------------------|-----------------|
| 4월 29일 | Week0  | 킥오프        | 스터디 운영 방식 논의, 목표 설정 | -          |
| 5월 6일 | Week1  | NextJS란?        | NextJS 등장 배경, NextJS를 왜 쓸까?, NextJS vs React만 사용, 프로젝트 초기세팅 | 정희연          |
| 5월 13일 | Week2  | Routing (Page Router)        | Page Router, Page Router vs App Router | 권동희, 조성하          |
| 5월 20일 | Week3  | Routing (App Router)        | 라우팅 정의, Linking과 Navigating, Layout, 동적 라우팅(Dynamic Routing), 데이터 패칭 (Data Fetching) | 이윤지, 이진혁          |
| 5월 27일 | Week4  | Data Fetching        | 데이터 캐싱(Caching), 데이터 패칭(Fetching), Server Actions | 김정은, 박소이          |
| 6월 3일 | Week5  | Rendering        | 서버 컴포넌트, 클라이언트 컴포넌트 | 곽지욱, 정희연          |
| 6월 10일 | Week6  | Optimizing        | 이미지 최적화, Metadata, Fonts, 정적 Asset(Static Assets) | 황인영          |
| 6월 17일 | Week7  | Caching        | 캐싱(Caching) | 엄경호          |
