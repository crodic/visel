import xior from "xior";
import { NextResponse } from "next/server";
import type { NextRequest, ProxyConfig } from "next/server";
import { decodeToken } from "./lib/utils";
import { JWTPayload } from "jose";

const AUTH_ROUTE = ["/auth/login", "/auth/register"];
const PRIVATE_ROUTE = ["/client-profile"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const refreshToken = request.cookies.get("refreshToken")?.value || "";
  const accessToken = request.cookies.get("accessToken")?.value || "";

  //! Method 1: Manually check headers
  // TODO: Ignore requests belonging to server actions
  // TODO: (requests from server actions must validate token explicitly because NextResponse.redirect() does not work with server actions)
  // const isServerAction = request.headers.has('next-action');
  // if (isServerAction) return NextResponse.next();

  console.log(">>> Entered middleware with pathname: ", pathname);

  //? If user is already logged in and accesses an auth route, redirect them
  if (AUTH_ROUTE.includes(pathname) && refreshToken) {
    return NextResponse.redirect(new URL("/client-profile", request.url));
  }

  //? If user is not logged in but accesses private routes
  if (PRIVATE_ROUTE.includes(pathname)) {
    console.log(">>> Private route: ", pathname);

    // TODO: Case 1: Access token expired → refresh immediately (User is active on site but access token has expired)
    if (refreshToken && !accessToken) {
      console.log(">>> Case 1: Access token expired → refreshing immediately");
      return await refreshTokenMiddleware(request);
    }

    // TODO: Case 2: Logout if no refresh token exists (User has been inactive for a long time)
    if (!refreshToken) {
      console.log(">>> Case 2: No refresh token → logging out");
      const msg = encodeURIComponent("Please log in!");
      const response = NextResponse.redirect(
        new URL(`/auth/login?msg=${msg}`, request.url)
      );
      response.cookies.delete("accessToken");
      return response;
    }

    // TODO: Case 3: Refresh access token if it is close to expiring (before entering server components)
    if (accessToken && refreshToken) {
      // TODO: Decode token to get exp (Skip if server already returns exp)
      const payload = decodeToken(accessToken);
      if (payload === null) {
        console.log(">>> Case 3.1: Access token is corrupted → logging out");
        const msg = encodeURIComponent("Phiên đăng nhập hết hạn!");
        const response = NextResponse.redirect(
          new URL(`/auth/login?msg=${msg}`, request.url)
        );
        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        return response;
      }

      const tokenExpiresAt = (payload.exp as number) * 1000;
      const now = Date.now();
      const oneMinuteLater = now + 1 * 60 * 1000;

      // TODO: Check if token is about to expire → refresh
      if (tokenExpiresAt < oneMinuteLater) {
        console.log(">>> Case 3.2: Access token near expiry → refreshing");
        return await refreshTokenMiddleware(request);
      }

      console.log(">>> Case 4: Access token is valid → no refresh needed");
    }
  }

  // If access token missing but refresh token exists → refresh
  if (refreshToken && !accessToken) {
    return await refreshTokenMiddleware(request);
  }

  return NextResponse.next();
}

const refreshTokenMiddleware = async (request: NextRequest) => {
  const refreshToken = request.cookies.get("refreshToken")?.value || "";
  try {
    console.log(">>> Middleware call api refresh token. ");
    const { data } = await xior.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/auth/refresh`,
      {
        refreshToken: refreshToken,
      }
    );
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data;
    console.log(
      ">>> Middleware Refresh token successful. ",
      newAccessToken.slice(-5),
      newRefreshToken.slice(-5)
    );

    const { exp: expAccessToken } = decodeToken(newAccessToken) as JWTPayload;
    const { exp: expRefreshToken } = decodeToken(newRefreshToken) as JWTPayload;

    if (!expAccessToken || !expRefreshToken) {
      return unauthorizedResponse(request);
    }

    const response = NextResponse.next();
    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      path: "/",
      expires: new Date(expAccessToken * 1000),
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    response.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      path: "/",
      expires: new Date(expAccessToken * 1000),
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.log(error);
    return unauthorizedResponse(request);
  }
};

const unauthorizedResponse = (request: NextRequest) => {
  const response = NextResponse.redirect(new URL("/auth/login", request.url));
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  return response;
};

export const config: ProxyConfig = {
  matcher: [
    {
      source:
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      missing: [{ type: "header", key: "next-action" }],
    },
  ],
};
