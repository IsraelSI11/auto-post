import { postTweetAction } from "@/app/actions/postTweetAction";
import { Button } from "./ui/button";

export default function PostTweet(){

    return (
        <Button onClick={()=> postTweetAction({text: "test", date: new Date(Date.now() + 61 * 60 * 1000)})}>Post Tweet</Button>
    )
}