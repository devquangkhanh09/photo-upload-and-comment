import { Photo, PhotoComment } from "@/pages";
import {
  FormControl,
  Button,
  Input
} from "@chakra-ui/react"
import { useState } from "react";
import { getAgoTime } from "@/utils/formatDatetime";

interface Props {
  photo: Photo;
}

interface CreatePhotoCommentDto {
  content: string;
}

const CommentSection: React.FC<Props> = ({
  photo,
}) => {
  const [newComment, setNewComment] = useState<string>('');
  const [comments, setComments] = useState<PhotoComment[]>(photo.comments);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleComment = async () => {
    if (!newComment) return;
    setIsLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_DEV_API}/photos/${photo.fileName}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: newComment,
      } as CreatePhotoCommentDto),
    });

    if (response.ok) {
      setNewComment('');
      const comment = await response.json();
      setComments([...comments, comment]);
    } else {
      alert('Failed to comment.');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold">Comments</h2>
      <div className="flex flex-col">
        {comments.length === 0 && (
          <p>No comments yet.</p>
        )}
        {comments.map((comment, idx) => (
          <div key={idx} className="flex flex-wrap max-w-md">
            <p>{comment.content} <span className="italic">({getAgoTime(comment.createdAt)})</span></p>
          </div>
        ))}
      </div>
      <FormControl id="comment" className="flex flex-col">
        <Input
          placeholder="New comment"
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          onClick={handleComment}
          isLoading={isLoading}
        >
          Comment
        </Button>
      </FormControl>
    </div>
  );
}

export default CommentSection;