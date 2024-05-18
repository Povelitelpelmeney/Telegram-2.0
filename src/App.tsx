import { useGetChatsQuery } from "./graphql";

const App = () => {
  const { data, error, loading } = useGetChatsQuery({
    variables: { offset: 0, first: 10 },
  });

  if (loading)
    return <p className="text-3xl text-blue-600 underline">Loading...</p>;
  if (error) return <p className="text-3xl text-red-600 underline">Error!</p>;

  return (
    <div className="flex flex-row">
      {data?.chats.map(({ id, name }) => (
        <p key={id} className="text-2xl text-slate-400 underline">
          {name}
        </p>
      ))}
    </div>
  );
};

export default App;
