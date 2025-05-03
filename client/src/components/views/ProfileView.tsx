// src/components/views/ProfileView.tsx
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Calendar } from "@/components/calendar"
import { User } from '../../types/types';

type ProfileViewProps = {
  user: User;
};

export default function ProfileView({ user }: ProfileViewProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/3 flex flex-col items-center">
            <Avatar className="h-48 w-48 mb-4">
              <AvatarImage src={user.image || '/placeholder.svg'} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Button className="w-full mb-2">Edit Profile</Button>
            <Button variant="outline" className="w-full">
              Message
            </Button>
          </div>

          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-muted-foreground mb-4">@{user.username}</p>
            <p className="mb-6">{user.bio}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold">{user.requestsFilled}</p>
                  <p className="text-muted-foreground">Requests Filled</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-3xl font-bold">{user.offersPosted}</p>
                  <p className="text-muted-foreground">Offers Posted</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Tabs defaultValue="posts" className="mb-12">
          <TabsList className="mb-6">
            <TabsTrigger value="posts">Recent Posts</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
            <div className="space-y-4">
              {user.recentPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader className="pb-2">
                    <CardTitle>
                      <Link to={`/${post.type}s/${post.id}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Posted on {post.date} • {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="availability">
            <h2 className="text-2xl font-bold mb-6">Availability Calendar</h2>
            <div>
              <p>Calendar PLACEHOLDER</p>
            </div>
            {/* <Calendar availability={user.availability} /> */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
