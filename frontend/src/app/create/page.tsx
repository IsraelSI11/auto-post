import Calendar from "@/components/calendar/Calendar";
import { getPostsOfUser } from "../actions/getPostsOfUser";
import GenerateButton from "@/components/GenerateButton";

export default function CreatePostPage() {
  const posts = getPostsOfUser();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Mi calendario</h1>
      <div className="flex w-full justify-end">
        <GenerateButton />
      </div>
      <Calendar posts={posts} />
    </div>
  );
}
