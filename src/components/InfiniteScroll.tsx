import { memo, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "../hooks";

type InfiniteScrollProps = {
  loadMore: () => Promise<void>;
};

const InfiniteScroll = memo(({ loadMore }: InfiniteScrollProps) => {
  const { ref, inView } = useInView({ threshold: 0 });
  const chat = useAppSelector((state) => state.chat);
  const [isLoading, setIsLoading] = useState(false);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    setIsOver(false);
  }, [chat]);

  useEffect(() => {
    if (!inView || isLoading || isOver) return;
    setIsLoading(true);
    loadMore()
      .then(() => setIsLoading(false))
      .catch(() => {
        setIsLoading(false);
        setIsOver(true);
      });
  }, [inView, isLoading, isOver]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="h-96" ref={ref} />;
});

export default InfiniteScroll;
