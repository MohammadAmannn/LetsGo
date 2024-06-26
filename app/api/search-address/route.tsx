import { NextResponse } from "next/server";
const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest?q=";


export async function GET(request:any){
  const {searchParams}=new URL(request.url);

  const searchtext=searchParams.get("q");
  const res=await fetch(BASE_URL+'?='+searchtext+'&language=en&session_token=0c717894-0b25-4751-88e7-a34379905d18&country=IN'
 + "&access_token="+process.env.MAPBOX_ACCESS_TOKEN,
  {
    headers:{
      "Content-Type":"application/json"
    }
  })

  const searchResult=await res.json();
  return NextResponse.json(searchResult);

}