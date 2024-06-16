import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from '../ui/button';
import { MessageSquareText, ThumbsUp, Forward } from 'lucide-react';
import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import Input from '../Input';
function Post({
  check
}) {
  const navigate = useNavigate()
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentBox, SetCommendBox] = useState(false)
  const [message, setMessage] = useState([])
  const HandleComments = () => {
    SetCommendBox(true)

  }
  const handleOnMessageChange = () => {

  }
  const sendCommentMessage = () => {

  }
  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex pl-4 justify-start flex-row gap-2 w-full">
          <Avatar
            onClick={() => navigate(`/user/${check.author.username}`)}
            variant="outline"
            className={
              "border my-auto md:size-14 "
            }
          >
            <AvatarImage
              src={check.author?.avatar ||
                "https://cdn.icon-icons.com/icons2/3054/PNG/512/account_profile_user_icon_190494.png"
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='flex flex-col w-fit'>
            <CardTitle className="text-xl">
              {check.author?.fullname}
            </CardTitle>
            <CardDescription className="text-lg">
              {check.author?.Description.split(' ').slice(0, 10).join(' ') + '...'}
            </CardDescription>
          </div>
          {/* <Button variant="" className="w-fit self-start rounded-full" onClick={Togglesub}>{profile.isfollwed?"followed":"unfollowed"}</Button> */}
        </CardHeader>
        <CardContent className="p-0">
          <CardTitle className="px-4 text-lg">
            {isExpanded ? check?.content : check.content?.split(' ').slice(0, 8).join(' ') + '...'}
            <button onClick={() => setIsExpanded(!isExpanded)} className='text-muted-foreground'>
              {isExpanded ? ' Less' : 'More'}
            </button>
          </CardTitle>
          {check.image?.map((img, key) => (
            <img
              src={img ||
                "https://w7.pngwing.com/pngs/772/580/png-transparent-taobao-textured-grain-business-cool-science-and-technology-background-textured-grain-business.png"
              }
              alt=""
              key={key}
              className="aspect-[4/2] rounded-lg bg-white"
            />
          ))}
        </CardContent>
        <CardFooter className="pb-2  flex flex-row gap-2 items-center justify-between w-full mt-2">
          <Button className="rounded-sm p-6 dark:bg-secondary  hover:bg-primary text-white ">
            <ThumbsUp className='me-2 mb-1 hover:fill-blue-700' />  Like</Button>
          <Button className="rounded-sm p-6 dark:bg-secondary hover:bg-primary text-white " onClick={HandleComments}>
            <MessageSquareText className='me-2' /> Comment</Button>
          <Button className="rounded-sm p-6 dark:bg-secondary hover:bg-primary text-white ">
            <Forward className='mx-2 ' /> Share</Button>

        </CardFooter>
      </Card>

      {commentBox && (
        <div className='overflow-y-scroll h-60 bg-secondary w-full'>

          <div className=" p-2 sticky top-0 bg-dark z-9 flex justify-between items-center w-full border-b-[0.1px] border-secondary"><div className='flex justify-start items-center w-max gap-3'>

          </div>
          </div>
          <div className="sticky top-full p-4 flex justify-between items-center w-full gap-2 border-t-[0.1px] border-secondary">
            <Input
              placeholder="Message"
              value={message}
              onChange={handleOnMessageChange}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  sendCommentMessage()
                }
              }}
            />
            <button
              onClick={sendCommentMessage}
              disabled={!message <= 0}
              className="p-4 rounded-full bg-dark hover:bg-secondary disabled:opacity-50"
            >
              <PaperAirplaneIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Post