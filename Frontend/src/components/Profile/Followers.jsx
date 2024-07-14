import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Followers() {
    const [followers, setFollowers] = useState([])
    useEffect(() => {
        axios.get(`${process.env.VITE_SERVER_URI}/connections/:followingToId/followers`).then((response) => {
            console.log(response)
        })
        .catch((error) => { console.log(error) })
    }, [])
  return (
    <CardHeader className="flex pl-4 justify-start flex-row gap-2 w-full">
    <Avatar
      onClick={() => navigate(`/user/${post.mypost.username}`)}
      variant="outline"
      className={
        "border my-auto md:size-14 "
      }
    >
      <AvatarImage
        src={ post?.myposts.avatar ||
          "https://cdn.icon-icons.com/icons2/3054/PNG/512/account_profile_user_icon_190494.png"
        }
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
     <div className='flex flex-col w-fit '>
      <CardTitle className="text-xl">
        {post?.myposts.author?.fullname}
      </CardTitle>
      <CardDescription className="text-lg">
        {post?.myposts.author?.Description}
      </CardDescription>
     </div>
    </CardHeader>
  )
}

export default Followers