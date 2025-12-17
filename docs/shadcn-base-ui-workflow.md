# shadcn + Base UI 워크플로우 (kioskui)

이 프로젝트는 **Radix(@radix-ui/\*) 의존성을 늘리지 않는 방향**으로 가려는 목적이 있어, `shadcn add @shadcn/...`를 그대로 쓰면(예: `@shadcn/dialog`) **Radix 의존성이 추가될 수 있습니다**.

## 현재 상태
- **프로젝트 의존성**: `@base-ui/react` 포함
- **Radix 제거**: 기존 `@radix-ui/react-slot`은 제거했고, `Button`의 `asChild`는 로컬 `Slot` 구현으로 대체했습니다.
- **shadcn 기본 레지스트리(@shadcn)**: 일부 컴포넌트가 Radix를 의존합니다(예: `@shadcn/dialog` → `@radix-ui/react-dialog`).

## 권장 워크플로우 (Radix-free 유지)

### 1) @shadcn에서 추가하기 전에 의존성 먼저 확인하기
새 컴포넌트를 추가하기 전에 `view`로 **dependencies에 `@radix-ui/...`가 있는지** 확인하세요.

```bash
pnpm shadcn view @shadcn/dialog
```

출력의 `"dependencies": ["@radix-ui/react-dialog"]` 같은 항목이 보이면, 그대로 추가하면 Radix 의존성이 프로젝트에 들어옵니다.

### 2) Radix 의존 컴포넌트는 Base UI로 직접 구현(권장)
- `@shadcn/...` 추가 대신, **해당 UI를 Base UI 프리미티브로 구현**해서 `src/components/ui/`에 두는 방식이 가장 단순합니다.
- shadcn 레지스트리 코드는 `pnpm shadcn view ...`로 참고만 하고, **의존성은 프로젝트 정책(Base UI) 기준으로 선택**합니다.

## 다음 단계(원하시면)
- `dialog/dropdown-menu` 같은 인터랙티브 컴포넌트도 **Base UI 기반 구현으로 제작**해서 `src/components/ui/`에 추가
- CI에서 `@radix-ui/` import 혹은 dependency를 차단하는 체크 스크립트 추가


