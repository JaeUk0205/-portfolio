# 포트폴리오 수정 가이드

이 문서는 현재 HTML·CSS·JavaScript 구조에서 내용을 수정할 위치를 안내합니다. 코드를 수정하기 전 별도 브랜치를 만들고, 작은 변경 단위로 저장하는 것을 권장합니다.

## 수정 위치 찾기

편집기에서 `Ctrl+F`로 아래 문자열을 검색하면 관련 위치를 찾을 수 있습니다.

| 수정 대상 | 파일 | 검색할 문자열 |
| --- | --- | --- |
| 브라우저 탭 제목 | `index.html` | `<title>` |
| 첫 화면 이름 | `index.html` | `hero-name` |
| 첫 화면 소개 | `index.html` | `hero-desc` |
| 상세 자기소개 | `index.html` | `about-placeholder` |
| 전화 링크와 표시 문구 | `index.html` | `tel:` |
| Instagram 링크와 표시 문구 | `index.html` | `instagram.com` |
| 하단 표기 | `index.html` | `footer-inner` |
| 프로젝트를 조회할 GitHub 계정 | `script.js` | `GITHUB_ID` |
| 기본 색상 | `style.css` | `:root` |

## 이름과 소개 수정

`index.html`에서 제목, 첫 화면 이름, 소개 문단, 하단 표기를 각각 확인합니다. 이름을 바꾸더라도 기존 태그, `class`, `id`는 유지합니다. `about-placeholder` 안에는 추후 작성 안내 문구도 있으므로 소개를 완성하면 함께 정리합니다.

## 연락처 수정

전화번호는 소개 영역과 연락처 영역에 각각 있습니다. 두 곳 모두 `href="tel:..."`의 연결 대상과 화면에 보이는 문구를 함께 수정합니다.

Instagram도 소개 영역과 연락처 영역의 URL 및 표시 문구를 함께 확인합니다. 공개할 정보는 소유자 의사에 따라 결정합니다.

## GitHub 계정 변경

`script.js` 상단의 값을 변경합니다.

```js
const GITHUB_ID = '변경할_GitHub_아이디';
```

이 값은 저장소 조회와 다음 요소의 링크·표시를 갱신하는 데 사용됩니다.

- `githubProfileLink`
- `githubAllLink`
- `githubContactLink`
- `githubHandle`

JavaScript 실행 전이나 실행 실패 시에도 올바른 정보가 보이도록 `index.html`에 있는 GitHub 링크와 `githubHandle`의 기본 문구도 함께 맞춥니다.

## 색상 변경

`style.css`의 `:root`에서 `--bg`는 기본 배경, `--surface`는 구역·카드 배경, `--accent`는 강조색, `--text`는 본문 색상입니다.

강조색 일부는 별도로 지정되어 있습니다. 전체 강조색을 변경하려면 CSS의 `rgba(0,229,160,...)`, JavaScript의 Canvas 색상과 `langColor()` 기본값도 확인합니다. 언어별 색상은 별도 설정입니다.

## 저장 후 확인

브라우저를 새로고침하여 변경된 문구, 링크 대상, 작은 화면의 줄바꿈을 확인합니다. JavaScript를 변경했다면 개발자 도구 Console에서 새 오류가 발생하지 않았는지도 확인합니다.
