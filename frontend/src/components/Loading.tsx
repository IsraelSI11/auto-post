export function Loading({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      <p className="mt-4">{text}</p>
    </div>
  );
}
