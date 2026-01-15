import { getCurrentTime } from '../../lib/server-time';

export default async function ServerInfo() {
  const time = getCurrentTime();
  return <p>서버 시간: {time}</p>;
}