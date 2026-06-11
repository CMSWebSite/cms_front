# cms_front — CMS 연구실 웹사이트 프런트엔드

연구실 웹사이트의 **화면(UI)** 프로젝트입니다. 방문자에게 보이는 홈·연구·논문·갤러리 페이지와
로그인, 그리고 관리자 대시보드 화면을 담당합니다.

- **기술 스택**: React 19 · Vite · React Router 7 · Tailwind CSS
- **짝 프로젝트**: 데이터(API)는 [`cms_back`](../cms_back) 가 담당합니다. 둘을 함께 띄워야 사이트가 동작합니다.

> 처음이라면 아래 **사전 준비 → 빠른 시작** 순서대로 그대로 따라 하면 됩니다.
> 명령은 Windows **PowerShell** 기준이며, 프로젝트 폴더(`cms_front`) 안에서 실행합니다.

---

## 1. 사전 준비 (한 번만)

| 필요한 것 | 용도 | 설치 | 설치 확인 명령 |
|---|---|---|---|
| **Node.js 20.19+ (LTS 22 권장)** | 프런트 실행/빌드 | [nodejs.org](https://nodejs.org/) 에서 **LTS** 버전 | `node -v`, `npm -v` |
| **Git** | 소스 내려받기 | [git-scm.com](https://git-scm.com/) | `git --version` |

설치 확인 (PowerShell에 그대로 입력):
```powershell
node -v
npm -v
```
`v22...`(또는 v20.19 이상)이 보이면 준비 완료입니다.

> `npm` 은 Node.js 설치 시 함께 깔립니다. 따로 설치하지 않습니다.

---

## 2. 빠른 시작 (3단계)

### 1단계 — 의존성 설치 (최초 1회, 또는 패키지 변경 시)

```powershell
npm install
```
`node_modules` 폴더가 생기며 1~2분 걸립니다.

### 2단계 — 개발 서버 실행

```powershell
npm run dev
```
콘솔에 주소가 뜨면 성공입니다. 보통 **http://localhost:5173** 입니다. 브라우저에서 열어보세요.

- 코드를 수정하면 **새로고침 없이 화면이 자동 갱신**됩니다(HMR).
- 종료: 터미널에서 `Ctrl + C`.

> ⚠️ 로그인·데이터 조회 같은 기능은 백엔드가 함께 떠 있어야 동작합니다. 아래 3번 참고.

---

## 3. 백엔드와 함께 띄우기 (사이트 전체 동작)

이 프런트는 `/api`·`/uploads` 요청을 **자동으로 백엔드(http://localhost:8080)로 넘깁니다**(개발 프록시,
`vite.config.js`). 따라서 데이터가 필요한 화면을 보려면 백엔드도 실행해야 합니다. **터미널 2개**를 씁니다.

1. (터미널 A) [`cms_back`](../cms_back) → `./gradlew bootRun` 로 백엔드 실행 (8080)
2. (터미널 B) 여기 `cms_front` → `npm run dev` 로 프런트 실행 (5173)
3. 브라우저에서 **http://localhost:5173** 접속

> 백엔드를 먼저 켜는 것을 권장합니다. 백엔드가 꺼져 있으면 화면은 뜨지만 데이터 호출이 실패합니다.

---

## 4. 자주 쓰는 명령

```powershell
npm run dev        # 개발 서버 (실시간 미리보기)
npm run build      # 운영용 정적 파일 빌드 → dist/
npm run preview    # 빌드 결과(dist)를 로컬에서 미리보기
npm run lint       # 코드 점검(ESLint)
```

---

## 5. 백엔드 주소를 바꿔야 할 때 (선택)

평소에는 설정이 필요 없습니다(프록시가 알아서 처리). 프런트를 **다른 도메인의 백엔드**에 연결할 때만
환경변수를 씁니다. 저장소의 `.env.example` 참고:

```
# .env.local (커밋하지 않음) — 비워두면 동일 출처로 호출
VITE_API_BASE_URL=https://api.example.com
```

---

## 6. 문제 해결

| 증상 | 원인 / 해결 |
|---|---|
| `npm : 명령을 찾을 수 없음` | Node.js 미설치. 1번 항목으로 설치 후 터미널 새로 열기. |
| 화면은 뜨는데 로그인/목록이 안 됨 | 백엔드(8080)가 안 떠 있음. 3번대로 `cms_back` 실행. |
| `Port 5173 is in use` | 다른 dev 서버가 점유 중. 기존 종료 후 재시도(또는 안내된 다른 포트로 접속). |
| `npm install` 오류가 반복됨 | `node_modules` 폴더와 `package-lock.json` 삭제 후 `npm install` 재시도. |
| Node 버전 경고 | `node -v` 가 20.19 미만이면 LTS로 업그레이드. |

---

## 7. 더 보기

- 백엔드 실행 방법: [`cms_back/README.md`](../cms_back/README.md)
- 배포 / 운영 절차: 저장소 루트 `deploy/AWS_DEPLOY.md`
