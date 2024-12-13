// Titles.tsx
import React from 'react';

interface TitlesProps {
  title: string;
}

const Titles: React.FC<TitlesProps> = ({ title }) => {
  return <h2 className="text-xl font-bold">{title}</h2>;
};

export default Titles;
