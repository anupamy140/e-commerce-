import { NextRequest, NextResponse } from "next/server";
export const middleware = async (request: NextRequest) => {
  const res = NextResponse.next();
  return res;
};
