import { jwtDecode, type JwtPayload } from "jwt-decode";
import { type NextRequest, NextResponse } from "next/server";
import { API_CONFIG } from "@/config/api-config";

const COOKIE_NAME = API_CONFIG.cookieName;
const LOGIN_PATH = "/sign-in";
const DASHBOARD_PATH = "/dashboard";

const publicPatterns = [
  /^\/sign-in$/,
  /^\/sign-up$/,
  /^\/auth(\/.*)?$/,
  /^\/_next(\/.*)?$/,
  /^\/api(\/.*)?$/,
  /^\/favicon\.ico$/,
  /^\/robots\.txt$/,
  /^\/sitemap\.xml$/,
  /^\/manifest\.json$/,
];

function isPublicRoute(pathname: string): boolean {
  return publicPatterns.some((pattern) => pattern.test(pathname));
}

function decodeToken(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}

function isExpired(payload: JwtPayload): boolean {
  const now = Math.floor(Date.now() / 1000);
  return !payload.exp || payload.exp <= now;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (isPublicRoute(pathname)) {
    if (token && pathname.startsWith("/sign-in")) {
      const payload = decodeToken(token);
      if (payload && !isExpired(payload)) {
        return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url));
      }
    }
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const payload = decodeToken(token);

  if (!payload || isExpired(payload)) {
    const response = NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|eot)$).*)",
  ],
};
