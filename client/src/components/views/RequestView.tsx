import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Request } from '../../types/types';

type RequestViewProps = {
  request: Request;
};

export default function RequestView({ request }: RequestViewProps) {
  const { id } = useParams();
  //const [request] = useState(request);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(request.comments);

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: (comments.length + 1).toString(),
      userId: '',
      userName: 'CurrentUser',
      content: commentText,
      createdAt: new Date().toISOString().split('T')[0],
      authorImage: '/placeholder.svg?height=50&width=50',
    };

    setComments([...comments, newComment]);
    setCommentText('');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{request.title}</h1>

          <div className="flex items-center mb-6">
            <Avatar className="h-10 w-10 mr-3">
              {/* <AvatarImage src={request.authorImage} alt={request.userName} /> */}
              <AvatarFallback>{request.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <Link to={`/profile/${request.userName}`} className="font-medium hover:underline">
                {request.userName}
              </Link>
              <p className="text-sm text-muted-foreground">Posted on {request.createdAt}</p>
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <p>{request.description}</p>
          </div>

          <div className="flex space-x-4">
            <Button>Contact</Button>
            <Button variant="outline">Share</Button>
          </div>
        </div>

        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Comments</h2>

          <div className="mb-8">
            <Textarea
              placeholder="Add a comment..."
              className="mb-3"
              value={commentText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCommentText(e.target.value)}
            />
            <Button onClick={handleAddComment}>Post Comment</Button>
          </div>

          <div className="space-y-6">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <Avatar className="h-8 w-8 mr-3">
                      {/* <AvatarImage src={comment.authorImage} alt={comment.userName} /> */}
                      <AvatarFallback>{comment.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <Link to={`/profile/${comment.userName}`} className="font-medium hover:underline">
                          {comment.userName}
                        </Link>
                        <span className="text-sm text-muted-foreground">{comment.createdAt}</span>
                      </div>
                      <p>{comment.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
