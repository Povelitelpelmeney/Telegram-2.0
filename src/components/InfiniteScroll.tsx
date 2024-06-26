import { memo, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type InfiniteScrollProps = {
  loadMore: () => Promise<void>;
};

const InfiniteScroll = memo(({ loadMore }: InfiniteScrollProps) => {
  const { ref, inView } = useInView({ threshold: 0 });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!inView || isLoading) return;
    setIsLoading(true);
    loadMore().finally(() => setTimeout(() => setIsLoading(false)));
  }, [inView, isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={ref} />;
});

export default InfiniteScroll;
