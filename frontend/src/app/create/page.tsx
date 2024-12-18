import Calendar from "@/components/calendar/Calendar";
import { getPostsOfUser } from "../actions/getPostsOfUser";
import GPTButton from "@/components/GPTButton";

export default function CreatePostPage() {
  
  const posts = getPostsOfUser();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">My Calendar</h1>
      <GPTButton />
      <Calendar posts={posts} />
    </div>
  );
}
