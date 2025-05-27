import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-2xl font-bold">Welcome to Eclipse</h1>
      <Link href="/today" className="px-4 py-2 bg-blue-500 text-white rounded">
        오늘의 질문 보러가기
      </Link>
      <Link href="/history" className="px-4 py-2 bg-gray-500 text-white rounded">
        지난 답변 보기
      </Link>
    </div>
  );
};

export default Home;
