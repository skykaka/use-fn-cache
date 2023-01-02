/* istanbul ignore file reason: simple code */
import { useMemo } from "react";
import { createFnCache } from "./fnCache";

export function useFnCache() {
    return useMemo(() => createFnCache(), []);
}