import 'redis';

type cacheProps = {
  key: string
}

declare module 'mongoose' {
  interface Query<T> {
    cache: (props?: cacheProps) => Query<T>
  }
}

declare module 'redis' {
  interface RedisClient {
    hgetPromise: (key: string, field: string) => Promise<string>
  }
}
