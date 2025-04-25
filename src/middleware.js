import { NextResponse } from "next/server";

export function middleware(request) {
  // 현재 URL 경로 가져오기
  const { pathname } = request.nextUrl;

  // 쿠키에서 인증 토큰 확인
  const authToken = request.cookies.get("accessToken")?.value;

  // 인증 상태 확인
  const isAuthenticated = !!authToken;

  // 인증 관련 경로 확인
  const authPaths = ["/login", "/signup"];
  const isAuthRoute = authPaths.some((path) => pathname === path);

  // 보호된 경로 목록 관리 (실제 URL 기준)
  const protectedRoutes = ["/blogs", "/profile"];
  // 경로와 모든 하위 경로 포함
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  console.log("isProtectedRoute", isProtectedRoute);

  // 로그인한 사용자가 인증 경로에 접근하는 경우
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/blogs", request.url));
  }

  // 로그인하지 않은 사용자가 보호된 경로에 접근하는 경우
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 그 외의 경우는 정상적으로 진행
  return NextResponse.next();
}

// 미들웨어가 적용될 경로 패턴 지정
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
