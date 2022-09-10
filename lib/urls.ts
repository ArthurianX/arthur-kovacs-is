export async function getRealURl(
    id: string | string[] | undefined,
): Promise<string> {
    return new Promise((resolve) => {
        resolve('https://docs.upstash.com/redis/overall/pricing');
    });
}
