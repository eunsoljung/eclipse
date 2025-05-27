import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Questions {
  [date: string]: string;
}

const STORAGE_PREFIX = 'answer-';
const DAYS_TO_UNLOCK = 7;

const TodayPage = () => {
  const router = useRouter();
  const [question, setQuestion] = useState<string | null>(null);
  const [answer, setAnswer] = useState('');
  const [locked, setLocked] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const today = new Date();
  const queryDate = typeof router.query.date === 'string' ? router.query.date : null;
  const targetDate = queryDate ? new Date(queryDate) : today;
  const targetKey = targetDate.toISOString().split('T')[0];

  useEffect(() => {
    fetch('/questions.json')
      .then((res) => res.json())
      .then((data: Questions) => {
        const q = data[targetKey];
        setQuestion(q || null);
      });

    const saved = localStorage.getItem(STORAGE_PREFIX + targetKey);
    if (saved) {
      setLocked(true);
    }

    if (queryDate) {
      const diff = (today.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24);
      if (diff < DAYS_TO_UNLOCK) {
        setUnavailable(true);
      }
    }
  }, [targetKey, queryDate, today, targetDate]);

  const handleSave = async () => {
    localStorage.setItem(STORAGE_PREFIX + targetKey, answer);
    try {
      await fetch('/api/answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: targetKey, answer }),
      });
    } catch (e) {
      // ignore error
    }
    setLocked(true);
  };

  if (locked) {
    return <p className="p-4 text-center">가림</p>;
  }

  if (unavailable) {
    return <p className="p-4 text-center">해당 날짜의 질문은 아직 열람할 수 없습니다.</p>;
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">{targetKey}</h1>
      {question ? (
        <div className="space-y-2">
          <p>{question}</p>
          <textarea
            className="w-full p-2 border"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white"
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      ) : (
        <p>질문이 없습니다.</p>
      )
    </div>
  );
};

export default TodayPage;
