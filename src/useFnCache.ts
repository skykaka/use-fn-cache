import { useMemo } from "react";
import { createFnCache } from "./fnCache";

export function useFnCache() {
    return useMemo(() => createFnCache(), []);
}