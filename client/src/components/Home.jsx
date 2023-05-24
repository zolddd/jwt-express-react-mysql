import React from 'react'

export default function Home(userDetails) {
  const user = userDetails.user;
  console.log("user: "+user.name)
  return (
    <div>
        <h1>{user.name}</h1>
        <h2>{user.email}</h2>
    </div>
  )
}
