import { postTweetAction } from "@/app/actions/postTweetAction";
import { Button } from "./ui/button";

export default function PostTweet(){

    return (
        <Button onClick={() => postTweetAction({ text: Math.random().toString(36).substring(7), date: new Date("2024-12-12T09:49:00") })}>Post Tweet</Button>
    )
}