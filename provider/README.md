# Ludium World FrontEnd

**Ludium World FrontEnd**는 Next.js로 구축된 웹 애플리케이션입니다. 다양한 컴포넌트, 함수, 미들웨어를 활용하여 견고하고 확장 가능하며 유지보수가 용이한 애플리케이션을 만듭니다. 이 프로젝트는 현대적인 개발 방식을 따르며, 커스텀 훅, 열거형, 에러 핸들링 등을 포함합니다.

## 목차

- [설치](#설치)
- [환경 변수 설정](#환경-변수-설정)
- [프로젝트 실행](#프로젝트-실행)
- [프로젝트 구조](#프로젝트-구조)
- [사용 가능한 스크립트](#사용-가능한-스크립트)
- [기여 방법](#기여-방법)
- [라이선스](#라이선스)

## 설치

1. **레포지토리 클론:**

   ```bash
   git clone https://github.com/Ludium-Official/ludium-world-front-end.git
   cd ludium-world-front-end/provider
   ```

2. **종속성 설치:**

   `pnpm`을 사용하는 경우:

   ```bash
   pnpm install
   ```

## 환경 변수 설정

프로젝트 루트 디렉터리에 `.env` 파일을 생성하고, `.env.example` 파일을 참고하여 필요한 환경 변수를 설정합니다:

```bash
cp .env.example .env
```

## 프로젝트 실행

로컬에서 프로젝트를 실행하려면:

```bash
pnpm dev
```

이 명령은 개발 서버를 시작하며, 일반적으로 `http://localhost:3000`에서 접근할 수 있습니다.

## 프로젝트 구조

- **`app/`**: 주요 애플리케이션 로직.
- **`components/`**: 재사용 가능한 UI 컴포넌트.
- **`functions/`**: 유틸리티 함수.
- **`hooks/`**: 커스텀 React 훅.
- **`enums/`**: 열거형 정의.
- **`errors/`**: 에러 핸들링 클래스 및 유틸리티.
- **`langs/`**: 다국어 지원 파일.
- **`public/`**: 정적 자산 (이미지, 폰트 등).
- **`middleware.js`**: 미들웨어 설정 파일.
- **`next.config.js`**: Next.js 설정 파일.
- **`package.json`**: 프로젝트 메타데이터 및 스크립트 정의.
- **`pnpm-lock.yaml`**: `pnpm` 패키지 관리 락 파일.

## 사용 가능한 스크립트

다음 명령어를 사용할 수 있습니다:

- **`pnpm dev`**: 개발 모드에서 애플리케이션 실행.
- **`pnpm build`**: 프로덕션 빌드 수행.
- **`pnpm start`**: 프로덕션 모드에서 애플리케이션 시작.
- **`pnpm lint`**: 코드 린트 수행.

## 기여 방법

기여는 언제나 환영합니다! 변경 사항이 있다면 이슈를 생성하거나 풀 리퀘스트를 제출해 주세요.

1. 레포지토리를 포크합니다.
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/YourFeature`).
3. 변경 사항을 커밋합니다 (`git commit -m 'Add some feature'`).
4. 브랜치에 푸시합니다 (`git push origin feature/YourFeature`).
5. 풀 리퀘스트를 엽니다.

## 라이선스

이 프로젝트는 MIT 라이선스에 따라 제공됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.
