import useSWR from "swr";
const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then(response => response.json());

export default function useGet0xTokens(tokens: any[]) {
    const shouldFetch = tokens.length === 0;
    const result = useSWR(shouldFetch ? 'https://api.0x.org/swap/v1/tokens' : null, fetcher);
    const {data,error} = result;
    return {
        error,
        allTokens: data ? data.records : []
    };
}