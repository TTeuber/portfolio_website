"use client";

import {useCallback, useEffect, useState} from "react";
import Image from "next/image";

export default function Home() {
    const [pic, setPic] = useState([]);
    const getImage = useCallback((url) => {
        fetch(url).then((res) => {
            res.blob().then((data) => {
                setPic((x) => [...x, URL.createObjectURL(data)])
            })
        })
    }, [])
    useEffect(() => {
        fetch("/api/photoNames/Animals").then((res) => {
            res.json().then((data) => {
                data.names.forEach((name) => getImage(`/api/${name}`))
            })
        })
        return setPic([]);
    }, [getImage])
  return (
      <div>
          {pic.map((p, i) => {
            return <Image src={p} alt={"test"} width={400} height={400} key={i}/>
          })}
      </div>
  )
}

