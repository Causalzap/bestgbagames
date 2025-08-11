// src/components/BookCoverImage.tsx
import Image from 'next/image';

type Props = {
  book: {
    coverImage: string | null;
    title: string;
  }
};

export default function BookCoverImage({ book }: Props) {
  const imageUrl = book.coverImage 
    ? `/images/covers/${book.coverImage}`
    : '/images/covers/default.jpg';

  return (
    <Image 
      src={imageUrl}
      alt={book.title}
      width={300}
      height={450}
      onError={(e) => {
        e.currentTarget.onerror = null; // 防止循环错误
        e.currentTarget.src = '/images/covers/default.jpg';
      }}
    />
  );
}
