import { useEffect, useState } from 'react';

interface Answers {
  [date: string]: string;
}

const HistoryPage = () => {
  const [answers, setAnswers] = useState<Answers>({});

  useEffect(() => {
    fetch('/api/answers')
      .then((res) => res.json())
      .then((data) => setAnswers(data));
  }, []);

  const dates = Object.keys(answers).sort();

  if (dates.length === 0) {
    return <p className="p-4">답변 내역이 없습니다.</p>;
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">지난 답변</h1>
      <ul className="space-y-2">
        {dates.map((date) => (
          <li key={date}>
            <strong>{date}</strong>
            <p>{answers[date]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPage;
