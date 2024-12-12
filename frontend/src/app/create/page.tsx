import Calendar from "@/components/calendar/Calendar";
import { getPostsOfUser } from "../actions/getPostsOfUser";

export default function CreatePostPage() {
  
  const posts = getPostsOfUser();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">My Calendar</h1>
      <Calendar posts={posts} />
    </div>
  );
}
